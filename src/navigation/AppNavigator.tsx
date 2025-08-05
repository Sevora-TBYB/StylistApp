import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { HomeScreen, SearchScreen, ProfileScreen } from '../screens/app';
import CustomBottomTab from '../components/CustomBottomTab';

export type AppTabParamList = {
  Home: undefined;
  Trial: undefined;
  Wallet: undefined;
  Account: undefined;
};

const AppNavigator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Home');

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
  };

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen />;
      case 'Trial':
        return <SearchScreen />;
      case 'Wallet':
        return <SearchScreen />;
      case 'Account':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.screenContainer}>
        {renderActiveScreen()}
      </View>
      <CustomBottomTab 
        activeTab={activeTab} 
        onTabPress={handleTabPress} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  screenContainer: {
    flex: 1,
  },
});

export default AppNavigator;
