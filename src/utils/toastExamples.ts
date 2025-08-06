// Toast Demo - Example usage of custom toast messages

import { showSuccessToast, showErrorToast, showWarningToast, showInfoToast } from '../utils/toastConfig';

// Example usage of different toast types
export const demoToastMessages = () => {
  
  // Success Toast - Green, Slim Design
  const showSuccessExample = () => {
    showSuccessToast('Login Successful', 'Welcome to StylistApp!');
  };

  // Error Toast - Red, Slim Design  
  const showErrorExample = () => {
    showErrorToast('Login Failed', 'Invalid email or password');
  };

  // Warning Toast - Orange/Yellow, Slim Design
  const showWarningExample = () => {
    showWarningToast('Session Expiring', 'Your session will expire in 2 minutes');
  };

  // Info Toast - Blue, Slim Design
  const showInfoExample = () => {
    showInfoToast('New Feature', 'Check out our new trial system!');
  };

  return {
    showSuccessExample,
    showErrorExample,
    showWarningExample,
    showInfoExample,
  };
};

// Login-specific toast messages
export const loginToastMessages = {
  emailRequired: () => showErrorToast('Email Required', 'Please enter your email address'),
  passwordRequired: () => showErrorToast('Password Required', 'Please enter your password'),
  invalidEmail: () => showErrorToast('Invalid Email', 'Please enter a valid email address'),
  loginSuccess: (message?: string) => showSuccessToast('Login Successful', message || 'Welcome to StylistApp!'),
  loginFailed: (message?: string) => showErrorToast('Login Failed', message || 'Invalid credentials'),
  networkError: () => showErrorToast('Network Error', 'Please check your internet connection'),
  serverError: () => showErrorToast('Server Error', 'Something went wrong. Please try again'),
  validationError: (message: string) => showErrorToast('Validation Error', message),
};

export default {
  demoToastMessages,
  loginToastMessages,
};
