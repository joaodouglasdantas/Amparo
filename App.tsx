import 'react-native-gesture-handler'; 

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';

import Splash from './src/pages/splashe'; 
import LoginScreen from './src/pages/login/LoginScreen'; 
import HomeScreen from './src/pages/home/HomeScreen'; 
import CadastroMedicamentos from './src/pages/cadastrar-medicamentos/Cadastro';  
import CadastroUsuario from './src/pages/cadastro-usuarios/CadastroScreen';    
import ConfiguracaoScreen from './src/pages/configuracao/ConfiguracaoScreen';

export type RootStackParamList = {
  Splash: undefined; 
  Login: undefined;  
  Home: undefined;  
  CadastroMedicamento: undefined;
  CadastroUsuario: undefined;
  Configuracao: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { userToken, isLoading } = useAuth(); 

  if (isLoading) {
    return <Splash />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userToken == null ? (
        
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Configuracao" component={ConfiguracaoScreen} />
          <Stack.Screen name="CadastroMedicamento" component={CadastroMedicamentos} />
          <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} />
          <Stack.Screen name="Splash" component={Splash} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
