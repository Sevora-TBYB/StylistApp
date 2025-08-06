import { useState, useCallback } from 'react';
import { apiService } from '../services/apiService';
import { ENDPOINTS } from '../config/endpoints';
import { 
  LoginRequest, 
  LoginResponse, 
  ProfileData,
  AppointmentData,
  ApiError 
} from '../types/api';

// Custom hook for API calls with loading and error states
export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const execute = useCallback(async <T>(
    apiCall: () => Promise<T>
  ): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      return result;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError);
      console.error('API Error:', apiError);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    execute,
    clearError,
  };
};

// Authentication API Hook
export const useAuthApi = () => {
  const { loading, error, execute, clearError } = useApi();

  const login = useCallback(async (credentials: LoginRequest) => {
    return execute(async () => {
      const response = await apiService.post<LoginResponse>(
        ENDPOINTS.AUTH.LOGIN,
        credentials
      );
      
      // Store tokens - Sevora format uses access_token
      if (response.data.access_token) {
        // Store access token as both token and refresh token for now
        // Update this when you get refresh token endpoint
        apiService.setAuthTokens(response.data.access_token, response.data.access_token);
      }
      
      return response;
    });
  }, [execute]);

  const logout = useCallback(async () => {
    return execute(async () => {
      const response = await apiService.post(ENDPOINTS.AUTH.LOGOUT);
      apiService.clearTokens();
      return response;
    });
  }, [execute]);

  const register = useCallback(async (userData: any) => {
    return execute(async () => {
      return await apiService.post(ENDPOINTS.AUTH.REGISTER, userData);
    });
  }, [execute]);

  const forgotPassword = useCallback(async (email: string) => {
    return execute(async () => {
      return await apiService.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    });
  }, [execute]);

  const resetPassword = useCallback(async (token: string, password: string) => {
    return execute(async () => {
      return await apiService.post(ENDPOINTS.AUTH.RESET_PASSWORD, {
        token,
        password,
      });
    });
  }, [execute]);

  return {
    loading,
    error,
    clearError,
    login,
    logout,
    register,
    forgotPassword,
    resetPassword,
  };
};

// User Profile API Hook
export const useUserApi = () => {
  const { loading, error, execute, clearError } = useApi();

  const getProfile = useCallback(async () => {
    return execute(async () => {
      return await apiService.get<ProfileData>(ENDPOINTS.USER.PROFILE);
    });
  }, [execute]);

  const updateProfile = useCallback(async (profileData: Partial<ProfileData>) => {
    return execute(async () => {
      return await apiService.put<ProfileData>(
        ENDPOINTS.USER.UPDATE_PROFILE,
        profileData
      );
    });
  }, [execute]);

  const changePassword = useCallback(async (passwordData: {
    currentPassword: string;
    newPassword: string;
  }) => {
    return execute(async () => {
      return await apiService.post(ENDPOINTS.USER.CHANGE_PASSWORD, passwordData);
    });
  }, [execute]);

  const uploadAvatar = useCallback(async (file: FormData) => {
    return execute(async () => {
      return await apiService.uploadFile(ENDPOINTS.USER.UPLOAD_AVATAR, file);
    });
  }, [execute]);

  return {
    loading,
    error,
    clearError,
    getProfile,
    updateProfile,
    changePassword,
    uploadAvatar,
  };
};

// Appointments API Hook
export const useAppointmentsApi = () => {
  const { loading, error, execute, clearError } = useApi();

  const getAppointments = useCallback(async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    date?: string;
  }) => {
    return execute(async () => {
      return await apiService.get<AppointmentData[]>(ENDPOINTS.APPOINTMENTS.LIST, {
        params,
      });
    });
  }, [execute]);

  const getAppointmentById = useCallback(async (id: string) => {
    return execute(async () => {
      return await apiService.get<AppointmentData>(
        ENDPOINTS.APPOINTMENTS.GET_BY_ID(id)
      );
    });
  }, [execute]);

  const createAppointment = useCallback(async (appointmentData: Partial<AppointmentData>) => {
    return execute(async () => {
      return await apiService.post<AppointmentData>(
        ENDPOINTS.APPOINTMENTS.CREATE,
        appointmentData
      );
    });
  }, [execute]);

  const updateAppointment = useCallback(async (
    id: string,
    appointmentData: Partial<AppointmentData>
  ) => {
    return execute(async () => {
      return await apiService.put<AppointmentData>(
        ENDPOINTS.APPOINTMENTS.UPDATE(id),
        appointmentData
      );
    });
  }, [execute]);

  const deleteAppointment = useCallback(async (id: string) => {
    return execute(async () => {
      return await apiService.delete(ENDPOINTS.APPOINTMENTS.DELETE(id));
    });
  }, [execute]);

  const getAppointmentsByDate = useCallback(async (date: string) => {
    return execute(async () => {
      return await apiService.get<AppointmentData[]>(
        ENDPOINTS.APPOINTMENTS.GET_BY_DATE,
        {
          params: { date },
        }
      );
    });
  }, [execute]);

  const getUpcomingAppointments = useCallback(async () => {
    return execute(async () => {
      return await apiService.get<AppointmentData[]>(
        ENDPOINTS.APPOINTMENTS.GET_UPCOMING
      );
    });
  }, [execute]);

  return {
    loading,
    error,
    clearError,
    getAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentsByDate,
    getUpcomingAppointments,
  };
};

// Generic API Hook for custom endpoints
export const useCustomApi = () => {
  const { loading, error, execute, clearError } = useApi();

  const get = useCallback(async <T>(endpoint: string, params?: any) => {
    return execute(async () => {
      return await apiService.get<T>(endpoint, { params });
    });
  }, [execute]);

  const post = useCallback(async <T>(endpoint: string, data?: any) => {
    return execute(async () => {
      return await apiService.post<T>(endpoint, data);
    });
  }, [execute]);

  const put = useCallback(async <T>(endpoint: string, data?: any) => {
    return execute(async () => {
      return await apiService.put<T>(endpoint, data);
    });
  }, [execute]);

  const del = useCallback(async <T>(endpoint: string) => {
    return execute(async () => {
      return await apiService.delete<T>(endpoint);
    });
  }, [execute]);

  return {
    loading,
    error,
    clearError,
    get,
    post,
    put,
    delete: del,
  };
};
