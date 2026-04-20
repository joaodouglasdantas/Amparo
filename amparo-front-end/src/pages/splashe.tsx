import React from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import SplashLogo from '../../assets/LogoAmparo.png';

const Splash = () => {
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
    backgroundColor: '#5C9EDC',
    flex: 1,
    justifyContent: 'center',
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