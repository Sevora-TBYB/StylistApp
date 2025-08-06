import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { API_CONFIG, HTTP_STATUS, ERROR_MESSAGES } from '../config/endpoints';
import { ApiResponse, ApiError, RequestConfig } from '../types/api';

// Token management (you can integrate with your auth storage)
let authToken: string | null = null;
let refreshToken: string | null = null;

// API Service Class
class ApiService {
  private api: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (error?: any) => void;
  }> = [];

  constructor() {
    this.api = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request Interceptor
    this.api.interceptors.request.use(
      (config) => {
        // Add auth token if available
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        
        // Log request in development
        if (__DEV__) {
          console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
          console.log('Request config:', config);
        }
        
        return config;
      },
      (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(this.handleError(error));
      }
    );

    // Response Interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log response in development
        if (__DEV__) {
          console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`);
          console.log('Response data:', response.data);
        }
        
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
        
        // Handle token refresh for 401 errors
        if (error.response?.status === HTTP_STATUS.UNAUTHORIZED && !originalRequest._retry) {
          if (this.isRefreshing) {
            // Queue the request if already refreshing
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            }).then(() => {
              return this.api(originalRequest);
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            await this.refreshAuthToken();
            this.processQueue(null);
            return this.api(originalRequest);
          } catch (refreshError) {
            this.processQueue(refreshError);
            this.clearTokens();
            // Redirect to login or show auth modal
            throw this.handleError(error);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(this.handleError(error));
      }
    );
  }

  private processQueue(error: any) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
    
    this.failedQueue = [];
  }

  private async refreshAuthToken(): Promise<void> {
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await axios.post(`${API_CONFIG.BASE_URL}/auth/refresh`, {
        refreshToken,
      });
      
      const { token, refreshToken: newRefreshToken } = response.data.data;
      this.setAuthTokens(token, newRefreshToken);
    } catch (error) {
      throw new Error('Failed to refresh token');
    }
  }

  private handleError(error: AxiosError): ApiError {
    const timestamp = new Date().toISOString();
    
    // Network Error
    if (!error.response) {
      return {
        success: false,
        message: ERROR_MESSAGES.NETWORK_ERROR,
        statusCode: 0,
        details: error.message,
        timestamp,
      };
    }

    // HTTP Error Response
    const { status, data } = error.response;
    const errorData = data as any;
    let message: string = ERROR_MESSAGES.UNKNOWN_ERROR;

    switch (status) {
      case HTTP_STATUS.BAD_REQUEST:
        message = errorData?.message || ERROR_MESSAGES.VALIDATION_ERROR;
        break;
      case HTTP_STATUS.UNAUTHORIZED:
        message = ERROR_MESSAGES.UNAUTHORIZED;
        break;
      case HTTP_STATUS.FORBIDDEN:
        message = ERROR_MESSAGES.FORBIDDEN;
        break;
      case HTTP_STATUS.NOT_FOUND:
        message = ERROR_MESSAGES.NOT_FOUND;
        break;
      case HTTP_STATUS.TOO_MANY_REQUESTS:
        message = 'Too many requests. Please wait and try again.';
        break;
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
      case HTTP_STATUS.BAD_GATEWAY:
      case HTTP_STATUS.SERVICE_UNAVAILABLE:
      case HTTP_STATUS.GATEWAY_TIMEOUT:
        message = ERROR_MESSAGES.SERVER_ERROR;
        break;
      default:
        message = errorData?.message || ERROR_MESSAGES.UNKNOWN_ERROR;
    }

    // Log error in development
    if (__DEV__) {
      console.error(`❌ API Error: ${status} ${error.config?.url}`);
      console.error('Error details:', { status, data, message });
    }

    return {
      success: false,
      message,
      statusCode: status,
      details: data,
      timestamp,
    };
  }

  // Public Methods

  // Set authentication tokens
  setAuthTokens(token: string, refresh: string) {
    authToken = token;
    refreshToken = refresh;
  }

  // Clear authentication tokens
  clearTokens() {
    authToken = null;
    refreshToken = null;
  }

  // GET Request
  async get<T = any>(
    endpoint: string, 
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.get(endpoint, {
        params: config?.params,
        headers: config?.headers,
        timeout: config?.timeout,
      });
      
      return {
        status: response.data.status !== undefined ? response.data.status : true,
        data: response.data.data || response.data,
        message: response.data.message || 'Success',
        credentials: response.data.credentials,
      };
    } catch (error) {
      throw error; // Error already handled by interceptor
    }
  }

  // POST Request
  async post<T = any>(
    endpoint: string, 
    data?: any, 
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.post(endpoint, data, {
        headers: config?.headers,
        timeout: config?.timeout,
        params: config?.params,
      });
      
      return {
        status: response.data.status !== undefined ? response.data.status : true,
        data: response.data.data || response.data,
        message: response.data.message || 'Success',
        credentials: response.data.credentials,
      };
    } catch (error) {
      throw error; // Error already handled by interceptor
    }
  }

  // PUT Request
  async put<T = any>(
    endpoint: string, 
    data?: any, 
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.put(endpoint, data, {
        headers: config?.headers,
        timeout: config?.timeout,
        params: config?.params,
      });
      
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message || 'Success',
        statusCode: response.status,
      };
    } catch (error) {
      throw error; // Error already handled by interceptor
    }
  }

  // PATCH Request
  async patch<T = any>(
    endpoint: string, 
    data?: any, 
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.patch(endpoint, data, {
        headers: config?.headers,
        timeout: config?.timeout,
        params: config?.params,
      });
      
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message || 'Success',
        statusCode: response.status,
      };
    } catch (error) {
      throw error; // Error already handled by interceptor
    }
  }

  // DELETE Request
  async delete<T = any>(
    endpoint: string, 
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.delete(endpoint, {
        headers: config?.headers,
        timeout: config?.timeout,
        params: config?.params,
      });
      
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message || 'Success',
        statusCode: response.status,
      };
    } catch (error) {
      throw error; // Error already handled by interceptor
    }
  }

  // Upload File
  async uploadFile<T = any>(
    endpoint: string, 
    file: FormData, 
    onUploadProgress?: (progressEvent: any) => void
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.post(endpoint, file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
      });
      
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message || 'Upload successful',
        statusCode: response.status,
      };
    } catch (error) {
      throw error; // Error already handled by interceptor
    }
  }
}

// Create and export singleton instance
export const apiService = new ApiService();
export default apiService;
