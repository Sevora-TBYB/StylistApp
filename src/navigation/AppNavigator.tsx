import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, SearchScreen, ProfileScreen } from '../screens/app';
import CustomTabBar from '../components/CustomTabBar';

export type AppTabParamList = {
  Home: undefined;
  Trial: undefined;
  Wallet: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Trial"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Trial',
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Wallet',
        }}
      />
      <Tab.Screen
        name="Account"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Account',
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
