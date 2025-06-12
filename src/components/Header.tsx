import React from 'react';
import { View, Image, StyleSheet, SafeAreaView, StatusBar, ImageSourcePropType } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import HeaderLogo from '../assets/LogoAmparoPreto.png'

interface HeaderProps {
  logoSource: any
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Image source={HeaderLogo} style={styles.logo} resizeMode="contain" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    width: '100%',
  },
  logo: {
    height: 40,
    width: 100,
  },
  safeArea: {
    backgroundColor: '#fff',
    paddingTop: getStatusBarHeight(),
  },
});

export default Header;
