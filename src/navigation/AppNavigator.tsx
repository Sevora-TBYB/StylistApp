import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen, SearchScreen, ProfileScreen} from '../screens/app';

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
      screenOptions={{
        headerShown: false, // Hide header since we have custom header in HomeScreen
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e9ecef',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <HomeIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Trial"
        component={SearchScreen} // Reusing SearchScreen as placeholder for Trial
        options={{
          title: 'Trial',
          tabBarLabel: 'Trial',
          tabBarIcon: ({color, size}) => (
            <TrialIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={SearchScreen} // Reusing SearchScreen as placeholder for Wallet
        options={{
          title: 'Wallet',
          tabBarLabel: 'Wallet',
          tabBarIcon: ({color, size}) => (
            <WalletIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={ProfileScreen}
        options={{
          title: 'Account',
          tabBarLabel: 'Account',
          tabBarIcon: ({color, size}) => (
            <AccountIcon color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Simple icon components (you can replace with actual icon library later)
import {View} from 'react-native';

const HomeIcon: React.FC<{color: string; size: number}> = ({color, size}) => (
  <View
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: size / 4,
    }}
  />
);

const TrialIcon: React.FC<{color: string; size: number}> = ({color, size}) => (
  <View
    style={{
      width: size,
      height: size,
      backgroundColor: 'transparent',
      borderRadius: size / 2,
      borderWidth: 2,
      borderColor: color,
    }}
  />
);

const WalletIcon: React.FC<{color: string; size: number}> = ({color, size}) => (
  <View
    style={{
      width: size * 0.8,
      height: size * 0.6,
      backgroundColor: 'transparent',
      borderRadius: 4,
      borderWidth: 2,
      borderColor: color,
    }}
  />
);

const AccountIcon: React.FC<{color: string; size: number}> = ({color, size}) => (
  <View
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: size / 2,
    }}
  />
);

export default AppNavigator;
