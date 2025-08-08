// API Types and Interfaces

export interface ApiResponse<T = any> {
  status: boolean;
  data: T;
  message: string;
  credentials?: boolean;
  statusCode?: number;
}

export interface ApiError {
  success: false;
  message: string;
  code?: string;
  details?: any;
  timestamp?: string;
  statusCode?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface RequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
  params?: Record<string, any>;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  phoneVerified: boolean;
  status:boolean,
}

export interface ProfileData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppointmentData {
  id: string;
  date: string;
  time: string;
  endTime: string;
  store: string;
  orderNumber: string;
  address: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}
