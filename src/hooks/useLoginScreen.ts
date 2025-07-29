import { useState } from 'react';

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

  const handleLogin = () => {
    // Navigate to profile creation screen after login
    navigation.navigate('ProfileCreation');
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

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, message: 'Please enter a valid email address' };
    }

    return { isValid: true, message: '' };
  };

  const handleLoginWithValidation = () => {
    const validation = validateForm();
    
    // if (!validation.isValid) {
    //   // You can show an alert or toast here
    //   console.log(validation.message);
    //   return;
    // }

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
  };
};
