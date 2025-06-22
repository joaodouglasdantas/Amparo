import React, { useState } from 'react';
import { View, Text, FlatList, Alert, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../services/api';
import TreatmentCard from '../../components/TratamentoCard'; 
import Header from '../../components/Header'; 
import LogoAmparo from '../../assets/LogoAmparoPreto.png';
import BottomNavigationBar from '../../components/BottomNavigationBar';
import styles from './styles'; 


interface Medicamento {
  id: number;
  nome: string;
  dosagem_formatada: string;
  is_active: boolean;
  agendamentos: { data_fim: string | null }[];
}

export default function GerenciamentoScreen({ navigation }: any) {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'calendar' | 'search' | 'add' | 'timer' | 'settings'>('search');

  const fetchData = async () => {
    try {
      const response = await api.get('/api/medicamentos/');
      setMedicamentos(response.data);
    } catch (error) {
      console.error("Erro ao carregar tratamentos:", error);
      Alert.alert("Erro", "Não foi possível carregar seus tratamentos.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const handleEdit = (medicamento: Medicamento) => {
    navigation.navigate('CadastroMedicamento', { isEditing: true, medicamentoData: medicamento });
  };

  const handleDelete = (medicamentoId: number) => {
    Alert.alert(
      "Excluir Tratamento",
      "Isso irá apagar este medicamento e todos os seus lembretes permanentemente. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          style: "destructive", 
          onPress: async () => {
            try {
              await api.delete(`/api/medicamentos/${medicamentoId}/`);
              // Atualiza a UI imediatamente removendo o item da lista
              setMedicamentos(prev => prev.filter(m => m.id !== medicamentoId));
            } catch (error) {
              Alert.alert("Erro", "Não foi possível excluir o tratamento.");
            }
          }
        },
      ]
    );
  };

  if (loading) {
    return (
        <View style={[styles.container, styles.centerContent]}>
            <ActivityIndicator size="large" color="#3F7EE4" />
        </View>
    )
  }

  return (
    <View style={styles.container}>
      <Header logoSource={LogoAmparo}/>
        <Text style={styles.title}>Meus Tratamentos</Text>

        <FlatList
          data={medicamentos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TreatmentCard
              medicamento={item}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item.id)}
            />
          )}
          
          ListEmptyComponent={
            <View style={styles.centerContent}>
              <Text style={styles.emptyText}>Você ainda não cadastrou nenhum tratamento.</Text>
            </View>
          }
          
          onRefresh={fetchData}
          refreshing={loading}
          
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      
      <BottomNavigationBar
        activeTab={activeTab} 
      />
    </View>
  );
}