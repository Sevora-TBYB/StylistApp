import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import NotificationIcon from '../assets/images/svg/NotificationIcon';
import { TrialScreenProps } from '../navigation/types';

interface TrialOrder {
  id: string;
  orderNumber: string;
  startTime: string;
  pickupDistance: string;
  dropDistance: string;
  company: string;
  address: string;
  minutesAway: number;
  countdownTime: number; // in seconds
  status: 'ongoing' | 'completed';
}

const mockTrialOrders: TrialOrder[] = [
  {
    id: '1',
    orderNumber: 'TR001',
    startTime: '10:00 AM',
    pickupDistance: '2.3 km',
    dropDistance: '4.1 km',
    company: 'Fashion Hub',
    address: '123 Fashion Street, Downtown Plaza, City Center, Floor 2',
    minutesAway: 15,
    countdownTime: 3600, // 1 hour
    status: 'ongoing',
  },
  {
    id: '2',
    orderNumber: 'TR002',
    startTime: '2:00 PM',
    pickupDistance: '1.8 km',
    dropDistance: '3.2 km',
    company: 'Style Palace',
    address: '456 Trend Avenue, Shopping Complex, Metro City, Ground Floor',
    minutesAway: 8,
    countdownTime: 1800, // 30 minutes
    status: 'ongoing',
  },
  {
    id: '3',
    orderNumber: 'TR003',
    startTime: '11:00 AM',
    pickupDistance: '3.1 km',
    dropDistance: '2.7 km',
    company: 'Glamour Store',
    address: '789 Style Boulevard, Fashion District, New Town',
    minutesAway: 0,
    countdownTime: 0,
    status: 'completed',
  },
];

const TrialScreen: React.FC<TrialScreenProps> = ({ route }) => {
  const [activeTab, setActiveTab] = useState<'ongoing' | 'completed'>('ongoing');
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: number }>({});

  // Get trial parameters from navigation if provided
  const trialId = route?.params?.trialId;
  const selectedDate = route?.params?.selectedDate;

  useEffect(() => {
    // Initialize countdown timers
    const initialTimes: { [key: string]: number } = {};
    mockTrialOrders.forEach(order => {
      if (order.status === 'ongoing') {
        initialTimes[order.id] = order.countdownTime;
      }
    });
    setTimeLeft(initialTimes);

    // If coming from HomeScreen with specific trialId, focus on that trial
    if (trialId) {
      // Could filter or highlight specific trial here
      console.log('Navigated to trial:', trialId, 'on date:', selectedDate);
    }

    // Start countdown timer
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(id => {
          if (updated[id] > 0) {
            updated[id] -= 1;
          }
        });
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [trialId, selectedDate]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredOrders = mockTrialOrders.filter(order => order.status === activeTab);

  const renderTrialCard = (order: TrialOrder) => (
    <View key={order.id} style={styles.trialCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.newTrialText}>New Trial Order!</Text>
      </View>
      
      <View style={styles.timeContainer}>
        <LinearGradient
          colors={['#4A90E2', '#7BB3F0']}
          style={styles.timeBox}
        >
          <Text style={styles.timeText}>{order.startTime}</Text>
        </LinearGradient>
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

      <View style={styles.companySection}>
        <Text style={styles.companyName}>{order.company}</Text>
        <Text style={styles.companyAddress} numberOfLines={2}>
          {order.address}
        </Text>
      </View>

      <View style={styles.actionRow}>
        <Text style={styles.minutesAway}>{order.minutesAway} mins away</Text>
        <TouchableOpacity style={styles.goToStoreButton}>
          <LinearGradient
            colors={['#FF6B6B', '#FF8E8E']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>GO TO STORE</Text>
            <Text style={styles.chevron}>››</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {order.status === 'ongoing' && timeLeft[order.id] > 0 && (
        <View style={styles.countdownContainer}>
          <Text style={styles.countdownText}>
            Time remaining: {formatTime(timeLeft[order.id])}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trial Orders</Text>
        <View style={styles.headerRight}>
          <Text style={styles.timerText}>14:23</Text>
          <TouchableOpacity style={styles.notificationButton}>
            <NotificationIcon />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'ongoing' && styles.activeTab]}
          onPress={() => setActiveTab('ongoing')}
        >
          <Text style={[styles.tabText, activeTab === 'ongoing' && styles.activeTabText]}>
            ONGOING
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
            COMPLETED
          </Text>
        </TouchableOpacity>
      </View>

      {/* Trial Orders */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredOrders.map(renderTrialCard)}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#000',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timerText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  notificationButton: {
    padding: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#fff',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#000',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  trialCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    marginBottom: 12,
  },
  newTrialText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  timeContainer: {
    marginBottom: 16,
  },
  timeBox: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  distanceRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 24,
  },
  distanceItem: {
    alignItems: 'center',
  },
  distanceLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  distanceValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  companySection: {
    marginBottom: 16,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  companyAddress: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  minutesAway: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
  },
  goToStoreButton: {
    borderRadius: 8,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  chevron: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  countdownContainer: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 12,
  },
  countdownText: {
    fontSize: 14,
    color: '#4A90E2',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default TrialScreen;