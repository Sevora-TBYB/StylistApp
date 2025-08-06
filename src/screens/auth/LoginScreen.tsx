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
  Dimensions,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {COLORS, getColors, SIZES} from '../../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { globalStyles } from '../../styles';
import { useSimpleDarkMode, useLoginScreen } from '../../hooks';
import { loginScreenStyles } from './LoginScreen.styles';
import { CustomTextInput, GradientButton } from '../../components';
import { moderateScale } from '../../utils/Metrices';

const { width: screenWidth } = Dimensions.get('window');

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
    isLoading,
    error,
    clearError,
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
                <Image source={item.image} style={loginScreenStyles.sliderImage} resizeMode="stretch" />
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
              title={isLoading ? "Logging in..." : "Login"}
              onPress={handleLogin}
              colors={['#121212', '#666666']}
              disabled={isLoading}
            />
          </View>
        </View>
        </KeyboardAwareScrollView>
        <Toast 
          config={{
            success: (props: any) => (
              <View style={{
                height: 50,
                width: screenWidth * 0.8,
                backgroundColor: '#10B981',
                alignSelf: 'center',
                borderRadius: 8,
                paddingHorizontal: 16,
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 4,
                elevation: 5,
              }}>
                <Text style={{ color: 'white', fontWeight: '600', fontSize: 14 }}>
                  {props.text1}
                </Text>
                {props.text2 && (
                  <Text style={{ color: 'white', fontSize: 12, opacity: 0.9, marginTop: 2 }}>
                    {props.text2}
                  </Text>
                )}
              </View>
            ),
            error: (props: any) => (
              <View style={{
                height: 50,
                width: screenWidth * 0.8,
                backgroundColor: '#EF4444',
                alignSelf: 'center',
                borderRadius: 8,
                paddingHorizontal: 16,
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 4,
                elevation: 5,
              }}>
                <Text style={{ color: 'white', fontWeight: '600', fontSize: 14 }}>
                  {props.text1}
                </Text>
                {props.text2 && (
                  <Text style={{ color: 'white', fontSize: 12, opacity: 0.9, marginTop: 2 }}>
                    {props.text2}
                  </Text>
                )}
              </View>
            ),
            info: (props: any) => (
              <View style={{
                height: 50,
                width: screenWidth * 0.8,
                backgroundColor: '#F59E0B',
                alignSelf: 'center',
                borderRadius: 8,
                paddingHorizontal: 16,
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 4,
                elevation: 5,
              }}>
                <Text style={{ color: 'white', fontWeight: '600', fontSize: 14 }}>
                  {props.text1}
                </Text>
                {props.text2 && (
                  <Text style={{ color: 'white', fontSize: 12, opacity: 0.9, marginTop: 2 }}>
                    {props.text2}
                  </Text>
                )}
              </View>
            ),
          }}
        />
    </SafeAreaView>
  );
};

export default LoginScreen;
