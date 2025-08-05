// HomeScreen.tsx

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import NotificationIcon from '../../assets/images/svg/NotificationIcon';
import PlusIcon from '../../assets/images/svg/PlusIcon';
import { useHomeScreen } from '../../hooks/useHomeScreen';
import { homeScreenStyles as styles } from '../../styles/homeScreenStyles';

const HomeScreen: React.FC = () => {
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
            <Text style={styles.timeLabel}>{time}</Text>
            <View style={styles.timeSlotContent}>
              {/* Render appointments that match exactly this time */}
              {selectedDateAppointments
                .filter(a => a.time === time)
                .map(a => (
                  <View
                    key={a.id}
                    style={[
                      styles.appointmentCard,
                      styles.betweenAppointment,
                      { backgroundColor: `${a.borderColor}1A`, borderColor: a.borderColor },
                    ]}
                  >
                    <View style={styles.appointmentTopRow}>
                      <Text
                        style={[styles.storeName, { color: a.borderColor }]}
                      >
                        {a.store}
                      </Text>
                      <Text style={[styles.orderNumber,{ color: a.borderColor }]}>
                        Order ID: {a.orderNumber}
                      </Text>
                    </View>
                    <Text style={[styles.address,{ color: a.borderColor }]} numberOfLines={3}>
                      {a.address}
                    </Text>
                  </View>
                ))}

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
                  return (
                    <View
                      key={`${a.id}-between`}
                      style={[
                        styles.appointmentCard,
                        styles.betweenAppointment,
                        {
                          backgroundColor: `${a.borderColor}1A`,
                          top: position || 0,
                          borderColor: a.borderColor
                        },
                      ]}
                    >
                      <View style={styles.appointmentTopRow}>
                        <Text
                          style={[styles.storeName, { color: a.borderColor }]}
                        >
                          {a.store}
                        </Text>
                        <Text style={[styles.orderNumber,{ color: a.borderColor }]}>
                          Order ID: {a.orderNumber}
                        </Text>
                      </View>
                      {/* <Text style={styles.timeIndicator}>{a.time}</Text> */}
                      <Text style={[styles.address,{ color: a.borderColor }]} numberOfLines={2}>
                        {a.address}
                      </Text>
                    </View>
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
