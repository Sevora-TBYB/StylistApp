import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen, SignupScreen, ProfileCreation, ProfileCreateSuccess} from '../screens/auth';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ProfileCreation: undefined;
  ProfileCreateSuccess: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ProfileCreation" component={ProfileCreation} />
      <Stack.Screen name="ProfileCreateSuccess" component={ProfileCreateSuccess} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
