import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack'; 
import { format, getDay, isAfter, isSameDay, parse, parseISO, startOfToday } from 'date-fns'; 
import api from '../../services/api'; 
import { useFocusEffect } from '@react-navigation/native'
import styles from './styles';

import Header from '../../components/Header';
import CalendarComponent from '../../components/CalendarComponent';
import ReminderCard from '../../components/ReminderCard';
import BottomNavigationBar from '../../components/BottomNavigationBar';
import LogoAmparo from '../../assets/LogoAmparoPreto.png'
import MedicationGroupCard from '../../components/MedicacaoGroupCard'

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
  dosagem_formatada: string;
  observacao: string;
}

export interface AgendamentoType {
  id: number;
  horario: string; 
  frequencia: 'Diário' | 'Semanal';
  medicamento: MedicamentoType;
  data_fim: string | null;
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

  const lembretesAgrupados = useMemo(() => {
    const agora = new Date();
    const hoje = startOfToday();
    const dataSelecionadaObj = parseISO(selectedDate);
    
    // Filtra agendamentos que são válidos para a data selecionada
    const agendamentosDoDia = agendamentos.filter(ag => {
      // Se tiver data de fim, verifica se ainda está ativo
      if (ag.data_fim && isAfter(hoje, parseISO(ag.data_fim))) {
        return false;
      }
      // Aqui você pode adicionar sua lógica para frequência semanal
      return true; // Simplificado para mostrar todos os diários
    });

    if (agendamentosDoDia.length === 0) return [];

    // Agrupa os agendamentos por ID do medicamento
    const grupos = agendamentosDoDia.reduce((acc, agendamento) => {
      const medId = agendamento.medicamento.id;
      if (!acc[medId]) {
        acc[medId] = {
          ...agendamento.medicamento,
          horarios: [],
        };
      }
      acc[medId].horarios.push(agendamento.horario);
      return acc;
    }, {} as { [key: number]: MedicamentoType & { horarios: string[] } });

    return Object.values(grupos).map(grupo => {
        const horariosOrdenados = grupo.horarios.sort();
        
        let proximoHorario: string | null = null;
        // Apenas procura o próximo horário se a data selecionada for hoje
        if (isSameDay(dataSelecionadaObj, hoje)) {
             proximoHorario = horariosOrdenados.find(h => 
                isAfter(parse(h, 'HH:mm:ss', new Date()), agora)
            ) || null;
        } else if(isAfter(dataSelecionadaObj, hoje)) {
            // Se for um dia futuro, o próximo horário é o primeiro da lista
            proximoHorario = horariosOrdenados[0];
        }

        const outrosHorarios = horariosOrdenados.filter(h => h !== proximoHorario);

        return {
            ...grupo,
            proximoHorario: proximoHorario ? format(parse(proximoHorario, 'HH:mm:ss', new Date()), 'HH:mm') : null,
            outrosHorarios: outrosHorarios.map(h => format(parse(h, 'HH:mm:ss', new Date()), 'HH:mm')),
        };
    }).sort((a,b) => (a.proximoHorario || '23:59').localeCompare(b.proximoHorario || '23:59'));
  }, [agendamentos, selectedDate]);

  useEffect(() => {
    const newMarkedDates: { [key: string]: any } = {};
    // Adiciona um ponto para cada dia que tem um agendamento
    agendamentos.forEach(ag => {
        // Esta lógica deveria ser mais complexa para marcar os dias corretos no futuro
        // Por enquanto, vamos manter simples
    });

    // Destaca a data atualmente selecionada
    newMarkedDates[selectedDate] = { selected: true, selectedColor: '#3F7EE4' };
    setMarkedDates(newMarkedDates);
  }, [selectedDate, agendamentos]);

  const renderContent = () => {
    if (loading) return <ActivityIndicator size="large" color="#3F7EE4" style={{ marginTop: 50 }} />;
    if (error) return <Text style={styles.errorText}>{error}</Text>;
    if (lembretesAgrupados.length === 0) {
        return <Text style={styles.emptyText}>Nenhum lembrete para este dia.</Text>
    }
    
    // Mapeia os DADOS AGRUPADOS para o nosso novo componente de card
    return lembretesAgrupados.map((grupo) => (
      <MedicationGroupCard
        key={grupo.id} 
        nomeMedicamento={grupo.nome}
        dosagem={grupo.dosagem_formatada}
        proximoHorario={grupo.proximoHorario}
        outrosHorarios={grupo.outrosHorarios}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <Header logoSource={LogoAmparo} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <CalendarComponent
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={markedDates} currentMonth={''}        
        />
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