import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
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

  // Check if we have appointment data from navigation
  const appointmentData = route.params?.appointmentData;

  useEffect(() => {
    // If we have appointment data, show ongoing trials first
    if (appointmentData) {
      setActiveTab('ongoing');
    }
  }, [appointmentData]);

  useEffect(() => {
    // Initialize countdowns for ongoing trials
    const initialCountdowns: Record<string, number> = {};
    trialOrders.forEach(order => {
      if (order.status === 'ongoing' && order.countdownTime) {
        initialCountdowns[order.id] = order.countdownTime;
      }
    });
    setCountdowns(initialCountdowns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // Update countdowns
      setCountdowns(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(id => {
          if (updated[id] > 0) {
            updated[id] -= 1;
          }
        });
        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock data for trial orders - sorted by time for upcoming trials first
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
      countdownTime: 300, // 5 minutes in seconds
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
      countdownTime: 900, // 15 minutes in seconds
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

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredOrders = trialOrders.filter(order => order.status === activeTab);

  const renderTrialCard = (order: TrialOrder) => (
    <View key={order.id} style={styles.trialCard}>
      <Text style={styles.newTrialText}>New Trial Order!</Text>
      
      <View style={styles.trialTimeSection}>
        <Text style={styles.trialStartTime}>{order.trialStartTime}</Text>
      </View>

      <View style={styles.distanceRow}>
        <View style={styles.distanceItem}>
          <Text style={styles.distanceLabel}>Pickup</Text>
          <Text style={styles.distanceValue}>{order.pickupDistance}</Text>
        </View>
        <View style={styles.distanceItem}>
          <Text style={styles.distanceLabel}>Drop</Text>
          <Text style={styles.distanceValue}>{order.dropDistance}</Text>
        </View>
      </View>

      <Text style={styles.companyName}>{order.company}</Text>
      <Text style={styles.address} numberOfLines={2}>
        {order.address}
      </Text>

      <View style={styles.orderFooter}>
        <View style={styles.orderInfoRow}>
          <Text style={styles.orderId}>Order ID: {order.orderId}</Text>
          <Text style={styles.timeAway}>{order.timeAway}</Text>
        </View>
        
        {order.status === 'ongoing' && (
          <TouchableOpacity style={styles.goToStoreButton}>
            <LinearGradient
              colors={['#B2B2B2', '#FFFFFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.goToStoreGradient}
            >
              <Text style={styles.goToStoreText}>
                GO TO STORE {countdowns[order.id] && formatCountdown(countdowns[order.id])}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trial Orders</Text>
        <Text style={styles.headerTime}>{formatTime(currentTime)}</Text>
      </View>

      {/* Tab Switcher */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'ongoing' && styles.activeTab,
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
            styles.tab,
            activeTab === 'completed' && styles.activeTab,
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

      {/* Trial Orders List */}
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {filteredOrders.map(renderTrialCard)}
        {filteredOrders.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No {activeTab} trial orders found
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TrialOrdersScreen;