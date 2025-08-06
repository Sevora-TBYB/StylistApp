# API Module Documentation

This API module provides a comprehensive solution for making HTTP requests in your React Native app using Axios. It includes automatic token management, error handling, network monitoring, and TypeScript support.

## Features

- ✅ **Complete HTTP Methods**: GET, POST, PUT, DELETE operations
- ✅ **Automatic Token Management**: JWT token handling with automatic refresh
- ✅ **Error Handling**: Comprehensive error handling with user-friendly messages
- ✅ **Network Monitoring**: Offline/online state detection
- ✅ **TypeScript Support**: Full type safety with interfaces
- ✅ **React Hooks**: Custom hooks for easy integration
- ✅ **Interceptors**: Request/response interceptors for consistent behavior
- ✅ **Endpoint Management**: Centralized endpoint configuration

## Installation

The following packages are already installed:
```bash
npm install axios @react-native-community/netinfo
```

## File Structure

```
src/
├── services/
│   ├── apiService.ts        # Main Axios service with interceptors
│   ├── endpoints.ts         # API endpoint configuration
│   └── api.ts              # TypeScript types and interfaces
├── hooks/
│   └── useApi.ts           # Custom React hooks for API calls
├── utils/
│   └── networkUtils.ts     # Network status monitoring
└── examples/
    └── ApiExampleScreen.tsx # Usage examples
```

## Basic Usage

### 1. Authentication API

```typescript
import { useAuthApi } from '../hooks/useApi';

const LoginScreen = () => {
  const authApi = useAuthApi();

  const handleLogin = async () => {
    const result = await authApi.login({
      email: 'user@example.com',
      password: 'password123'
    });
    
    if (result) {
      // Login successful, navigate to home
      navigation.navigate('Home');
    } else if (authApi.error) {
      // Show error message
      Alert.alert('Error', authApi.error.message);
    }
  };

  return (
    <Button 
      title={authApi.loading ? 'Logging in...' : 'Login'}
      onPress={handleLogin}
      disabled={authApi.loading}
    />
  );
};
```

### 2. User Profile API

```typescript
import { useUserApi } from '../hooks/useApi';

const ProfileScreen = () => {
  const userApi = useUserApi();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const result = await userApi.getProfile();
    if (result) {
      setProfile(result.data);
    }
  };

  const updateProfile = async (data) => {
    const result = await userApi.updateProfile(data);
    if (result) {
      setProfile(result.data);
      Alert.alert('Success', 'Profile updated!');
    }
  };

  return (
    <View>
      {profile && (
        <Text>Welcome, {profile.name}!</Text>
      )}
      {userApi.loading && <ActivityIndicator />}
    </View>
  );
};
```

### 3. Custom API Calls

```typescript
import { useCustomApi } from '../hooks/useApi';

const CustomScreen = () => {
  const customApi = useCustomApi();

  const makeCustomCall = async () => {
    // GET request
    const getData = await customApi.customGet('custom/endpoint');
    
    // POST request
    const postData = await customApi.customPost('custom/endpoint', {
      name: 'Test',
      value: 123
    });
    
    // PUT request
    const putData = await customApi.customPut('custom/endpoint/1', {
      name: 'Updated Test'
    });
    
    // DELETE request
    const deleteResult = await customApi.customDelete('custom/endpoint/1');
  };
};
```

### 4. Network Status Monitoring

```typescript
import { useNetworkStatus } from '../utils/networkUtils';

const MyComponent = () => {
  const networkState = useNetworkStatus();

  if (!networkState.isConnected) {
    return (
      <View>
        <Text>No internet connection</Text>
        <Text>Type: {networkState.type}</Text>
      </View>
    );
  }

  return <Text>Connected: {networkState.type}</Text>;
};
```

## API Response Format

All API responses follow this structure:

```typescript
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  timestamp: string;
}

interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}
```

## Configuration

### Endpoints Configuration (src/services/endpoints.ts)

```typescript
export const API_CONFIG = {
  BASE_URL: {
    development: 'http://localhost:3000/api',
    staging: 'https://staging-api.example.com/api',
    production: 'https://api.example.com/api',
  },
};

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    DELETE_PROFILE: '/user/profile',
    UPLOAD_AVATAR: '/user/avatar',
  },
  // Add more endpoints as needed
};
```

### Environment Setup

Update your endpoint URLs in `src/services/endpoints.ts` to match your backend API.

## Error Handling

The API module provides comprehensive error handling:

1. **Network Errors**: Automatically detected and handled
2. **HTTP Status Errors**: Mapped to user-friendly messages
3. **Token Expiry**: Automatic token refresh
4. **Offline Support**: Queued requests when offline

## Advanced Features

### Token Management

Tokens are automatically stored and attached to requests. The service handles:
- Automatic token attachment to requests
- Token refresh when expired
- Token clearing on logout

### Request Interceptors

Automatically adds:
- Authorization headers
- Content-Type headers
- Request timestamps

### Response Interceptors

Automatically handles:
- Token refresh on 401 errors
- Error message extraction
- Response data normalization

## TypeScript Support

All API methods are fully typed:

```typescript
// User profile type
interface ProfileData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  createdAt: string;
  updatedAt: string;
}

// Appointment type
interface AppointmentData {
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
```

## Integration Examples

Check the following files for complete integration examples:
- `src/screens/LoginScreen.tsx` - Authentication example
- `src/screens/app/HomeScreen.tsx` - Data fetching with refresh
- `src/examples/ApiExampleScreen.tsx` - All API methods

## Next Steps

1. Update endpoint URLs in `endpoints.ts` to match your backend
2. Add your specific data types to `api.ts`
3. Implement authentication flow in your app
4. Add error boundary for global error handling
5. Implement offline data persistence if needed

## Troubleshooting

### Common Issues

1. **TypeScript Errors**: Make sure all types are imported correctly
2. **Network Errors**: Check endpoint URLs and network connectivity
3. **Token Issues**: Verify JWT token format and expiry handling
4. **CORS Errors**: Configure your backend to allow cross-origin requests

### Debug Mode

Enable debug logging by setting `__DEV__` flag in `apiService.ts`:

```typescript
if (__DEV__) {
  console.log('API Request:', config);
  console.log('API Response:', response);
}
```

This API module provides everything you need for robust API communication in your React Native app!
