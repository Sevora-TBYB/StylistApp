import { StyleSheet } from 'react-native';

export const homeScreenStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#000',
  },
  userName: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: '#fff' 
  },
  userRole: { 
    fontSize: 14, 
    color: '#666' 
  },
  leaveButton: {
    borderRadius: 16,
    overflow: 'hidden', // Important for gradient border radius
  },
  leaveButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 14,
    gap: 6,
  },
  leaveButtonText: {
    color: '#000',
    fontWeight: '500',
    fontSize: 13,
  },
  notificationButton: {
    marginLeft: 16,
    borderRadius: 20,
    overflow: 'hidden', // Important for gradient border radius
  },
  notificationButtonGradient: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekSection: {
    // paddingVertical: 12,
    paddingBottom: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
  dayLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 8,
    paddingTop: 4,
  },
  dayLabel: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
    width: 38,
    textAlign: 'center',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 4,
    // borderWidth: 1,
    marginBottom: 8,
    backgroundColor: '#fff',
    elevation:5,
    // backgroundColor:"#000"
  },
  dateCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden', // Important for gradient border radius
  },
  unselectedDateCircle: {
    backgroundColor: 'transparent',
  },
  selectedDateCircle: {
    backgroundColor: '#000',
  },
  selectedDateGradient: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: { 
    fontSize: 15, 
    color: '#737378' 
  },
  selectedDateText: { 
    color: '#fff' 
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#007AFF',
    position: 'absolute',
    bottom: 4,
  },
  selectedDateLabel: {
    textAlign: 'left',
    fontSize: 13,
    color: '#737378',
    paddingLeft: 14,
  },
  scheduleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  allDayLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  timeSlot: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
    minHeight: 40,
    position: 'relative',
  },
  timeLabel: {
    width: 70,
    fontSize: 13,
    color: '#555',
    paddingTop: 6,
  },
  timeSlotContent: {
    flex: 1,
    position: 'relative',
    minHeight: 40,
    backgroundColor:"#F4F5F6",
  },
  appointmentCard: {
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  betweenAppointment: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  timeIndicator: {
    fontSize: 11,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 4,
  },
  appointmentTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  storeName: {
    fontSize: 15,
    fontWeight: '600',
  },
  orderNumber: {
    fontSize: 13,
    color: '#555',
  },
  address: {
    fontSize: 12,
    color: '#444',
    lineHeight: 18,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
  },
});
