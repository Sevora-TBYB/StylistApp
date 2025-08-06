import Toast from 'react-native-toast-message';

// Custom Toast Functions with slim design and keyboard-aware positioning
export const showSuccessToast = (title: string, message?: string) => {
  Toast.show({
    type: 'success',
    text1: title,
    text2: message,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 60, // Shows above keyboard and status bar
  });
};

export const showErrorToast = (title: string, message?: string) => {
  Toast.show({
    type: 'error',
    text1: title,
    text2: message,
    position: 'top',
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 60, // Shows above keyboard and status bar
  });
};

export const showWarningToast = (title: string, message?: string) => {
  Toast.show({
    type: 'info', // Using info type styled as warning
    text1: title,
    text2: message,
    position: 'top',
    visibilityTime: 3500,
    autoHide: true,
    topOffset: 60, // Shows above keyboard and status bar
  });
};

export const showInfoToast = (title: string, message?: string) => {
  Toast.show({
    type: 'info',
    text1: title,
    text2: message,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 60, // Shows above keyboard and status bar
  });
};

export default {
  showSuccessToast,
  showErrorToast,
  showWarningToast,
  showInfoToast,
};
