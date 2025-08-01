import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AppointmentBookingScreen({ navigation }) {
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [doctors, setDoctorsData] = useState([]);
  const [patients, setPatientsData] = useState([]);

  const fetchDoctors = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://192.168.1.106:3000/api/doctors', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      const doctors = await response.json();
      setDoctorsData(doctors.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://192.168.1.106:3000/api/patients', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      const patients = await response.json();
      setPatientsData(patients.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchPatients();
  }, []);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD
      setAppointmentDate(formattedDate);
    }
  };

  const handleBooking = async () => {
  if (!patientId || !doctorId || !appointmentDate || !appointmentTime) {
    Alert.alert('Validation Error', 'Please fill all fields.');
    return;
  }

  const payload = {
    doctor_id: doctorId,
    patient_id: patientId,
    appointment_date: appointmentDate,
    appointment_time: appointmentTime,
  };

  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch('http://192.168.1.106:3000/api/appointments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      Alert.alert('Success', 'Appointment booked successfully!');
      // Optional: clear form fields
      setAppointmentDate('');
      setAppointmentTime('');
      setPatientId('');
      setDoctorId('');
      navigation.navigate('Dashboard');
    } else {
      const errorData = await response.json();
      console.error('Booking failed:', errorData);
      Alert.alert('Error', errorData.message || 'Failed to book appointment.');
    }
  } catch (error) {
    console.error('Error posting appointment:', error);
    Alert.alert('Error', 'An error occurred while booking the appointment.');
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Book Appointment</Text>

      <Text style={styles.label}>Select Patient</Text>
      <Picker
        selectedValue={patientId}
        onValueChange={(itemValue) => setPatientId(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Select Patient" value="" />
        {patients?.map(patient => (
          <Picker.Item key={patient.id} label={patient.name} value={patient.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Select Doctor</Text>
      <Picker
        selectedValue={doctorId}
        onValueChange={(itemValue) => setDoctorId(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Select Doctor" value="" />
        {doctors?.map(doctor => (
          <Picker.Item key={doctor.id} label={doctor.name} value={doctor.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Appointment Date</Text>
      <TextInput
        placeholder="YYYY-MM-DD"
        value={appointmentDate}
        onFocus={() => setShowDatePicker(true)}
        style={styles.input}
      />
      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Appointment Time</Text>
      <TextInput
        placeholder="e.g. 10:30 AM or 15:00"
        value={appointmentTime}
        onChangeText={setAppointmentTime}
        style={styles.input}
      />

      <Button title="Book Appointment" onPress={handleBooking} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'space-evenly',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
});
