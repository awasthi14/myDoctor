import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function DashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Register Patient" onPress={() => navigation.navigate('Register Patient')} />
      <Button title="Doctor Scheduling" onPress={() => navigation.navigate('Doctor Schedule')} />
      <Button title="Book Appointment" onPress={() => navigation.navigate('Book Appointment')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 30,
  },
});
