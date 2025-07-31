import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import UsersScreen from '../screens/UsersScreen';
import PatientRegistrationScreen from '../screens/PatientRegistrationScreen';
import DoctorSchedulingScreen from '../screens/DoctorSchedulingScreen';
import AppointmentBookingScreen from '../screens/AppointmentBookingScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
    <Stack.Screen name="Users" component={UsersScreen} />
    <Stack.Screen name="Register Patient" component={PatientRegistrationScreen} />
    <Stack.Screen name="Doctor Schedule" component={DoctorSchedulingScreen} />
    <Stack.Screen name="Book Appointment" component={AppointmentBookingScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
