import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Animated,
  PanResponder,
  ActivityIndicator,
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
  const [isLoading, setIsLoading] = useState(false); // Loading state for swipe button
  const [isSwipeCompleted, setIsSwipeCompleted] = useState(false); // Track if swipe is completed

  const appointmentData = route.params?.appointmentData;

  // Swipe animation state
  const swipeAnimation = new Animated.Value(0);

  // Handle swipe to store
  const handleSwipeToStore = () => {
    console.log('Swiped to store!');
    setIsLoading(true); // Start loading
    setIsSwipeCompleted(true); // Mark swipe as completed
    
    // Simulate store navigation or API call
    setTimeout(() => {
      setIsLoading(false); // Stop loading after navigation/API call
      // Add your store navigation logic here
      console.log('Navigation to store completed');
      // Note: Keep isSwipeCompleted as true to maintain button at end position
    }, 3000); // 3 seconds loading simulation
  };

  // Optional: Reset function for testing or if you need to reset the button
  const resetSwipeButton = () => {
    setIsSwipeCompleted(false);
    setIsLoading(false);
    swipeAnimation.setValue(0);
  };

  // Pan responder for swipe gesture
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return !isLoading && !isSwipeCompleted && Math.abs(gestureState.dx) > 20; // Disable when loading or completed
    },
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dx > 0 && !isLoading && !isSwipeCompleted) {
        // Calculate the maximum swipe distance (button width minus indicator width)
        const maxSwipeDistance = 250; // Approximate button width minus indicator width
        const currentDistance = Math.min(gestureState.dx, maxSwipeDistance);
        
        swipeAnimation.setValue(currentDistance);
        
        // Check if we've reached 70% of the button width
        const seventyPercentThreshold = maxSwipeDistance * 0.7;
        if (currentDistance >= seventyPercentThreshold) {
          // Auto-complete the swipe when 70% threshold is reached
          Animated.timing(swipeAnimation, {
            toValue: maxSwipeDistance,
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            handleSwipeToStore();
          });
        }
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (isLoading || isSwipeCompleted) return; // Prevent action when loading or completed
      
      const maxSwipeDistance = 250;
      const seventyPercentThreshold = maxSwipeDistance * 0.7;
      
      if (gestureState.dx >= seventyPercentThreshold) {
        // Complete swipe if past 70% threshold
        Animated.timing(swipeAnimation, {
          toValue: maxSwipeDistance,
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          handleSwipeToStore();
        });
      } else {
        // Reset position if not past threshold
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
            {!isLoading && !isSwipeCompleted && (
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
            )}
            <View style={styles.storeButtonArea}>
              {isLoading ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <ActivityIndicator size="small" color="#fff" style={{ marginRight: 8 }} />
                  <Text style={styles.storeButtonText}>LOADING...</Text>
                </View>
              ) : isSwipeCompleted ? (
                <Text style={[styles.storeButtonText, { color: '#10B981' }]}>COMPLETED ✓</Text>
              ) : (
                <Text style={styles.storeButtonText}>GO TO STORE</Text>
              )}
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
