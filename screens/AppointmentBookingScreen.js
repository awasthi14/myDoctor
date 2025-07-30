import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

export default function AppointmentBookingScreen() {
  const [patientName, setPatientName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  const handleBooking = () => {
    if (patientName && doctorName && appointmentTime) {
      alert(`Appointment booked with Dr. ${doctorName} at ${appointmentTime}`);
    } else {
      alert('Please enter all details.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Book Appointment</Text>
      <TextInput placeholder="Patient Name" value={patientName} onChangeText={setPatientName} style={styles.input} />
      <TextInput placeholder="Doctor Name" value={doctorName} onChangeText={setDoctorName} style={styles.input} />
      <TextInput placeholder="Appointment Time" value={appointmentTime} onChangeText={setAppointmentTime} style={styles.input} />
      <Button title="Book Appointment" onPress={handleBooking} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 20, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 },
});
