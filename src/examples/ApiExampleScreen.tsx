import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { 
  useAuthApi, 
  useUserApi, 
  useAppointmentsApi, 
  useCustomApi 
} from '../hooks/useApi';
import { useNetworkStatus } from '../utils/networkUtils';
import { ProfileData, AppointmentData } from '../types/api';

// Example component showing how to use the API hooks
const ApiExampleScreen: React.FC = () => {
  // Network status
  const networkState = useNetworkStatus();
  
  // API hooks
  const authApi = useAuthApi();
  const userApi = useUserApi();
  const appointmentsApi = useAppointmentsApi();
  const customApi = useCustomApi();

  // Local state
  const [user, setUser] = useState<ProfileData | null>(null);
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);

  // Example: Login
  const handleLogin = async () => {
    const result = await authApi.login({
      email: 'test@example.com',
      password: 'password123',
    });

    if (result) {
      Alert.alert('Success', 'Login successful!');
      // Navigate to home screen or update app state
    } else if (authApi.error) {
      Alert.alert('Error', authApi.error.message);
    }
  };

  // Example: Get user profile
  const fetchUserProfile = async () => {
    const result = await userApi.getProfile();
    
    if (result) {
      setUser(result.data);
    } else if (userApi.error) {
      Alert.alert('Error', userApi.error.message);
    }
  };

  // Example: Get appointments
  const fetchAppointments = async () => {
    const result = await appointmentsApi.getAppointments({
      page: 1,
      limit: 10,
      status: 'pending',
    });

    if (result) {
      setAppointments(result.data);
    } else if (appointmentsApi.error) {
      Alert.alert('Error', appointmentsApi.error.message);
    }
  };

  // Example: Create appointment
  const createAppointment = async () => {
    const result = await appointmentsApi.createAppointment({
      date: '2025-08-06',
      time: '10:00 AM',
      endTime: '12:00 PM',
      store: 'Nike Store',
      orderNumber: '#12345',
      address: '123 Main St, City',
    });

    if (result) {
      Alert.alert('Success', 'Appointment created!');
      fetchAppointments(); // Refresh list
    } else if (appointmentsApi.error) {
      Alert.alert('Error', appointmentsApi.error.message);
    }
  };

  // Example: Custom API call
  const customApiCall = async () => {
    const result = await customApi.get('/custom-endpoint', {
      param1: 'value1',
      param2: 'value2',
    });

    if (result) {
      console.log('Custom API result:', result.data);
    } else if (customApi.error) {
      Alert.alert('Error', customApi.error.message);
    }
  };

  // Example: Upload file
  const uploadFile = async () => {
    const formData = new FormData();
    formData.append('file', {
      uri: 'file://path/to/image.jpg',
      type: 'image/jpeg',
      name: 'avatar.jpg',
    } as any);

    const result = await userApi.uploadAvatar(formData);
    
    if (result) {
      Alert.alert('Success', 'Avatar uploaded!');
    } else if (userApi.error) {
      Alert.alert('Error', userApi.error.message);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchUserProfile();
    fetchAppointments();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>API Examples</Text>
      
      {/* Network Status */}
      <View style={{ marginBottom: 20 }}>
        <Text>Network Status:</Text>
        <Text>Connected: {networkState.isConnected ? 'Yes' : 'No'}</Text>
        <Text>Internet: {networkState.isInternetReachable ? 'Yes' : 'No'}</Text>
        <Text>Type: {networkState.type}</Text>
      </View>

      {/* Auth Examples */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>Authentication:</Text>
        <Button
          title={authApi.loading ? 'Logging in...' : 'Login'}
          onPress={handleLogin}
          disabled={authApi.loading}
        />
      </View>

      {/* User Profile Examples */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>User Profile:</Text>
        <Button
          title={userApi.loading ? 'Loading...' : 'Get Profile'}
          onPress={fetchUserProfile}
          disabled={userApi.loading}
        />
        <Button
          title={userApi.loading ? 'Uploading...' : 'Upload Avatar'}
          onPress={uploadFile}
          disabled={userApi.loading}
        />
        {user && (
          <Text style={{ marginTop: 10 }}>
            User: {JSON.stringify(user, null, 2)}
          </Text>
        )}
      </View>

      {/* Appointments Examples */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>Appointments:</Text>
        <Button
          title={appointmentsApi.loading ? 'Loading...' : 'Get Appointments'}
          onPress={fetchAppointments}
          disabled={appointmentsApi.loading}
        />
        <Button
          title={appointmentsApi.loading ? 'Creating...' : 'Create Appointment'}
          onPress={createAppointment}
          disabled={appointmentsApi.loading}
        />
        <Text style={{ marginTop: 10 }}>
          Appointments: {appointments.length}
        </Text>
      </View>

      {/* Custom API Examples */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>Custom API:</Text>
        <Button
          title={customApi.loading ? 'Loading...' : 'Custom Call'}
          onPress={customApiCall}
          disabled={customApi.loading}
        />
      </View>

      {/* Error Display */}
      {(authApi.error || userApi.error || appointmentsApi.error || customApi.error) && (
        <View style={{ marginTop: 20, padding: 10, backgroundColor: '#ffebee' }}>
          <Text style={{ color: 'red', fontWeight: 'bold' }}>Errors:</Text>
          {authApi.error && <Text>Auth: {authApi.error.message}</Text>}
          {userApi.error && <Text>User: {userApi.error.message}</Text>}
          {appointmentsApi.error && <Text>Appointments: {appointmentsApi.error.message}</Text>}
          {customApi.error && <Text>Custom: {customApi.error.message}</Text>}
        </View>
      )}
    </View>
  );
};

export default ApiExampleScreen;
