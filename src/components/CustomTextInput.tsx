import React from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface CustomTextInputProps extends RNTextInputProps {
  label?: string;
  containerStyle?: any;
  inputStyle?: any;
  labelStyle?: any;
  error?: string;
  isDarkMode?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  containerStyle,
  inputStyle,
  labelStyle,
  error,
  isDarkMode = false,
  ...props
}) => {
  const dynamicStyles = {
    input: {
      backgroundColor: isDarkMode ? styles.inputDark.backgroundColor : styles.inputLight.backgroundColor,
      borderColor: isDarkMode ? styles.inputDark.borderColor : styles.inputLight.borderColor,
      color: isDarkMode ? styles.inputDark.color : styles.inputLight.color,
    },
    label: {
      color: isDarkMode ? styles.labelDark.color : styles.labelLight.color,
    },
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, dynamicStyles.label, labelStyle]}>{label}</Text>
      )}
      <RNTextInput
        style={[styles.input, dynamicStyles.input, inputStyle]}
        placeholderTextColor="#737378"
        {...props}
      />
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
