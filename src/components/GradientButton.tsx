import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SIZES } from '../constants';

interface GradientButtonProps extends TouchableOpacityProps {
  title: string;
  colors?: string[];
  textStyle?: any;
  gradientStyle?: any;
  buttonStyle?: any;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  colors = ['#121212', '#666666'],
  textStyle,
  gradientStyle,
  buttonStyle,
  ...props
}) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} {...props}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradient, gradientStyle]}
      >
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: SIZES.BORDER_RADIUS_ROUND * 2,
    overflow: 'hidden', // Ensures gradient respects border radius
    marginTop: SIZES.MARGIN_SMALL, // 10
  },
  gradient: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GradientButton;
