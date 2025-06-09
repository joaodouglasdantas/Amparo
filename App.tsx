import 'react-native-gesture-handler'; 

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Splash from './src/pages/splashe'; 
import LoginScreen from './src/pages/login/LoginScreen'; 
import HomeScreen from './src/pages/home/HomeScreen';     

export type RootStackParamList = {
  Splash: undefined; 
  Login: undefined;  
  Home: undefined;  
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      {}
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}