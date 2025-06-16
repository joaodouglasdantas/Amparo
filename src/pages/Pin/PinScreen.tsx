import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import logo from '../../assets/LogoAmparo.png';

const PIN_LENGTH = 4;

export default function PinScreen() {
  const [pin, setPin] = useState<string>('');

  const handlePress = (num: string) => {
    if (pin.length < PIN_LENGTH) setPin(pin + num);
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <Text style={styles.subtitle}>Digite seu código de acesso</Text>
      <View style={styles.pinContainer}>
        {[...Array(PIN_LENGTH)].map((_, idx) => (
          <View key={idx} style={styles.pinCircle}>
            {pin.length > idx && <View style={styles.pinDot} />}
          </View>
        ))}
      </View>
      <View style={styles.keypad}>
        {[
          ['1', '2', '3'],
          ['4', '5', '6'],
          ['7', '8', '9'],
          ['erase', '0', 'faceid'],
        ].map((row, rowIndex) => (
          <View key={rowIndex} style={styles.keypadRow}>
            {row.map((item, colIndex) => (
              <TouchableOpacity
                key={colIndex}
                style={styles.key}
                onPress={
                  item === 'erase'
                    ? handleBackspace
                    : item === 'faceid'
                    ? () => {}
                    : () => handlePress(item)
                }
                disabled={item === 'faceid'}
              >
                {item === 'erase' ? (
                  <Text style={styles.eraseText}>Esqueci o{'\n'}Código</Text>
                ) : item === 'faceid' ? (
                  <MaterialCommunityIcons name="face-recognition" size={32} color="#fff" style={styles.faceid} />
                ) : (
                  <Text style={styles.keyText}>{item}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}