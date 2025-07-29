import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getColors } from '../../constants';
import { useSimpleDarkMode } from '../../hooks';
import { animatedBottomSheetStyles } from './AnimatedBottomSheet.styles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface AnimatedBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  height?: number;
  showCloseButton?: boolean;
  backdrop?: boolean;
  backdropOpacity?: number;
  animationDuration?: number;
  snapToOffsets?: number[];
  enablePanDownToClose?: boolean;
  customHeader?: React.ReactNode;
  borderRadius?: number;
  keyboardVerticalOffset?: number;
}

const AnimatedBottomSheet: React.FC<AnimatedBottomSheetProps> = ({
  visible,
  onClose,
  children,
  title,
  height = SCREEN_HEIGHT * 0.6,
  showCloseButton = true,
  backdrop = true,
  backdropOpacity = 0.5,
  animationDuration = 300,
  snapToOffsets = [],
  enablePanDownToClose = true,
  customHeader,
  borderRadius = 20,
  keyboardVerticalOffset = 20,
}) => {
  const { isDarkMode } = useSimpleDarkMode();
  const colors = getColors(isDarkMode);

  const translateY = useRef(new Animated.Value(height)).current;
  const panGestureY = useRef(new Animated.Value(0)).current;
  const backdropOpacityAnim = useRef(new Animated.Value(0)).current;
  const keyboardHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      showBottomSheet();
    } else {
      hideBottomSheet();
    }
  }, [visible]);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (event) => {
        const keyboardHeightValue = event.endCoordinates.height + keyboardVerticalOffset;
        Animated.timing(keyboardHeight, {
          toValue: keyboardHeightValue,
          duration: Platform.OS === 'ios' ? event.duration || 250 : 250,
          useNativeDriver: false,
        }).start();
      }
    );

    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      (event) => {
        Animated.timing(keyboardHeight, {
          toValue: 0,
          duration: Platform.OS === 'ios' ? event.duration || 250 : 250,
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, [keyboardVerticalOffset]);

  const showBottomSheet = () => {
    // Reset pan gesture value when showing
    panGestureY.setValue(0);
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: false, // Changed to false to avoid driver conflicts
      }),
      Animated.timing(backdropOpacityAnim, {
        toValue: backdropOpacity,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const hideBottomSheet = () => {
    // Reset pan gesture value when hiding
    panGestureY.setValue(0);
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: height,
        duration: animationDuration,
        useNativeDriver: false, // Changed to false to avoid driver conflicts
      }),
      Animated.timing(backdropOpacityAnim, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => enablePanDownToClose,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return enablePanDownToClose && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          // Use setValue on a separate animated value to avoid native driver conflicts
          panGestureY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > height * 0.3 || gestureState.vy > 0.5) {
          // Reset gesture value before closing
          panGestureY.setValue(0);
          onClose();
        } else {
          // Reset both values to original position
          panGestureY.setValue(0);
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: false, // Changed to false to avoid driver conflicts
          }).start();
        }
      },
    })
  ).current;

  const renderHeader = () => {
    if (customHeader) {
      return customHeader;
    }

    return (
      <View style={animatedBottomSheetStyles.header}>
        {/* Drag Handle */}
        <View style={[animatedBottomSheetStyles.dragHandle, { backgroundColor: colors.BORDER_LIGHT }]} />
        
        {/* Title and Close Button */}
        {(title || showCloseButton) && (
          <View style={animatedBottomSheetStyles.titleContainer}>
            {title && (
              <Text style={[animatedBottomSheetStyles.title, { color: colors.TEXT_PRIMARY }]}>
                {title}
              </Text>
            )}
            {showCloseButton && (
              <TouchableOpacity
                style={[animatedBottomSheetStyles.closeButton, { backgroundColor: colors.BACKGROUND_SECONDARY }]}
                onPress={onClose}
              >
                <Text style={[animatedBottomSheetStyles.closeButtonText, { color: colors.TEXT_SECONDARY }]}>
                  ✕
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      presentationStyle="overFullScreen"
      onRequestClose={onClose}
    >
      <View style={animatedBottomSheetStyles.overlay}>
        {/* Backdrop */}
        {backdrop && (
          <TouchableWithoutFeedback onPress={onClose}>
            <Animated.View
              style={[
                animatedBottomSheetStyles.backdrop,
                {
                  opacity: backdropOpacityAnim,
                },
              ]}
            />
          </TouchableWithoutFeedback>
        )}

        {/* Bottom Sheet */}
        <Animated.View
          style={[
            animatedBottomSheetStyles.bottomSheet,
            {
              height,
              backgroundColor: colors.BACKGROUND_PRIMARY,
              borderTopLeftRadius: borderRadius,
              borderTopRightRadius: borderRadius,
              transform: [
                { 
                  translateY: Animated.add(translateY, panGestureY)
                },
                {
                  translateY: keyboardHeight.interpolate({
                    inputRange: [0, 400],
                    outputRange: [0, -400],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
          {...(enablePanDownToClose ? panResponder.panHandlers : {})}
        >
          <SafeAreaView style={animatedBottomSheetStyles.safeArea}>
            {renderHeader()}
            
            {/* Content */}
            <View style={animatedBottomSheetStyles.content}>
              {children}
            </View>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default AnimatedBottomSheet;
