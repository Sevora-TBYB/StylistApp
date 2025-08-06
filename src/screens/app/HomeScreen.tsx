// HomeScreen.tsx

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import NotificationIcon from '../../assets/images/svg/NotificationIcon';
import PlusIcon from '../../assets/images/svg/PlusIcon';
import { useHomeScreen } from '../../hooks/useHomeScreen';
import { homeScreenStyles as styles } from '../../styles/homeScreenStyles';
import { AppTabParamList } from '../../navigation/AppNavigator';

type NavigationProp = BottomTabNavigationProp<AppTabParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const {
    selectedDate,
    setSelectedDate,
    weekDays,
    weekDates,
    selectedDateAppointments,
    timeSlots,
    formatDate,
    goToToday,
    getAppointmentsForDate,
    timeToMinutes,
    getAppointmentPosition,
  } = useHomeScreen();

  // Color palette for appointment cards with matching border and background colors
  const appointmentColorPalette = [
    {
      borderColor: "#4EB5E1",
      backgroundColor: "#EEF6FF"
    },
    {
      borderColor: "#D8A800",
      backgroundColor: "#FFFBEB"
    },
    {
      borderColor: "#F54C64",
      backgroundColor: "#FEECEF"
    },
    {
      borderColor: "#10B981",
      backgroundColor: "#ECFDF5"
    },
    {
      borderColor: "#8B5CF6",
      backgroundColor: "#F5F3FF"
    },
    {
      borderColor: "#F59E0B",
      backgroundColor: "#FEF3C7"
    },
    {
      borderColor: "#EF4444",
      backgroundColor: "#FEF2F2"
    },
    {
      borderColor: "#06B6D4",
      backgroundColor: "#ECFEFF"
    },
    {
      borderColor: "#84CC16",
      backgroundColor: "#F7FEE7"
    },
    {
      borderColor: "#F97316",
      backgroundColor: "#FFF7ED"
    },
    {
      borderColor: "#EC4899",
      backgroundColor: "#FDF2F8"
    },
    {
      borderColor: "#6366F1",
      backgroundColor: "#EEF2FF"
    }
  ];

  // Function to get color scheme for a time slot
  const getTimeSlotColors = (index: number) => {
    return appointmentColorPalette[index % appointmentColorPalette.length];
  };

  const handleAppointmentPress = (appointment: any) => {
    navigation.navigate('Trial', { 
      appointmentData: appointment 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      {/* Header */}
      <View style={[styles.header, { backgroundColor: "#000" }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View>
            <Image
              source={{ uri: 'https://i.ibb.co/tMKpYfZj/Avatar-wrap.jpg' }} // Placeholder image
              style={styles.avatar}
            />
          </View>
          <View>
            <Text style={styles.userName}>Akash Sharma</Text>
            <Text style={[styles.userRole, {color:"#DBDBDB"}]}>General Shift</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={styles.leaveButton}>
            <LinearGradient
              colors={['#B2B2B2', '#FFFFFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.leaveButtonGradient}
            >
              <PlusIcon size={14} color="#000" />
              <Text style={styles.leaveButtonText}>LEAVE</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={goToToday}
            style={styles.notificationButton}
          >
            <LinearGradient
              colors={['#666666', '#292929']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.notificationButtonGradient}
            >
              <NotificationIcon />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Week Calendar */}
      <View style={[styles.weekSection]}>
        {/* Day Labels Row */}
        <View style={[styles.dayLabelsRow, {backgroundColor:"#000"}]}>
          {weekDays.map((day, i) => (
            <Text key={i} style={[styles.dayLabel,{color:"#fff"}]}>
              {day}
            </Text>
          ))}
        </View>

        {/* Date Numbers Row */}
        <View style={styles.weekRow}>
          {weekDays.map((day, i) => {
            const date = weekDates[i];
            const isSelected =
              date.toDateString() === selectedDate.toDateString();
            const hasAppointments = getAppointmentsForDate(date).length > 0;

            return (
              <TouchableOpacity
                key={i}
                onPress={() => setSelectedDate(date)}
                style={[
                  styles.dateCircle,
                  !isSelected && styles.unselectedDateCircle,
                ]}
              >
                {isSelected ? (
                  <LinearGradient
                    colors={['#121212', '#666666']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.selectedDateGradient}
                  >
                    <Text style={styles.selectedDateText}>
                      {date.getDate()}
                    </Text>
                  </LinearGradient>
                ) : (
                  <Text style={styles.dateText}>
                    {date.getDate()}
                  </Text>
                )}
                {hasAppointments && <View style={styles.dot} />}
              </TouchableOpacity>
            );
          })}
        </View>
        <Text style={styles.selectedDateLabel}>All Day</Text>
      </View>

      {/* Schedule */}
      <ScrollView contentContainerStyle={styles.scheduleContainer}>
        {/* <Text style={styles.allDayLabel}>All Day</Text> */}

        {timeSlots.map((time, index) => (
          <View key={time} style={styles.timeSlot}>
            <View style={styles.timeSlotHeader}>
              <Text style={styles.timeLabel}>{time}</Text>
            </View>
            <View style={styles.timeSlotContent}>
              {/* Time separator line in appointment area */}
              <View style={styles.appointmentAreaTimeLine} />
              
              {/* Render appointments that match exactly this time */}
              {selectedDateAppointments
                .filter(a => a.time === time)
                .map(a => {
                  const timeSlotColors = getTimeSlotColors(index);
                  return (
                    <TouchableOpacity
                      key={a.id}
                      style={[
                        styles.appointmentCard,
                        styles.betweenAppointment,
                        { 
                          backgroundColor: timeSlotColors.backgroundColor, 
                          borderColor: timeSlotColors.borderColor,
                          top: 10,
                        },
                      ]}
                      onPress={() => handleAppointmentPress(a)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.appointmentTopRow}>
                        <Text
                          style={[styles.storeName, { color: timeSlotColors.borderColor }]}
                        >
                          {a.store}
                        </Text>
                        <Text style={[styles.orderNumber,{ color: timeSlotColors.borderColor }]}>
                          Order ID: {a.orderNumber}
                        </Text>
                      </View>
                      <Text style={[styles.address,{ color: timeSlotColors.borderColor }]} numberOfLines={3}>
                        {a.address}
                      </Text>
                    </TouchableOpacity>
                  );
                })}

              {/* Render appointments that fall between this and next time slot */}
              {selectedDateAppointments
                .filter(a => {
                  const appointmentMinutes = timeToMinutes(a.time);
                  const currentSlotMinutes =
                    Math.floor(index / 2) * 60 + (index % 2) * 30;
                  const nextSlotMinutes = currentSlotMinutes + 30;

                  return (
                    appointmentMinutes > currentSlotMinutes &&
                    appointmentMinutes < nextSlotMinutes &&
                    a.time !== time
                  ); // Don't duplicate exact matches
                })
                .map(a => {
                  const position = getAppointmentPosition(a.time, index);
                  const timeSlotColors = getTimeSlotColors(index);
                  return (
                    <TouchableOpacity
                      key={`${a.id}-between`}
                      style={[
                        styles.appointmentCard,
                        styles.betweenAppointment,
                        {
                          backgroundColor: timeSlotColors.backgroundColor,
                          top: position || 0,
                          borderColor: timeSlotColors.borderColor
                        },
                      ]}
                      onPress={() => handleAppointmentPress(a)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.appointmentTopRow}>
                        <Text
                          style={[styles.storeName, { color: timeSlotColors.borderColor }]}
                        >
                          {a.store}
                        </Text>
                        <Text style={[styles.orderNumber,{ color: timeSlotColors.borderColor }]}>
                          Order ID: {a.orderNumber}
                        </Text>
                      </View>
                      {/* <Text style={styles.timeIndicator}>{a.time}</Text> */}
                      <Text style={[styles.address,{ color: timeSlotColors.borderColor }]} numberOfLines={2}>
                        {a.address}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
