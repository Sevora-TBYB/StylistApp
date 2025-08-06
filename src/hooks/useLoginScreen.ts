import { useState } from 'react';
import { Alert } from 'react-native';
import { showSuccessToast, showErrorToast, showWarningToast } from '../utils/toastConfig';
import { useAuthApi } from './useApi';

interface UseLoginScreenProps {
  navigation: any;
}

interface SliderDataItem {
  id: number;
  image: any;
  title: string;
  description: string;
}

export const useLoginScreen = ({ navigation }: UseLoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // API hook for authentication
  const authApi = useAuthApi();

  const sliderData: SliderDataItem[] = [
    {
      id: 1,
      image: require('../assets/images/png/home3.png'),
      title: 'Visit Store',
      description: 'Register to enjoy try before you buy experience',
    },
    {
      id: 2,
      image: require('../assets/images/png/home2.png'),
      title: 'Pickup Trial Items',
      description: 'Register to enjoy try before you buy experience',
    },
    {
      id: 3,
      image: require('../assets/images/png/home.png'),
      title: 'Start Trial',
      description: 'Register to enjoy try before you buy experience.',
    },
  ];

  const handleScroll = (event: any) => {
    const { SIZES } = require('../constants');
    const slideSize = SIZES.SCREEN_WIDTH;
    const currentSlideIndex = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setCurrentSlide(currentSlideIndex);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const handleLogin = async () => {
    // Validate input
    if (!email.trim()) {
      showErrorToast('Email Required', 'Please enter your email address');
      return;
    }

    if (!password.trim()) {
      showErrorToast('Password Required', 'Please enter your password');
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      showErrorToast('Invalid Email', 'Please enter a valid email address');
      return;
    }

    try {
      const result = await authApi.login({
        email: email.trim().toLowerCase(),
        password,
      });

      if (result && result.status) {
        showSuccessToast('Login Successful', result.message || 'Welcome to StylistApp!');

        // Navigate to ProfileCreation screen after successful login
        setTimeout(() => {
          navigation.navigate('ProfileCreation');
        }, 1000);
      } else {
        const errorMessage = authApi.error?.message || 'Login failed. Please try again.';
        showErrorToast('Login Failed', errorMessage);
      }
    } catch (error) {
      showErrorToast('Error', 'An unexpected error occurred. Please try again.');
      console.error('Login error:', error);
    }
  };

  const handleNavigateToSignup = () => {
    navigation.navigate('Signup');
  };

  const validateForm = () => {
    if (!email.trim()) {
      return { isValid: false, message: 'Email is required' };
    }
    
    if (!password.trim()) {
      return { isValid: false, message: 'Password is required' };
    }

    // Enhanced email validation
    if (!validateEmail(email)) {
      return { isValid: false, message: 'Please enter a valid email address' };
    }

    return { isValid: true, message: '' };
  };

  const handleLoginWithValidation = () => {
    const validation = validateForm();
    
    if (!validation.isValid) {
      showErrorToast('Validation Error', validation.message);
      return;
    }

    handleLogin();
  };

  return {
    // State
    email,
    password,
    currentSlide,
    sliderData,
    
    // Actions
    setEmail,
    setPassword,
    handleScroll,
    handleLogin: handleLoginWithValidation,
    handleNavigateToSignup,
    validateForm,
    
    // API States
    isLoading: authApi.loading,
    error: authApi.error,
    clearError: authApi.clearError,
  };
};
