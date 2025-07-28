import React from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getColors, SIZES } from '../../constants';
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
          <View style={[profileCreateSuccessStyles.successIcon, { backgroundColor: colors.SUCCESS + '20' }]}>
            <Text style={[profileCreateSuccessStyles.checkMark, { color: colors.SUCCESS }]}>✓</Text>
          </View>
        </View>

        {/* Content Section */}
        <View style={profileCreateSuccessStyles.contentSection}>
          <Text style={[profileCreateSuccessStyles.heading, { color: colors.TEXT_PRIMARY }]}>
            Profile Created Successfully!
          </Text>
          <Text style={[profileCreateSuccessStyles.description, { color: colors.TEXT_SECONDARY }]}>
            Congratulations! Your profile has been created successfully. You can now access all the features of the app.
          </Text>
        </View>

        {/* Button Section */}
        <View style={profileCreateSuccessStyles.buttonSection}>
          <GradientButton
            title="Get Started"
            onPress={handleContinue}
            colors={['#121212', '#666666']}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileCreateSuccess;
