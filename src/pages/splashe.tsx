import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack'; // Importe para tipagem


const SplashLogo = require('../../assets/LogoAmparo.png'); // Ajuste o caminho conforme necessário


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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3F7EE4', // cor de fundo do splashe
  },
  logo: {
    width: 200,
    height: 80,
    marginBottom: 20,
  },
  indicator: {
    marginTop: 20,
  },
  loadingText: {
    color: '#FFF',
    marginTop: 10,
    fontSize: 16,
  },
});

export default Splash;