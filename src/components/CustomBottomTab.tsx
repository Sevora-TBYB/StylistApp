import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeTabIcon from '../assets/images/svg/HomeTabIcon';
import TrialTabIcon from '../assets/images/svg/TrialTabIcon';
import WalletTabIcon from '../assets/images/svg/WalletTabIcon';
import AccountTabIcon from '../assets/images/svg/AccountTabIcon';

interface CustomBottomTabProps {
  activeTab: string;
  onTabPress: (tabName: string) => void;
}

const CustomBottomTab: React.FC<CustomBottomTabProps> = ({
  activeTab,
  onTabPress,
}) => {
  const tabs = [
    {
      name: 'Home',
      icon: HomeTabIcon,
      label: 'Home',
    },
    {
      name: 'Trial',
      icon: TrialTabIcon,
      label: 'Trial',
    },
    {
      name: 'Wallet',
      icon: WalletTabIcon,
      label: 'Wallet',
    },
    {
      name: 'Account',
      icon: AccountTabIcon,
      label: 'Account',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;
          const IconComponent = tab.icon;
          
          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tabItem}
              onPress={() => onTabPress(tab.name)}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <IconComponent
                  color={isActive ? '#121212' : '#737378'}
                  size={18}
                />
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  { color: isActive ? '#121212' : '#737378' },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingTop: 12,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  iconContainer: {
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default CustomBottomTab;
