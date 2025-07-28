import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  launchImageLibrary,
  MediaType,
  PhotoQuality,
  ImagePickerResponse,
} from 'react-native-image-picker';
import { OtpInput } from 'react-native-otp-entry';
import { getColors, SIZES } from '../../constants';
import { globalStyles } from '../../styles';
import { useSimpleDarkMode } from '../../hooks';
import { CustomTextInput, GradientButton, AnimatedBottomSheet } from '../../components';
import { profileCreationStyles } from './ProfileCreation.styles';

interface ProfileCreationProps {
  navigation: any;
}

const ProfileCreation: React.FC<ProfileCreationProps> = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [education, setEducation] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showOtpBottomSheet, setShowOtpBottomSheet] = useState(false);
  const [otp, setOtp] = useState('');
  
  const { isDarkMode } = useSimpleDarkMode();
  const colors = getColors(isDarkMode);

  const handleImageUpload = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 400,
      maxWidth: 400,
      quality: 0.8 as PhotoQuality,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel || response.errorMessage) {
        return;
      }
      
      if (response.assets && response.assets[0]) {
        setProfileImage(response.assets[0].uri || null);
      }
    });
  };

  const handleContinue = () => {
    // Validate required fields
    if (!fullName || !emailAddress || !mobileNumber) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    // Show OTP verification bottom sheet
    setShowOtpBottomSheet(true);
  };

  const handleOtpVerification = () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }
    
    // Close OTP bottom sheet and navigate to success screen
    setShowOtpBottomSheet(false);
    navigation.navigate('ProfileCreateSuccess');
  };

  const handleResendOtp = () => {
    // Clear current OTP
    setOtp('');
    Alert.alert('Success', 'OTP has been resent to your mobile number');
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar 
        backgroundColor="white" 
        barStyle="dark-content" 
        translucent={false}
      />
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        keyboardOpeningTime={0}
        showsVerticalScrollIndicator={false}
        extraScrollHeight={20}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[profileCreationStyles.container, { backgroundColor: colors.BACKGROUND_PRIMARY }]}>
          
          {/* Header Section */}
          <View style={profileCreationStyles.headerSection}>
            <Text style={[profileCreationStyles.heading, { color: colors.TEXT_PRIMARY }]}>
              Tell us about yourself
            </Text>
            <Text style={[profileCreationStyles.description, { color: colors.TEXT_SECONDARY }]}>
              Almost there! fill below mentioned details to complete your profile
            </Text>
          </View>

          {/* Profile Image Section */}
          <View style={profileCreationStyles.imageSection}>
            <View style={profileCreationStyles.imageContainer}>
              {profileImage ? (
                <Image 
                  source={{ uri: profileImage }} 
                  style={profileCreationStyles.profileImage}
                />
              ) : (
                <View style={[profileCreationStyles.placeholderImage, { backgroundColor: colors.BACKGROUND_SECONDARY }]}>
                  <Text style={[profileCreationStyles.placeholderText, { color: colors.TEXT_SECONDARY }]}>
                    No Image
                  </Text>
                </View>
              )}
            </View>
            
            <TouchableOpacity 
              style={[profileCreationStyles.uploadButton, { borderColor: colors.PRIMARY }]}
              onPress={() => setShowBottomSheet(true)}
            >
              <Text style={[profileCreationStyles.uploadButtonText, { color: colors.PRIMARY }]}>
                Upload Image
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Section */}
          <View style={profileCreationStyles.formSection}>
            <CustomTextInput
              label="Full Name *"
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
              isDarkMode={isDarkMode}
              containerStyle={{ marginBottom: SIZES.MARGIN_LARGE }}
              inputStyle={{ backgroundColor:"#F6F6F6" , color: colors.TEXT_PRIMARY }}
            />

            <CustomTextInput
              label="Email Address *"
              placeholder="Enter your email address"
              value={emailAddress}
              onChangeText={setEmailAddress}
              keyboardType="email-address"
              autoCapitalize="none"
              isDarkMode={isDarkMode}
              inputStyle={{ backgroundColor:"#F6F6F6" , color: colors.TEXT_PRIMARY }}
            />

            <CustomTextInput
              label="Mobile Number *"
              placeholder="Enter your mobile number"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
              isDarkMode={isDarkMode}
              inputStyle={{ backgroundColor:"#F6F6F6" , color: colors.TEXT_PRIMARY }}
            />

            <CustomTextInput
              label="Highest Education Qualification"
              placeholder="Enter your education qualification"
              value={education}
              onChangeText={setEducation}
              isDarkMode={isDarkMode}
              inputStyle={{ backgroundColor:"#F6F6F6" , color: colors.TEXT_PRIMARY }}
            />

            <CustomTextInput
              label="Where you have worked before?"
              placeholder="Enter your previous work experience"
              value={workExperience}
              onChangeText={setWorkExperience}
              multiline={true}
              numberOfLines={3}
              isDarkMode={isDarkMode}
              inputStyle={{ backgroundColor:"#F6F6F6" , color: colors.TEXT_PRIMARY }}
            />

            <CustomTextInput
              label="How many years of experience do you have?"
              placeholder="Enter years of experience"
              value={yearsExperience}
              onChangeText={setYearsExperience}
              keyboardType="numeric"
              isDarkMode={isDarkMode}
              inputStyle={{ backgroundColor:"#F6F6F6" , color: colors.TEXT_PRIMARY }}
            />

            {/* Continue Button */}
            <View style={profileCreationStyles.buttonSection}>
              <GradientButton
                title="Continue"
                onPress={handleContinue}
                colors={['#121212', '#666666']}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>

      {/* Image Upload Bottom Sheet */}
      <AnimatedBottomSheet
        visible={showBottomSheet}
        onClose={() => setShowBottomSheet(false)}
        title="Upload Profile Image"
        height={300}
      >
        <View style={{ flex: 1, paddingTop: 20 }}>
          <TouchableOpacity
            style={{
              padding: 16,
              backgroundColor: colors.BACKGROUND_SECONDARY,
              borderRadius: 12,
              marginBottom: 12,
              alignItems: 'center',
            }}
            onPress={() => {
              handleImageUpload();
              setShowBottomSheet(false);
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '500', color: colors.TEXT_PRIMARY }}>
              📷 Choose from Gallery
            </Text>
            <Text style={{ fontSize: 14, color: colors.TEXT_SECONDARY, marginTop: 4 }}>
              Select an image from your photo library
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              padding: 16,
              backgroundColor: colors.BACKGROUND_SECONDARY,
              borderRadius: 12,
              marginBottom: 12,
              alignItems: 'center',
            }}
            onPress={() => {
              // You can add camera functionality here later
              setShowBottomSheet(false);
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '500', color: colors.TEXT_PRIMARY }}>
              📸 Take Photo
            </Text>
            <Text style={{ fontSize: 14, color: colors.TEXT_SECONDARY, marginTop: 4 }}>
              Capture a new photo with your camera
            </Text>
          </TouchableOpacity>

          {profileImage && (
            <TouchableOpacity
              style={{
                padding: 16,
                backgroundColor: colors.ERROR + '20',
                borderRadius: 12,
                alignItems: 'center',
              }}
              onPress={() => {
                setProfileImage(null);
                setShowBottomSheet(false);
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '500', color: colors.ERROR }}>
                🗑️ Remove Image
              </Text>
              <Text style={{ fontSize: 14, color: colors.TEXT_SECONDARY, marginTop: 4 }}>
                Remove the current profile image
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </AnimatedBottomSheet>

      {/* OTP Verification Bottom Sheet */}
      <AnimatedBottomSheet
        visible={showOtpBottomSheet}
        onClose={() => setShowOtpBottomSheet(false)}
        title="Mobile Number Verification"
        height={450}
      >
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, paddingTop: 20 }}
          enableOnAndroid={true}
          enableAutomaticScroll={true}
          keyboardOpeningTime={0}
          showsVerticalScrollIndicator={false}
          extraScrollHeight={20}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
        >
          {/* Description */}
          <Text style={{ 
            fontSize: 16, 
            color: colors.TEXT_SECONDARY, 
            textAlign: 'center',
            marginBottom: 30,
            lineHeight: 22,
            paddingHorizontal: 10
          }}>
            OTP has been sent to {mobileNumber}
          </Text>

          {/* OTP Input */}
          <View style={{ marginBottom: 30, alignItems: 'center' }}>
            <OtpInput
              numberOfDigits={6}
              focusColor={colors.PRIMARY}
              focusStickBlinkingDuration={500}
              onTextChange={(text) => setOtp(text)}
              onFilled={(text) => setOtp(text)}
              textInputProps={{
                accessibilityLabel: "One-Time Password",
              }}
              theme={{
                containerStyle: {
                  marginVertical: 10,
                },
                pinCodeContainerStyle: {
                  backgroundColor: colors.BACKGROUND_SECONDARY,
                  borderColor: colors.BORDER_LIGHT,
                  borderWidth: 1,
                  borderRadius: 8,
                  width: 45,
                  height: 50,
                  marginHorizontal: 5,
                },
                pinCodeTextStyle: {
                  fontSize: 18,
                  fontWeight: '600',
                  color: colors.TEXT_PRIMARY,
                },
                focusStickStyle: {
                  backgroundColor: colors.PRIMARY,
                },
                focusedPinCodeContainerStyle: {
                  borderColor: colors.PRIMARY,
                  borderWidth: 2,
                },
              }}
            />
          </View>

          {/* Verify Button */}
          <View style={{ marginBottom: 20 }}>
            <GradientButton
              title="Verify"
              onPress={handleOtpVerification}
              colors={['#121212', '#666666']}
            />
          </View>

          {/* Resend OTP */}
          <TouchableOpacity
            style={{ alignItems: 'center', paddingVertical: 10 }}
            onPress={handleResendOtp}
          >
            <Text style={{ 
              fontSize: 14, 
              color: colors.PRIMARY, 
              textDecorationLine: 'underline',
              fontWeight: '500'
            }}>
              Resend OTP
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </AnimatedBottomSheet>
    </SafeAreaView>
  );
};

export default ProfileCreation;
