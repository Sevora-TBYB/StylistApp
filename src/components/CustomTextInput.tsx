import React, { useState } from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import EyeIcon from '../assets/images/svg/EyeIcon';
import EyeVisibleIcon from '../assets/images/svg/EyeIconVisible';

interface CustomTextInputProps extends RNTextInputProps {
  label?: string;
  containerStyle?: any;
  inputStyle?: any;
  labelStyle?: any;
  error?: string;
  isDarkMode?: boolean;
  isPassword?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  containerStyle,
  inputStyle,
  labelStyle,
  error,
  isDarkMode = false,
  isPassword = false,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const dynamicStyles = {
    input: {
      backgroundColor: isDarkMode ? styles.inputDark.backgroundColor : styles.inputLight.backgroundColor,
      borderColor: isDarkMode ? styles.inputDark.borderColor : styles.inputLight.borderColor,
      color: isDarkMode ? styles.inputDark.color : styles.inputLight.color,
    },
    label: {
      color: isDarkMode ? styles.labelDark.color : styles.labelLight.color,
    },
    eyeIcon: {
      color: isDarkMode ? '#FFFFFF' : '#737378',
    },
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, dynamicStyles.label, labelStyle]}>{label}</Text>
      )}
      <View style={styles.inputContainer}>
        <RNTextInput
          style={[
            styles.input, 
            dynamicStyles.input, 
            inputStyle,
            isPassword && styles.passwordInput
          ]}
          placeholderTextColor="#737378"
          secureTextEntry={isPassword && !isPasswordVisible}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.eyeIconContainer}
            onPress={togglePasswordVisibility}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {isPasswordVisible ? (
              <EyeIcon
                width={20} 
                height={20} 
                color={dynamicStyles.eyeIcon.color} 
              />
            ) : (
              <EyeVisibleIcon 
                width={20} 
                height={20} 
                color={dynamicStyles.eyeIcon.color} 
              />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#424245',
    marginBottom: 4,
    fontWeight: '500',
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    color: '#424245',
    backgroundColor: '#FFFFFF',
    minHeight: 48,
    flex: 1,
  },
  passwordInput: {
    paddingRight: 60, // Make space for the eye icon
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 15,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: "100%",
    // borderWidth: 1,
    flex:1,
  },
  errorText: {
    fontSize: 12,
    color: '#FF3B30',
    marginTop: 4,
    marginLeft: 20,
  },
  // Light mode colors
  inputLight: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DBDBDB',
    color: '#424245',
  },
  labelLight: {
    color: '#424245',
  },
  // Dark mode colors
  inputDark: {
    backgroundColor: '#2C2C2E',
    borderColor: '#3A3A3C',
    color: '#FFFFFF',
  },
  labelDark: {
    color: '#FFFFFF',
  },
});

export default CustomTextInput;
