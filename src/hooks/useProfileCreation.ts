import { useState } from 'react';
import { Platform, Alert, Linking } from 'react-native';
import {
  launchImageLibrary,
  launchCamera,
  MediaType,
  PhotoQuality,
} from 'react-native-image-picker';
import { 
  check, 
  request, 
  PERMISSIONS, 
  RESULTS,
  Permission 
} from 'react-native-permissions';

interface UseProfileCreationProps {
  navigation: any;
}

interface DropdownOption {
  label: string;
  value: string;
}

export const useProfileCreation = ({ navigation }: UseProfileCreationProps) => {
  // Dropdown options
  const educationOptions: DropdownOption[] = [
    { label: 'High School', value: 'high_school' },
    { label: 'Associate Degree', value: 'associate_degree' },
    { label: 'Bachelor\'s Degree', value: 'bachelors_degree' },
    { label: 'Master\'s Degree', value: 'masters_degree' },
    { label: 'Doctorate (PhD)', value: 'doctorate' },
    { label: 'Professional Certification', value: 'professional_certification' },
    { label: 'Trade School', value: 'trade_school' },
    { label: 'Other', value: 'other' },
  ];

  const workExperienceOptions: DropdownOption[] = [
    { label: 'Beauty Salon', value: 'beauty_salon' },
    { label: 'Hair Salon', value: 'hair_salon' },
    { label: 'Spa & Wellness Center', value: 'spa_wellness' },
    { label: 'Fashion Industry', value: 'fashion_industry' },
    { label: 'Freelance Stylist', value: 'freelance_stylist' },
    { label: 'Makeup Artist', value: 'makeup_artist' },
    { label: 'Wedding Stylist', value: 'wedding_stylist' },
    { label: 'Celebrity Stylist', value: 'celebrity_stylist' },
    { label: 'Fashion Retail', value: 'fashion_retail' },
    { label: 'Photography Studio', value: 'photography_studio' },
    { label: 'Film/TV Industry', value: 'film_tv' },
    { label: 'No Previous Experience', value: 'no_experience' },
    { label: 'Other', value: 'other' },
  ];

  const yearsExperienceOptions: DropdownOption[] = [
    { label: 'Less than 1 year', value: 'less_than_1' },
    { label: '1-2 years', value: '1_2_years' },
    { label: '3-5 years', value: '3_5_years' },
    { label: '6-10 years', value: '6_10_years' },
    { label: '11-15 years', value: '11_15_years' },
    { label: 'More than 15 years', value: 'more_than_15' },
  ];

  // State variables
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [education, setEducation] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showOtpBottomSheet, setShowOtpBottomSheet] = useState(false);
  const [otp, setOtp] = useState('');

  // Get the appropriate permission based on platform and action
  const getPermission = (action: 'camera' | 'gallery'): Permission => {
    if (Platform.OS === 'ios') {
      return action === 'camera' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.IOS.PHOTO_LIBRARY;
    } else {
      if (action === 'camera') {
        return PERMISSIONS.ANDROID.CAMERA;
      } else {
        // For Android 13+, use READ_MEDIA_IMAGES, for older versions use READ_EXTERNAL_STORAGE
        const androidVersion = Platform.Version as number;
        return androidVersion >= 33 
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES 
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
      }
    }
  };

  // Check and request permission
  const checkAndRequestPermission = async (action: 'camera' | 'gallery'): Promise<boolean> => {
    try {
      const permission = getPermission(action);
      const result = await check(permission);

      switch (result) {
        case RESULTS.GRANTED:
          return true;
        
        case RESULTS.DENIED:
          const requestResult = await request(permission);
          return requestResult === RESULTS.GRANTED;
        
        case RESULTS.BLOCKED:
          setTimeout(() => {
            Alert.alert(
              'Permission Required',
              `${action === 'camera' ? 'Camera' : 'Photo library'} access is required to upload images. Please enable it in your device settings.`,
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Open Settings', onPress: () => Linking.openSettings() },
              ]
            );
          }, 100);
          return false;
        
        case RESULTS.UNAVAILABLE:
          setTimeout(() => {
            Alert.alert(
              'Feature Unavailable',
              `${action === 'camera' ? 'Camera' : 'Photo library'} is not available on this device.`
            );
          }, 100);
          return false;
        
        default:
          return false;
      }
    } catch (error) {
      console.error('Permission check error:', error);
      setTimeout(() => {
        Alert.alert('Error', 'Failed to check permissions. Please try again.');
      }, 100);
      return false;
    }
  };

  const handleImageUpload = () => {
    // Add a small delay to ensure the component is properly attached
    setTimeout(() => {
      // Show options for camera or gallery
      Alert.alert(
        'Select Image',
        'Choose how you want to select your profile image',
        [
          {
            text: 'Camera',
            onPress: () => openCamera(),
          },
          {
            text: 'Gallery',
            onPress: () => openGallery(),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ]
      );
    }, 100);
  };

  const openGallery = async () => {
    const hasPermission = await checkAndRequestPermission('gallery');
    if (!hasPermission) {
      return;
    }

    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 400,
      maxWidth: 400,
      quality: 0.8 as PhotoQuality,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel || response.errorMessage) {
        if (response.errorMessage) {
          setTimeout(() => {
            Alert.alert('Error', 'Failed to select image. Please try again.');
          }, 100);
        }
        return;
      }
      
      if (response.assets && response.assets[0]) {
        setProfileImage(response.assets[0].uri || null);
      }
    });
  };

  const openCamera = async () => {
    const hasPermission = await checkAndRequestPermission('camera');
    if (!hasPermission) {
      return;
    }

    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 400,
      maxWidth: 400,
      quality: 0.8 as PhotoQuality,
    };

    launchCamera(options, (response) => {
      if (response.didCancel || response.errorMessage) {
        if (response.errorMessage) {
          setTimeout(() => {
            Alert.alert('Error', 'Failed to capture image. Please try again.');
          }, 100);
        }
        return;
      }
      
      if (response.assets && response.assets[0]) {
        setProfileImage(response.assets[0].uri || null);
      }
    });
  };

  const handleImageRemove = () => {
    if (profileImage) {
      setTimeout(() => {
        Alert.alert(
          'Remove Image',
          'Do you want to remove the current profile image?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Remove', onPress: () => setProfileImage(null), style: 'destructive' },
          ]
        );
      }, 100);
    }
  };

  const validateForm = () => {
    if (!fullName.trim()) {
      return { isValid: false, message: 'Full name is required' };
    }

    if (!emailAddress.trim()) {
      return { isValid: false, message: 'Email address is required' };
    }

    if (!mobileNumber.trim()) {
      return { isValid: false, message: 'Mobile number is required' };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress)) {
      return { isValid: false, message: 'Please enter a valid email address' };
    }

    // Basic mobile number validation (adjust according to your requirements)
    const mobileRegex = /^\d{10,15}$/;
    if (!mobileRegex.test(mobileNumber.replace(/\s+/g, ''))) {
      return { isValid: false, message: 'Please enter a valid mobile number' };
    }

    return { isValid: true, message: '' };
  };

  const handleContinue = () => {
    const validation = validateForm();
    
    // if (!validation.isValid) {
    //   setTimeout(() => {
    //     Alert.alert('Error', validation.message);
    //   }, 100);
    //   return;
    // }
    
    // Show OTP verification bottom sheet
    setShowOtpBottomSheet(true);
  };

  const handleOtpVerification = () => {
    if (otp.length !== 6) {
      setTimeout(() => {
        Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      }, 100);
      return;
    }
    
    // Close OTP bottom sheet and navigate to success screen
    setShowOtpBottomSheet(false);
    navigation.navigate('ProfileCreateSuccess');
  };

  const handleResendOtp = () => {
    // Clear current OTP
    setOtp('');
    setTimeout(() => {
      Alert.alert('Success', 'OTP has been resent to your mobile number');
    }, 100);
  };

  const resetForm = () => {
    setFullName('');
    setEmailAddress('');
    setMobileNumber('');
    setEducation('');
    setWorkExperience('');
    setYearsExperience('');
    setProfileImage(null);
    setOtp('');
    setShowOtpBottomSheet(false);
  };

  return {
    // Dropdown options
    educationOptions,
    workExperienceOptions,
    yearsExperienceOptions,
    
    // State
    fullName,
    emailAddress,
    mobileNumber,
    education,
    workExperience,
    yearsExperience,
    profileImage,
    showOtpBottomSheet,
    otp,
    
    // State setters
    setFullName,
    setEmailAddress,
    setMobileNumber,
    setEducation,
    setWorkExperience,
    setYearsExperience,
    setProfileImage,
    setShowOtpBottomSheet,
    setOtp,
    
    // Methods
    handleImageUpload,
    handleImageRemove,
    handleContinue,
    handleOtpVerification,
    handleResendOtp,
    validateForm,
    resetForm,
  };
};
