import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { OtpInput } from 'react-native-otp-entry';
import { getColors, SIZES } from '../../constants';
import { globalStyles } from '../../styles';
import { useSimpleDarkMode, useProfileCreation } from '../../hooks';
import { CustomTextInput, CustomDropdown, GradientButton, AnimatedBottomSheet } from '../../components';
import { profileCreationStyles } from './ProfileCreation.styles';

interface ProfileCreationProps {
  navigation: any;
}

const ProfileCreation: React.FC<ProfileCreationProps> = ({ navigation }) => {
  const { isDarkMode } = useSimpleDarkMode();
  const colors = getColors(isDarkMode);
  
  const {
    // Dropdown options
    educationOptions,
    workExperienceOptions,
    yearsExperienceOptions,
    
    // State
    fullName,
    emailAddress,
    mobileNumber,
    education,
    workExperience,
    yearsExperience,
    profileImage,
    showOtpBottomSheet,
    otp,
    
    // State setters
    setFullName,
    setEmailAddress,
    setMobileNumber,
    setEducation,
    setWorkExperience,
    setYearsExperience,
    setShowOtpBottomSheet,
    setOtp,
    
    // Methods
    handleImageUpload,
    handleImageRemove,
    handleContinue,
    handleOtpVerification,
    handleResendOtp,
  } = useProfileCreation({ navigation });

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
              onPress={handleImageUpload}
              onLongPress={handleImageRemove}
            >
              <Text style={[profileCreationStyles.uploadButtonText, { color: colors.PRIMARY }]}>
                {profileImage ? 'Change Image' : 'Upload Image'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Section */}
          <View style={[profileCreationStyles.formSection, { paddingBottom: 100 }]}>
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

            <CustomDropdown
              label="Highest Education Qualification"
              placeholder="Select your education qualification"
              options={educationOptions}
              value={education}
              onSelect={setEducation}
              isDarkMode={isDarkMode}
              containerStyle={{ zIndex: 3000 }}
            />

            <CustomDropdown
              label="Where you have worked before?"
              placeholder="Select your work experience"
              options={workExperienceOptions}
              value={workExperience}
              onSelect={setWorkExperience}
              isDarkMode={isDarkMode}
              containerStyle={{ zIndex: 2000 }}
            />

            <CustomDropdown
              label="How many years of experience do you have?"
              placeholder="Select years of experience"
              options={yearsExperienceOptions}
              value={yearsExperience}
              onSelect={setYearsExperience}
              isDarkMode={isDarkMode}
              containerStyle={{ zIndex: 1000 }}
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

      {/* OTP Verification Bottom Sheet */}
      <AnimatedBottomSheet
        visible={showOtpBottomSheet}
        onClose={() => setShowOtpBottomSheet(false)}
        title=""
        height={350}
        keyboardVerticalOffset={30}
      >
        <View style={{ flex: 1, paddingBottom: 20 }}>
          <Text style={{ 
            fontSize: 22, 
            color: colors.PRIMARY, 
            fontWeight: '600',
            marginBottom: 5,
          }}>
            Mobile Number Verification
          </Text>
          
          {/* Description */}
          <Text style={{ 
            fontSize: 12, 
            color: colors.TEXT_SECONDARY, 
            marginBottom: 20,
          }}>
            OTP has been sent to {mobileNumber}
          </Text>
          
          <Text style={{ 
            fontSize: 14, 
            color: colors.TEXT_SECONDARY, 
          }}>
            Enter OTP
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
                  borderColor: colors.BORDER_LIGHT,
                  borderWidth: 1,
                  borderRadius: 8,
                  width: 45,
                  height: 45,
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
        </View>
      </AnimatedBottomSheet>
    </SafeAreaView>
  );
};

export default ProfileCreation;
