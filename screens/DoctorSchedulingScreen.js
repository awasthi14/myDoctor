import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

export default function DoctorSchedulingScreen() {
  const [doctorName, setDoctorName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [availableTime, setAvailableTime] = useState('');

  const handleSchedule = () => {
    if (doctorName && specialty && availableTime) {
      alert(`Doctor ${doctorName} scheduled at ${availableTime}`);
    } else {
      alert('Please complete all fields.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Doctor Scheduling</Text>
      <TextInput placeholder="Doctor Name" value={doctorName} onChangeText={setDoctorName} style={styles.input} />
      <TextInput placeholder="Specialty" value={specialty} onChangeText={setSpecialty} style={styles.input} />
      <TextInput placeholder="Available Time (e.g., 10:00 AM - 1:00 PM)" value={availableTime} onChangeText={setAvailableTime} style={styles.input} />
      <Button title="Schedule" onPress={handleSchedule} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 20, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 },
});
