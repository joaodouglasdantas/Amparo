// src/pages/settings/SettingsScreen.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext'; 

import Header from '../../components/Header';
import BottomNavigationBar from '../../components/BottomNavigationBar';
import SettingsRow from '../../components/SettingsRow';
import LogoAmparo from '../../assets/LogoAmparoPreto.png';
import styles from './styles'; 


type SettingsState = {
  contrastMode: boolean;
  reminderSound: boolean;
  repeatAlarm: boolean;
};

export default function SettingsScreen({ navigation }: any) { 
  const { signOut } = useAuth(); 
  const [settings, setSettings] = useState<SettingsState>({
    contrastMode: false,
    reminderSound: true,
    repeatAlarm: true,
  });

  // Handler genérico para atualizar qualquer switch
  const handleValueChange = (key: keyof SettingsState, value: boolean) => {
    setSettings(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleLogout = () => {
    Alert.alert(
      "Sair da Conta",
      "Você tem certeza que deseja sair?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sair", style: "destructive", onPress: () => signOut() }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header logoSource={LogoAmparo} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Configurações</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aparência e Acessibilidade</Text>
          <SettingsRow 
            label="Modo de contraste"
            value={settings.contrastMode}
            onValueChange={(value) => handleValueChange('contrastMode', value)}
          />
          <SettingsRow 
            label="Som de Lembrete"
            value={settings.reminderSound}
            onValueChange={(value) => handleValueChange('reminderSound', value)}
          />
          <SettingsRow 
            label="Repetir alarme a cada 5 minutos"
            value={settings.repeatAlarm}
            onValueChange={(value) => handleValueChange('repeatAlarm', value)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Restaurar padrão</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Salvar alterações</Text>
          </TouchableOpacity>
        </View>

        {/* Botão de Logout Adicionado */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sair da Conta</Text>
        </TouchableOpacity>

      </ScrollView>
      <BottomNavigationBar activeTab="settings"/>
    </View>
  );
}
