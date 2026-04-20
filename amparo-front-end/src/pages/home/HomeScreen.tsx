import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack'; 
import { format, isBefore, isAfter, isSameDay, parse, parseISO, startOfToday } from 'date-fns'; 
import api from '../../services/api'; 
import { useFocusEffect } from '@react-navigation/native'
import styles from './styles';
import { RootStackParamList } from '../../../App'; 

import Header from '../../components/Header';
import CalendarComponent from '../../components/CalendarComponent';
//import ReminderCard from '../../components/ReminderCard';
import BottomNavigationBar from '../../components/BottomNavigationBar';
import LogoAmparo from '../../assets/LogoAmparoPreto.png'
import MedicationGroupCard from '../../components/MedicacaoGroupCard'


type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export interface MedicamentoType {
  id: number;
  nome: string;
  dosagem_formatada: string;
  observacao: string;
  is_active: boolean;
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
    
    
    const agendamentosValidos = agendamentos.filter(ag => {
      
      if (!ag.data_fim ) {
        return true;
      }

      return !isBefore(parseISO(ag.data_fim), hoje);
    });

    if (agendamentosValidos.length === 0) return [];

    
    const grupos = agendamentosValidos.reduce((acc, agendamento) => {
      const medId = agendamento.medicamento.id;
      if (!acc[medId]) {
        acc[medId] = {
          ...agendamento.medicamento,
          horarios: [],
          data_fim: agendamento.data_fim,
        };
      }
      acc[medId].horarios.push(agendamento.horario);
      return acc;
    }, {} as { [key: number]: MedicamentoType & { horarios: string[], data_fim: string | null } });

    return Object.values(grupos).map(grupo => {
        const horariosOrdenados = grupo.horarios.sort();
        
        let proximoHorario: string | null = null;
        
        if (isSameDay(dataSelecionadaObj, hoje)) {
            proximoHorario = horariosOrdenados.find(h => 
                isAfter(parse(h, 'HH:mm:ss', new Date()), agora)
            ) || null;
        } else if(isAfter(dataSelecionadaObj, hoje)) {
            proximoHorario = horariosOrdenados[0];
        }

        const outrosHorarios = horariosOrdenados.filter(h => h !== proximoHorario);

        const estaraFinalizado = grupo.data_fim ? isAfter(dataSelecionadaObj, parseISO(grupo.data_fim)) : false;

        return {
            ...grupo,
            proximoHorario: estaraFinalizado ? null : (proximoHorario ? format(parse(proximoHorario, 'HH:mm:ss', new Date()), 'HH:mm') : null),
            outrosHorarios: estaraFinalizado ? [] : outrosHorarios.map(h => format(parse(h, 'HH:mm:ss', new Date()), 'HH:mm')),
            estaraFinalizado, 
            dataFim: grupo.data_fim,
        };
    }).sort((a,b) => (a.proximoHorario || '23:59').localeCompare(b.proximoHorario || '23:59'));

  }, [agendamentos, selectedDate]);

  useEffect(() => {
    const newMarkedDates: { [key: string]: any } = {};
    
    agendamentos.forEach(ag => {
        
    });

    
    newMarkedDates[selectedDate] = { selected: true, selectedColor: '#3F7EE4' };
    setMarkedDates(newMarkedDates);
  }, [selectedDate, agendamentos]);

  const renderContent = () => {
    if (loading) return <ActivityIndicator size="large" color="#3F7EE4" style={{ marginTop: 50 }} />;
    if (error) return <Text style={styles.errorText}>{error}</Text>;
    if (lembretesAgrupados.length === 0) {
        return <Text style={styles.emptyText}>Nenhum lembrete para este dia.</Text>
    }
    
    
    return lembretesAgrupados.map((grupo) => (
      <MedicationGroupCard
        key={grupo.id} 
        nomeMedicamento={grupo.nome}
        dosagem={grupo.dosagem_formatada}
        proximoHorario={grupo.proximoHorario}
        outrosHorarios={grupo.outrosHorarios}
        estaraFinalizado={grupo.estaraFinalizado}
        dataFim={grupo.dataFim}
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