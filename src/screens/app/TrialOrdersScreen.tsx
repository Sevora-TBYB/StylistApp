import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Animated,
  PanResponder,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import NotificationIcon from '../../assets/images/svg/NotificationIcon';
import ClockIcon from '../../assets/images/svg/ClockIcon';
import DoubleArrowIcon from '../../assets/images/svg/DoubleArrowIcon';
import { trialOrdersStyles as styles } from '../../styles/trialOrdersStyles';
import { AppTabParamList } from '../../navigation/AppNavigator';

export interface TrialOrder {
  id: string;
  company: string;
  address: string;
  orderId: string;
  trialStartTime: string;
  pickupDistance: string;
  dropDistance: string;
  timeAway: string;
  status: 'ongoing' | 'completed';
  countdownTime?: number;
}

const TrialOrdersScreen: React.FC = () => {
  const route = useRoute<RouteProp<AppTabParamList, 'Trial'>>();
  const [activeTab, setActiveTab] = useState<'ongoing' | 'completed'>('ongoing');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [countdowns, setCountdowns] = useState<Record<string, number>>({});
  const [isSwipeButtonEnabled, setIsSwipeButtonEnabled] = useState(true); // Control which button to show

  const appointmentData = route.params?.appointmentData;

  // Swipe animation state
  const swipeAnimation = new Animated.Value(0);

  // Handle swipe to store
  const handleSwipeToStore = () => {
    console.log('Swiped to store!');
    // Add your store navigation logic here
  };

  // Pan responder for swipe gesture
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > 20;
    },
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dx > 0) {
        swipeAnimation.setValue(gestureState.dx);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 100) {
        // Complete swipe
        Animated.timing(swipeAnimation, {
          toValue: 1200,
          duration: 100,
          useNativeDriver: false,
        }).start(() => {
          handleSwipeToStore();
          swipeAnimation.setValue(0);
        });
      } else {
        // Reset position
        Animated.spring(swipeAnimation, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    },
  });




  const trialOrders: TrialOrder[] = [
    {
      id: '2345',
      company: 'COMPANY NAME',
      address: 'House 12, Street 45, City Name, Full Address Goes Here, Pin Code 123456',
      orderId: '#2345',
      trialStartTime: '12:30 PM',
      pickupDistance: '12 KM',
      dropDistance: '12 KM',
      timeAway: '10 mins away',
      status: 'ongoing',
      countdownTime: 300,
    },
    {
      id: '2346',
      company: 'UPCOMING TRIAL CO',
      address: 'House 25, Street 78, Future Location, Coming Soon Address, Pin Code 789012',
      orderId: '#2346',
      trialStartTime: '02:15 PM',
      pickupDistance: '15 KM',
      dropDistance: '8 KM',
      timeAway: '45 mins away',
      status: 'ongoing',
      countdownTime: 900,
    },
    {
      id: '2344',
      company: 'ANOTHER COMPANY',
      address: 'House 8, Street 23, City Name, Another Address Location, Pin Code 654321',
      orderId: '#2344',
      trialStartTime: '11:00 AM',
      pickupDistance: '8 KM',
      dropDistance: '10 KM',
      timeAway: 'Completed',
      status: 'completed',
    },
  ];


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Trial Orders</Text>
      <View style={styles.headerRightSection}>
        <View style={styles.countdownBadge}>
          <Text style={styles.countdownText}>1:30:59</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <LinearGradient
            colors={['#E5E5E5', '#F6F6F6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.notificationButtonGradient}
          >
            <NotificationIcon color='#000'/>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>

    <View style={[styles.tabContainer, { borderColor:'#DBDBDB'}]}>
      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === 'ongoing' && styles.activeTabButton,
        ]}
        onPress={() => setActiveTab('ongoing')}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === 'ongoing' && styles.activeTabText,
          ]}
        >
          ONGOING
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === 'completed' && styles.activeTabButton,
        ]}
        onPress={() => setActiveTab('completed')}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === 'completed' && styles.activeTabText,
          ]}
        >
          COMPLETED
        </Text>
      </TouchableOpacity>
    </View>

    {activeTab === 'ongoing' && (
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.newTrialLabel}>New Trial Order!</Text>
        <View style={styles.trialCard}>
          <View style={styles.trialTimeBox}>
            <Text style={styles.trialTimeText}>Trial starts from:</Text>
            <Text style={styles.timeText}>12:30 PM</Text>
          </View>

          <View style={styles.distanceRow}>
            <View style={{flex:1, paddingVertical:16, justifyContent:"center", alignItems:"center"}}>
              <Text style={styles.distanceText}>Pickup: <Text style={styles.boldText}>12 KM</Text></Text>
            </View>
            <View style={{flex:1,paddingVertical:16, borderLeftWidth:1, borderColor:'#DBDBDB', justifyContent:"center", alignItems:"center"}}>
              <Text style={styles.distanceText}>Drop: <Text style={styles.boldText}>12 KM</Text></Text>
            </View>
          </View>

          
        </View>
        <View style={styles.orderDetailsBox}>
            <View style={styles.orderTopRow}>
              <Text style={styles.orderId}>Pickup From</Text>
              <Text style={styles.orderId}>Order ID: #2345</Text>
            </View>
            <Text style={styles.companyName}>Elark Company</Text>
            <Text style={styles.addressText}>
              10W3, 10th Floor, WEST TOWER, Mani Casadona 11F, 04, Street Number 372,
              Action Area I, IIF, Newtown, New Town, Chakpachuria, West Bengal 700156
            </Text>
            <View style={styles.timeAwayRow}>
              <ClockIcon size={14} color="#737378" />
              <Text style={styles.timeAway}>10 mins away</Text>
            </View>
          </View>
        {/* Removed buttons from here - moved to bottom */}

      </ScrollView>
    )}

    {/* Bottom Button Container */}
    <View style={styles.bottomButtonContainer}>
      {isSwipeButtonEnabled ? (
        /* Unified Swipe-to-Store Button */
        <View style={styles.swipeToStoreContainer} {...panResponder.panHandlers}>
          <LinearGradient
            colors={['#121212', '#666666']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.swipeToStoreGradient}
          >
            <Animated.View 
              style={[
                styles.swipeIndicator,
                {
                  transform: [{ translateX: swipeAnimation }]
                }
              ]}
            >
              <View style={{ flexDirection: 'row',}}>
                <DoubleArrowIcon size={13} color="#121212" />
              </View>
            </Animated.View>
            <View style={styles.storeButtonArea}>
              <Text style={styles.storeButtonText}>GO TO STORE</Text>
            </View>
          </LinearGradient>
        </View>
      ) : (
        /* Disabled Button */
        <View style={styles.disabledButtonContainer}>
          <View style={styles.disabledButtonContent}>
            <Text style={styles.disabledButtonText}>TRIAL WILL START IN 1:30:59 SEC</Text>
          </View>
        </View>
      )}
    </View>
    </SafeAreaView>
  );
};

export default TrialOrdersScreen;
