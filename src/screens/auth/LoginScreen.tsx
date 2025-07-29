import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {COLORS, getColors, SIZES} from '../../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { globalStyles } from '../../styles';
import { useSimpleDarkMode, useLoginScreen } from '../../hooks';
import { loginScreenStyles } from './LoginScreen.styles';
import { CustomTextInput, GradientButton } from '../../components';
import { moderateScale } from '../../utils/Metrices';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const {isDarkMode, toggleDarkMode} = useSimpleDarkMode();
  const {
    email,
    password,
    currentSlide,
    sliderData,
    setEmail,
    setPassword,
    handleScroll,
    handleLogin,
    handleNavigateToSignup,
  } = useLoginScreen({ navigation });
  
  // Get colors based on current theme
  const colors = getColors(isDarkMode);

  const renderSlider = () => {
    return (
      <View style={loginScreenStyles.sliderContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={loginScreenStyles.slider}>
          {sliderData.map((item, index) => (
            <View key={item.id} style={loginScreenStyles.slide}>
              <View style={loginScreenStyles.imageContainer}>
                <Image source={item.image} style={loginScreenStyles.sliderImage} resizeMode="cover" />
              </View>
              <View style={loginScreenStyles.textContainer}>
                <Text style={[loginScreenStyles.slideTitle, {color: colors.TEXT_WHITE}]}>
                  {item.title}
                </Text>
                <Text style={[loginScreenStyles.slideDescription, {color: colors.TEXT_WHITE}]}>
                  {item.description}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
        
        {/* Pagination dots */}
        <View style={loginScreenStyles.pagination}>
          {sliderData.map((_, index) => (
            <View
              key={index}
              style={[
                loginScreenStyles.paginationDot,
                currentSlide === index && loginScreenStyles.paginationDotActive,
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar 
        backgroundColor="white" 
        barStyle="light-content" 
        translucent={false}
      />
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid={true}
          enableAutomaticScroll={true}
          keyboardOpeningTime={250}
          showsVerticalScrollIndicator={false}
          extraScrollHeight={150}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          extraHeight={150}
          viewIsInsideTabBar={false}
        >
        {renderSlider()}
        
        <View style={[loginScreenStyles.content, {backgroundColor: colors.TEXT_WHITE, paddingBottom: 120}]}>
          <Text style={[loginScreenStyles.title, {color: colors.TEXT_PRIMARY}]}>Get Started</Text>
          <Text style={[loginScreenStyles.subtitle, {color: colors.TEXT_SECONDARY}]}>
            Enter the email address & password that has been given by the SEVORA's team.
          </Text>
          
          <View style={loginScreenStyles.form}>
            <CustomTextInput
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              isDarkMode={isDarkMode}
            />
            
            <CustomTextInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              isPassword={true}
              isDarkMode={isDarkMode}
              containerStyle={{ marginBottom: moderateScale(30) }}
            />
            
            <GradientButton
              title="Login"
              onPress={handleLogin}
              colors={['#121212', '#666666']}
            />
          </View>
        </View>
        </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
