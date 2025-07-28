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
  keyboardVerticalOffset = 0,
}) => {
  const { isDarkMode } = useSimpleDarkMode();
  const colors = getColors(isDarkMode);

  const translateY = useRef(new Animated.Value(height)).current;
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
        Animated.timing(keyboardHeight, {
          toValue: event.endCoordinates.height + keyboardVerticalOffset,
          duration: Platform.OS === 'ios' ? event.duration : 250,
          useNativeDriver: false,
        }).start();
      }
    );

    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      (event) => {
        Animated.timing(keyboardHeight, {
          toValue: 0,
          duration: Platform.OS === 'ios' ? event.duration : 250,
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  const showBottomSheet = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacityAnim, {
        toValue: backdropOpacity,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const hideBottomSheet = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: height,
        duration: animationDuration,
        useNativeDriver: true,
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
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > height * 0.3 || gestureState.vy > 0.5) {
          onClose();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
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
                { translateY },
                {
                  translateY: keyboardHeight.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -1],
                    extrapolate: 'clamp',
                  }),
                },
              ],
              marginBottom: keyboardHeight,
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
