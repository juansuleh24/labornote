import { StyleSheet } from 'react-native'
import React from 'react'
import { Login, SplashScreen, Attendance, Profile, 
         History, SupervisorHistory, Supervisor, 
         SupervisorProfile, ReportScreen, ChangePassword, 
         SupervisorChangePassword, StudentInfo, SupervisorInfo } from './pages'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}} />
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Attendance" component={Attendance} options={{headerShown: false}} />
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}} />
        <Stack.Screen name="History" component={History} options={{headerShown: false}} />
        <Stack.Screen name="SupervisorHistory" component={SupervisorHistory} options={{headerShown: false}} />
        <Stack.Screen name="Supervisor" component={Supervisor} options={{headerShown: false}} />
        <Stack.Screen name="SupervisorProfile" component={SupervisorProfile} options={{headerShown: false}} />
        <Stack.Screen name="ReportScreen" component={ReportScreen} options={{headerShown: false}} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} options={{headerShown: false}} />
        <Stack.Screen name="SupervisorChangePassword" component={SupervisorChangePassword} options={{headerShown: false}} />
        <Stack.Screen name="StudentInfo" component={StudentInfo} options={{headerShown: false}} />
        <Stack.Screen name="SupervisorInfo" component={SupervisorInfo} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({})