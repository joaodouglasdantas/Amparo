import React from 'react';
import { View, Image, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

interface HeaderProps {
  logoSource: any;
}

const Header: React.FC<HeaderProps> = ({ logoSource }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Image source={logoSource} style={styles.logo} resizeMode="contain" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: getStatusBarHeight(),
    backgroundColor: '#fff', // cor de fundo do cabeçalho
  },
  container: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100, 
    height: 40, 
}});

export default Header;