import 'react-native-gesture-handler'; // Sempre a primeira linha!

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importe suas telas
import Splash from './src/pages/splashe'; // Sua tela de Splash
import LoginScreen from './src/pages/login/LoginScreen'; // Sua tela de Login
import HomeScreen from './src/pages/home/HomeScreen';     // Sua tela Home

// Defina os tipos para as rotas do seu Stack Navigator.
// Adicione 'Splash' aqui como a primeira rota possível.
export type RootStackParamList = {
  Splash: undefined; // A rota 'Splash' não precisa de parâmetros
  Login: undefined;  // A rota 'Login' não precisa de parâmetros
  Home: undefined;   // A rota 'Home' não precisa de parâmetros
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      {/*
        Defina 'Splash' como a initialRouteName.
        Mantenha screenOptions={{ headerShown: false }} para que nenhum cabeçalho padrão
        apareça no Splash ou nas outras telas se você já tem cabeçalhos customizados.
      */}
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}