import React, { useEffect } from 'react';
import {
  View,
  Text,
  Animated,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants';
import { globalStyles } from '../../styles';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/Metrices';
import styles from './styles';

interface SplashScreenProps {
  navigation: any;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);
  const progressAnim = new Animated.Value(0);

  const renderLogo = () => {
    try {
      return (
        <Image
          source={require('../../assets/images/png/sevora.png')}
          style={{ width: moderateScale(160), height: moderateScale(180) }}
          resizeMode="contain"
        />
      );
    } catch (error) {
      return <Text style={styles.logoText}>SEVORA</Text>;
    }
  };

  useEffect(() => {
    // Animate the splash screen
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Animate progress bar
    setTimeout(() => {
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false, // We need to animate width, so can't use native driver
      }).start();
    }, 500);

    // Navigate to Auth screen after 2.5 seconds
    const timer = setTimeout(() => {
      navigation.replace('Auth');
    }, 2500);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, progressAnim, navigation]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.PRIMARY} />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            {renderLogo()}
             <View style={styles.loadingContainer}>
          <View style={styles.progressBarContainer}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
        </View>
          </View>
        </View>
      </Animated.View>
      <View style={{height:verticalScale(400),width:horizontalScale(500),alignSelf:"center" }}>
        <Image
          source={require('../../assets/images/png/splash_screen.png')}
          style={{ width: '100%', height: "100%", position: 'absolute', bottom:horizontalScale( -50), left: 0}}
          resizeMode="cover"
        />
      </View>
    </SafeAreaView>
  );
};



export default SplashScreen;
