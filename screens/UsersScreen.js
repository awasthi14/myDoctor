import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UsersScreen({ navigation }) {
  const [userData, setUserData] = useState(null);

  const fetchProtectedData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const response = await fetch('http://192.168.1.106:3000/api/user/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log(data.data);
      setUserData(data.data); // Store user data in state
    } catch (error) {
      console.error('Error fetching protected data:', error);
    }
  };

  useEffect(() => {
    fetchProtectedData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {userData ? (
        <View style={styles.userBox}>
          <Text style={styles.title}>User Info:</Text>
          <Text>Name: {userData.name}</Text>
          <Text>Email: {userData.email}</Text>
          <Text>Role: {userData.role}</Text>
        </View>
      ) : (
        <Text>Loading user data...</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
    padding: 30,
  },
  userBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
