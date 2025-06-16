import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import styles from './styles'; 

export default function CadastroScreen() {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');

  const handleKeyPress = (num: string) => {
    if (pin.length < 4) setPin(pin + num);
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  const handleConfirm = () => {
    if (!username.trim()) {
      Alert.alert('Erro', 'Digite o nome de usuário.');
      return;
    }
    if (pin.length < 4) {
      Alert.alert('Erro', 'O PIN deve ter 4 dígitos.');
      return;
    }
    Alert.alert('Sucesso', `Usuário: ${username}\nPIN: ${pin}`);
  };

  const keypadLayout = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', 'backspace'], 
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
       
        <View style={styles.container}>
          <Image
            source={require('../../assets/LogoAmparo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Cadastre-se agora!</Text>

          <Text style={styles.label}>Nome de Usuário</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome de usuário"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Crie seu PIN</Text>
          <TextInput
            style={styles.pinInput}
            value={pin}
            secureTextEntry
            editable={false} 
            maxLength={4}
            textAlign="center"
          />

          
          <View style={styles.keypad}>
            {keypadLayout.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.keypadRow}>
                {row.map((item) => {
                  if (item === 'backspace') {
                    return (
                      <TouchableOpacity
                        key={item}
                        style={styles.keypadButton}
                        onPress={handleBackspace}
                      >
                        <Ionicons name="backspace-outline" size={32} color="#FFFFFF" />
                      </TouchableOpacity>
                    );
                  }
                  
                  return (
                    <TouchableOpacity
                      key={item}
                      style={[
                        styles.keypadButton,
                        item === '' && { backgroundColor: 'transparent' },
                      ]}
                      onPress={() => item !== '' && handleKeyPress(item)}
                      disabled={item === ''}
                    >
                      <Text style={styles.keypadButtonText}>{item}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmButtonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}