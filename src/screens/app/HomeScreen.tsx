import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

const HomeScreen: React.FC = () => {
  // Get current date and time
  const now = new Date();
  const currentTime = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  
  // Calendar week data (sample data for the week)
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const weekDates = [22, 23, 24, 25, 26, 27, 28];
  const selectedDate = 24; // Current/selected date
  
  // Sample appointment data
  const appointments = [
    {
      id: 1,
      time: '2:00 PM',
      store: 'Nike Store',
      orderNumber: '#2345',
      address: '10WA Mani Casadona, Street Number 372, Action Area I, IIF, Newtown, West Bengal',
      borderColor: '#007AFF',
    },
    {
      id: 2,
      time: '3:00 PM',
      store: 'Adidas Store',
      orderNumber: '#2346',
      address: '15WB Fashion Street, Block A, New Market Area, Kolkata, West Bengal',
      borderColor: '#FFD700',
    },
    {
      id: 3,
      time: '4:00 PM',
      store: 'Puma Store',
      orderNumber: '#2347',
      address: '20XC Shopping Complex, Floor 2, Park Street, Kolkata, West Bengal',
      borderColor: '#FF69B4',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userRole}>Senior Stylist</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.currentTime}>{currentTime}</Text>
          <TouchableOpacity style={styles.leaveButton}>
            <Text style={styles.leaveButtonText}>LEAVE</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Calendar Week View */}
      <View style={styles.calendarSection}>
        <View style={styles.weekContainer}>
          {weekDays.map((day, index) => (
            <View key={index} style={styles.dayColumn}>
              <Text style={styles.dayLabel}>{day}</Text>
              <TouchableOpacity
                style={[
                  styles.dateButton,
                  weekDates[index] === selectedDate && styles.selectedDateButton,
                ]}>
                <Text
                  style={[
                    styles.dateText,
                    weekDates[index] === selectedDate && styles.selectedDateText,
                  ]}>
                  {weekDates[index]}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      
      {/* Schedule/Timeline View */}
      <ScrollView style={styles.scheduleContainer} showsVerticalScrollIndicator={false}>
        {/* All Day Section */}
        <View style={styles.allDaySection}>
          <Text style={styles.allDayLabel}>All Day</Text>
          <View style={styles.allDayContent}>
            {/* Empty for now - can add all-day events here */}
          </View>
        </View>
        
        {/* Hourly Time Slots */}
        <View style={styles.timelineContainer}>
          {['12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM'].map((time, index) => (
            <View key={time} style={styles.timeSlot}>
              <Text style={styles.timeLabel}>{time}</Text>
              <View style={styles.timeSlotContent}>
                {/* Render appointments for this time slot */}
                {appointments
                  .filter(appointment => appointment.time.includes(time.split(' ')[0]))
                  .map(appointment => (
                    <TouchableOpacity
                      key={appointment.id}
                      style={[
                        styles.appointmentCard,
                        { borderLeftColor: appointment.borderColor },
                      ]}>
                      <Text style={styles.storeName}>{appointment.store}</Text>
                      <Text style={styles.orderNumber}>{appointment.orderNumber}</Text>
                      <Text style={styles.address} numberOfLines={3}>
                        {appointment.address}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerLeft: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  userRole: {
    fontSize: 14,
    color: '#666',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  currentTime: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  leaveButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  leaveButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  calendarSection: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  dayColumn: {
    alignItems: 'center',
  },
  dayLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  dateButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDateButton: {
    backgroundColor: '#333',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  selectedDateText: {
    color: '#fff',
  },
  scheduleContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  allDaySection: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  allDayLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  allDayContent: {
    minHeight: 40,
  },
  timelineContainer: {
    paddingBottom: 20,
  },
  timeSlot: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  timeLabel: {
    width: 70,
    fontSize: 14,
    color: '#666',
    paddingTop: 5,
  },
  timeSlotContent: {
    flex: 1,
    marginLeft: 15,
  },
  appointmentCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  orderNumber: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 8,
  },
  address: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
});

export default HomeScreen;
