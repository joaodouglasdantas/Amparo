import React, { useState, useMemo } from 'react';
import { View, Text, SectionList, ActivityIndicator, Modal, Button, Alert, TouchableOpacity, TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { format, parseISO, isToday, isYesterday, set } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import api from '../../services/api';
import Header from '../../components/Header';
import HistoricoRecordCard from '../../components/HistoricoCard';
import LogoAmparo from '../../assets/LogoAmparoPreto.png';
import styles from './styles'; 
import BottomNavigationBar from '../../components/BottomNavigationBar';


type RegistroType = any; 

export default function HistoricoScreen() {
  const [registros, setRegistros] = useState<RegistroType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'calendar' | 'search' | 'add' | 'timer' | 'settings'>('timer');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<RegistroType | null>(null);
  const [editHour, setEditHour] = useState('');
  const [editMinute, setEditMinute] = useState('');

  const fetchHistorico = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/registros/');
      setRegistros(response.data);
    } catch (error) {
      console.error("Erro ao buscar histórico:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(React.useCallback(() => { fetchHistorico(); }, []));

  const formatSectionTitle = (dateString: string) => {
    const date = parseISO(dateString);
    if (isToday(date)) return 'Hoje';
    if (isYesterday(date)) return 'Ontem';
    return format(date, "EEEE, dd 'de' MMMM", { locale: ptBR });
  };
  
  const groupedRecords = useMemo(() => {
    if (registros.length === 0) return [];
    
    
    const groups = registros.reduce((acc, registro) => {
      const dateKey = format(parseISO(registro.data_hora_tomada), 'yyyy-MM-dd');
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(registro);
      return acc;
    }, {} as { [key: string]: RegistroType[] });


    return Object.keys(groups).map(date => ({
      title: formatSectionTitle(date),
      data: groups[date],
    }));
  }, [registros]);

  const handleOpenEditModal = (registro: any) => {
    setSelectedRecord(registro);
    const initialDate = parseISO(registro.data_hora_tomada);
    setEditHour(format(initialDate, 'HH'));
    setEditMinute(format(initialDate, 'mm'));
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedRecord(null);
  };

  const handleUpdateRecord = async (tomou: boolean) => {
    if (!selectedRecord) return;

    // --- LÓGICA DE VALIDAÇÃO E CONSTRUÇÃO DA DATA ---
    const hour = parseInt(editHour, 10);
    const minute = parseInt(editMinute, 10);

    if (isNaN(hour) || isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
      Alert.alert("Erro", "Por favor, insira um horário válido (HH:mm).");
      return;
    }

    // Pega a data original e atualiza apenas a hora e o minuto
    const originalDate = parseISO(selectedRecord.data_hora_tomada);
    const finalDate = set(originalDate, { hours: hour, minutes: minute });

    const payload = {
      tomou: tomou,
      data_hora_tomada: finalDate.toISOString(),
    };

    try {
      setLoading(true);
      const response = await api.patch(`/api/registros/${selectedRecord.id}/`, payload);
      setRegistros(prev => prev.map(r => r.id === selectedRecord.id ? response.data : r));
      handleCloseModal();
      Alert.alert("Sucesso", "Registro atualizado!");
    } catch (error) {
      console.error("Erro ao atualizar registro:", error);
      Alert.alert("Erro", "Não foi possível atualizar o registro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header logoSource={LogoAmparo} />
      <Text style={styles.title}>Histórico de Medicamentos</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#3F7EE4" style={{ flex: 1 }}/>
      ) : (
        <SectionList
          sections={groupedRecords}
          keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
          renderItem={({ item }) => <HistoricoRecordCard registro={item} onPress={() => handleOpenEditModal(item)} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          ListEmptyComponent={
            <View style={styles.centerContent}>
                <Text style={styles.emptyText}>Seu histórico está vazio.</Text>
            </View>
          }
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      {selectedRecord && (
        <Modal
          visible={isModalVisible}
          onRequestClose={handleCloseModal}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Editar Registro</Text>
              <Text style={styles.modalMedication}>{selectedRecord.agendamento.medicamento.nome}</Text>
              
              <Text style={styles.inputLabel}>Horário do Registro</Text>
              <View style={styles.timeInputContainer}>
                <TextInput
                    style={styles.timeInputBox}
                    value={editHour}
                    onChangeText={setEditHour}
                    keyboardType="number-pad"
                    maxLength={2}
                    placeholder="HH"
                />
                <Text style={styles.timeInputSeparator}>:</Text>
                <TextInput
                    style={styles.timeInputBox}
                    value={editMinute}
                    onChangeText={setEditMinute}
                    keyboardType="number-pad"
                    maxLength={2}
                    placeholder="mm"
                />
              </View>
              
              <View style={styles.modalButtonContainer}>
                <View style={{ backgroundColor: '#3F7EE4', borderRadius: 10, overflow: 'hidden', padding:5}}>
                  <Button title="Usei" onPress={() => handleUpdateRecord(true)} color="#fff" />
                </View>

                <View style={{ backgroundColor: 'orange', borderRadius: 10, overflow: 'hidden', padding:5 }}>
                  <Button title="Não Usei" onPress={() => handleUpdateRecord(false)} color="#fff" />
                </View>
              </View>

              <View style={{  backgroundColor: 'gray', borderRadius: 10, overflow: 'hidden', padding:5 }}>
                <Button title="Cancelar" onPress={handleCloseModal} color="white" />
              </View>
            </View>
          </View>
        </Modal>
      )}

      <BottomNavigationBar
        activeTab={activeTab} 
      />
    </View>
  );
}

