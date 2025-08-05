import { useState } from 'react';

interface Appointment {
  id: number;
  date: Date;
  time: string;
  store: string;
  orderNumber: string;
  address: string;
  borderColor: string;
}

export const useHomeScreen = () => {
  const now = new Date();
  const [selectedDate, setSelectedDate] = useState(now);
  const [weekStartDate, setWeekStartDate] = useState(new Date(now));

  const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    return new Date(d.setDate(d.getDate() - day));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateToCheck = new Date(date);
    dateToCheck.setHours(0, 0, 0, 0);
    return dateToCheck < today;
  };

  const generateWeekData = () => {
    const weekStart = getWeekStart(weekStartDate);
    const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const weekDates = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      weekDates.push(date);
    }

    return { weekDays, weekDates };
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(weekStartDate);
    newDate.setDate(weekStartDate.getDate() - 7);
    setWeekStartDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(weekStartDate);
    newDate.setDate(weekStartDate.getDate() + 7);
    setWeekStartDate(newDate);
  };

  const goToToday = () => {
    const today = new Date();
    setSelectedDate(today);
    setWeekStartDate(today);
  };

  const allAppointments: Appointment[] = [
    {
      id: 1,
      date: new Date(),
      time: '12:00 PM',
      store: 'Nike Store',
      orderNumber: '#2345',
      address: '10W3 Mani Casadona, Street Number 372, Action Area I, IIF, Newtown, West Bengal',
      borderColor: '#007AFF',
    },
    {
      id: 2,
      date: new Date(),
      time: '09:45 AM',
      store: 'Adidas Store',
      orderNumber: '#2346',
      address: '15A Park Street, Kolkata, West Bengal',
      borderColor: '#FFD700',
    },
    {
      id: 3,
      date: new Date(),
      time: '2:15 PM',
      store: 'Puma Store',
      orderNumber: '#2347',
      address: '22B Central Avenue, Salt Lake, Kolkata',
      borderColor: '#FF3B30',
    },
    {
      id: 4,
      date: new Date(),
      time: '5:30 PM',
      store: 'Reebok Store',
      orderNumber: '#2348',
      address: '8C Gariahat Road, Kolkata, West Bengal',
      borderColor: '#34C759',
    },
    {
      id: 5,
      date: new Date(),
      time: '8:25 PM',
      store: 'New Balance Store',
      orderNumber: '#2349',
      address: '12D Forum Mall, Elgin Road, Kolkata',
      borderColor: '#AF52DE',
    },
  ];

  const getAppointmentsForDate = (date: Date) => {
    return allAppointments.filter(
      (appointment) => appointment.date.toDateString() === date.toDateString()
    );
  };

  // Generate all time slots for the day with 30-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      // Add hour:00
      const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const ampm = hour < 12 ? 'AM' : 'PM';
      slots.push(`${hour12}:00 ${ampm}`);
      
      // Add hour:30
      slots.push(`${hour12}:30 ${ampm}`);
    }
    return slots;
  };

  // Function to convert time string to minutes for positioning
  const timeToMinutes = (timeStr: string) => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let totalHours = hours;
    
    if (period === 'PM' && hours !== 12) totalHours += 12;
    if (period === 'AM' && hours === 12) totalHours = 0;
    
    return totalHours * 60 + minutes;
  };

  // Function to get appointments positioned between time slots
  const getAppointmentPosition = (appointmentTime: string, slotIndex: number) => {
    const appointmentMinutes = timeToMinutes(appointmentTime);
    const slotMinutes = Math.floor(slotIndex / 2) * 60 + (slotIndex % 2) * 30;
    
    // If appointment is within 30 minutes of this slot, calculate relative position
    const timeDiff = appointmentMinutes - slotMinutes;
    if (timeDiff >= 0 && timeDiff < 30) {
      return (timeDiff / 30) * 40; // 40 is the height between slots
    }
    return null;
  };

  const { weekDays, weekDates } = generateWeekData();
  const selectedDateAppointments = getAppointmentsForDate(selectedDate);
  const timeSlots = generateTimeSlots();

  return {
    // States
    selectedDate,
    setSelectedDate,
    weekStartDate,
    setWeekStartDate,
    
    // Data
    weekDays,
    weekDates,
    allAppointments,
    selectedDateAppointments,
    timeSlots,
    
    // Functions
    formatDate,
    isToday,
    isPastDate,
    goToPreviousWeek,
    goToNextWeek,
    goToToday,
    getAppointmentsForDate,
    timeToMinutes,
    getAppointmentPosition,
  };
};
