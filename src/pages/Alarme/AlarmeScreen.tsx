import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import api from '../../services/api';
import { format, parseISO } from 'date-fns';

export default function AlarmScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { agendamentoId } = route.params;

  const [agendamento, setAgendamento] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Busca os detalhes do agendamento específico ao abrir a tela
  useEffect(() => {
    const fetchAgendamentoDetails = async () => {
      try {
        const response = await api.get(`/api/agendamentos/${agendamentoId}/`);
        setAgendamento(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do agendamento", error);
        Alert.alert("Erro", "Não foi possível carregar os detalhes do lembrete.");
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };
    fetchAgendamentoDetails();
  }, [agendamentoId]);

  const handleRegister = async (tomou: boolean) => {
    try {
      await api.post('/api/registros/', {
        agendamento: agendamentoId,
        tomou: tomou,
        data_hora_tomada: new Date().toISOString(),
      });
      
      Alert.alert("Registrado!", tomou ? "Bom trabalho!" : "Lembrete pulado.");
      navigation.navigate('Home'); 

    } catch (error) {
      console.error("Erro ao registrar tomada:", error);
      Alert.alert("Erro", "Não foi possível registrar a ação.");
    }
  };

  if (loading || !agendamento) {
    return <View style={styles.container}><ActivityIndicator size="large" /></View>;
  }

  return (
    <View style={styles.container}>
      <FontAwesome5 name="bell" size={80} color="#3F7EE4" style={styles.bellIcon} />
      <Text style={styles.title}>Hora da Medicação!</Text>
      <Text style={styles.time}>{format(parseISO(`1970-01-01T${agendamento.horario}`), 'HH:mm')}</Text>
      <Text style={styles.medication}>{agendamento.medicamento.nome} {agendamento.medicamento.dosagem}</Text>

      <TouchableOpacity style={styles.primaryButton} onPress={() => handleRegister(true)}>
        <Text style={styles.primaryButtonText}>Remédio tomado!</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton} onPress={() => handleRegister(false)}>
        <Text style={styles.secondaryButtonText}>Pular dose.</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  bellIcon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3F7EE4',
  },
  time: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  medication: {
    fontSize: 24,
    color: '#555',
    marginBottom: 60,
  },
  primaryButton: {
    backgroundColor: '#3F7EE4',
    width: '80%',
    padding: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 15,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#E9E9E9',
    width: '80%',
    padding: 20,
    borderRadius: 30,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#555',
    fontSize: 18,
    fontWeight: 'bold',
  },
});