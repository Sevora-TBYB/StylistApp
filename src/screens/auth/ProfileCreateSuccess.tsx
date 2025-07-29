import React from 'react';
import {
  View,
  Text,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import { getColors } from '../../constants';
import { globalStyles } from '../../styles';
import { useSimpleDarkMode } from '../../hooks';
import { GradientButton } from '../../components';
import { profileCreateSuccessStyles } from './ProfileCreateSuccess.styles';

interface ProfileCreateSuccessProps {
  navigation: any;
}

const ProfileCreateSuccess: React.FC<ProfileCreateSuccessProps> = ({ navigation }) => {
  const { isDarkMode } = useSimpleDarkMode();
  const colors = getColors(isDarkMode);

  const handleContinue = () => {
    // Navigate to app screens
    navigation.navigate('App');
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar
        backgroundColor="white" 
        barStyle="dark-content"
        translucent={false}
      />
      <View style={[profileCreateSuccessStyles.container, { backgroundColor: colors.BACKGROUND_PRIMARY }]}>
        
        {/* Success Icon/Image */}
        <View style={profileCreateSuccessStyles.iconSection}>
          <LottieView
            source={require('../../assets/animation/Successtick.json')}
            autoPlay
            loop={false}
            style={{
              width: 200,
              height: 200,
            }}
            speed={1}
          />
        </View>

        {/* Content Section */}
        <View style={profileCreateSuccessStyles.contentSection}>
          <Text style={[profileCreateSuccessStyles.heading, { color: colors.TEXT_PRIMARY }]}>
            Congratulations
          </Text>
          <Text style={[profileCreateSuccessStyles.description, { color: colors.TEXT_SECONDARY }]}>
            Your account has been created successfully! {"\n"}Welcome to SEVORA's Stylist family.
          </Text>
        </View>

        {/* Button Section */}
        <View style={profileCreateSuccessStyles.buttonSection}>
          <GradientButton
            title="GO TO DASHBOARD"
            onPress={handleContinue}
            colors={['#121212', '#666666']}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileCreateSuccess;
