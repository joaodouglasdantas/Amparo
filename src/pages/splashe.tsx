import React, { useEffect } from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack'; // Importe para tipagem

import SplashLogo from '../../assets/LogoAmparo.png'


type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
};

type SplashScreenProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // aqui a gente faria a lógica de verificação de autenticação:

      navigation.replace('Login'); 
    }, 3000); // exemplo: 3 segundos

    return () => clearTimeout(timer); // limpa o timer se o componente for desmontado
  }, []); // o array vazio garante que o useEffect rode apenas uma vez ao montar

  return (
    <View style={styles.container}>
      <Image source={SplashLogo} style={styles.logo} resizeMode="contain" />
      <ActivityIndicator size="large" color="#FFF" style={styles.indicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#3F7EE4',
    flex: 1,
    justifyContent: 'center', // cor de fundo do splashe
  },
  indicator: {
    marginTop: 20,
  },
  logo: {
    height: 80,
    marginBottom: 20,
    width: 200,
  },
});

export default Splash;