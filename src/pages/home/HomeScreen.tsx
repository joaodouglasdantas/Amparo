import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack'; 
import { format, getDay, parse } from 'date-fns'; 
import api from '../../services/api'; 
import { useFocusEffect } from '@react-navigation/native'
import styles from './styles';

import Header from '../../components/Header';
import CalendarComponent from '../../components/CalendarComponent';
import ReminderCard from '../../components/ReminderCard';
import BottomNavigationBar from '../../components/BottomNavigationBar';
import LogoAmparo from '../../assets/LogoAmparoPreto.png'

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  CadastroMedicamento: undefined;
  Configuracao: undefined;
};
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export interface MedicamentoType {
  id: number;
  nome: string;
  dosagem: string;
  observacao: string;
}

export interface AgendamentoType {
  id: number;
  horario: string; 
  frequencia: 'Diário' | 'Semanal';
  medicamento: MedicamentoType;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), 'yyyy-MM-dd')
  );
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});

  const [agendamentos, setAgendamentos] = useState<AgendamentoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'calendar' | 'search' | 'add' | 'timer' | 'settings'>('calendar');

  useEffect(() => {
   
    setMarkedDates({
      [selectedDate]: { selected: true, marked: true, selectedColor: '#3F7EE4' },
     
    });
  }, [selectedDate]); 

  const fetchAgendamentos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/api/agendamentos/');
      setAgendamentos(response.data);
    } catch (err) {
      console.error("Erro ao buscar agendamentos:", err);
      setError("Não foi possível carregar seus lembretes.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchAgendamentos();
    }, [])
  );

  useEffect(() => {
    const newMarkedDates: { [key: string]: any } = {};
    agendamentos.forEach(ag => {
        const todayStr = format(new Date(), 'yyyy-MM-dd');
        newMarkedDates[todayStr] = { ...newMarkedDates[todayStr], marked: true, dotColor: '#5095D4' };
    });

    newMarkedDates[selectedDate] = { ...newMarkedDates[selectedDate], selected: true, selectedColor: '#3F7EE4' };
    
    setMarkedDates(newMarkedDates);
  }, [selectedDate, agendamentos]);

  const lembretesDoDia = useMemo(() => {
    const diaDaSemanaSelecionado = getDay(new Date(`${selectedDate}T12:00:00`)); 

    return agendamentos.filter(ag => {
      if (ag.frequencia === 'Diário') {
        return true;
      }
      if (ag.frequencia === 'Semanal') {
  
        return diaDaSemanaSelecionado === 0; 
      }
      return false;
    }).sort((a, b) => a.horario.localeCompare(b.horario)); 
  }, [selectedDate, agendamentos]);

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#3F7EE4" style={{ marginTop: 50 }} />;
    }
    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }
    if (lembretesDoDia.length === 0) {
        return <Text style={styles.emptyText}>Nenhum lembrete para este dia.</Text>
    }
    
    return lembretesDoDia.map((ag) => (
      <ReminderCard
        key={ag.id} 
        time={format(parse(ag.horario, 'HH:mm:ss', new Date()), 'HH:mm')} 
        medication={ag.medicamento.nome}
        dose={ag.medicamento.dosagem}
        frequency={ag.frequencia}
        notes={ag.medicamento.observacao}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <Header logoSource={LogoAmparo} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <CalendarComponent
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={markedDates} currentMonth={''}        />
        <Text style={styles.remindersTitle}>Lembretes para {format(new Date(`${selectedDate}T12:00:00`), 'dd/MM/yyyy')}</Text>
        {renderContent()}
      </ScrollView>
      <BottomNavigationBar
        activeTab={activeTab} 
      />
    </View>
  );
};

export default HomeScreen;