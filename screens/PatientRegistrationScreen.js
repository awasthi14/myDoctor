import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

export default function PatientRegistrationScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [contact, setContact] = useState('');

  const handleRegister = () => {
    if (name && age && contact) {
      alert(`Patient ${name} registered!`);
    } else {
      alert('Please fill all fields.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Patient Registration</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Contact" value={contact} onChangeText={setContact} keyboardType="phone-pad" style={styles.input} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 20, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 },
});
