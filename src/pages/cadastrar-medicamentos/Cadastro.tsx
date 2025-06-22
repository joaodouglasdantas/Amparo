import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Alert, Modal, ActivityIndicator } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { addHours, format, set } from 'date-fns';
import styles from './style';
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { scheduleReminder } from '../../services/notificacao';
import { AgendamentoType} from '../home/HomeScreen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../home/HomeScreen'; 
import { useRoute } from '@react-navigation/native';


import Header from '../../components/Header';
import BottomNavigationBar from '../../components/BottomNavigationBar';
import LogoAmparo from '../../assets/LogoAmparo.png';
import AntDesign from '@expo/vector-icons/AntDesign';

type MedicamentoFormData = {
  nome: string;
  horario_inicio: Date;
  horario_fim?: Date | null; 
  intervalo: string ;
  duracao_valor: string;
  duracao_unidade: 'dias' ;
  dosagem_valor: string;
  dosagem_unidade: 'mg' | 'g' | 'ml' | 'gotas' | 'comprimido(s)' | 'cápsula(s)'
  observacao: string;
};


type CadastroScreenProps = NativeStackScreenProps<RootStackParamList, 'CadastroMedicamento'>;


export default function CadastrarMedicamento({ navigation }: CadastroScreenProps) {
  
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [loading, setLoading] = useState(false)
  const route = useRoute<any>()
  const isEditing = route.params?.isEditing || false
  const initialData = route.params?.medicamentoData || null

  const [formData, setFormData] = useState<MedicamentoFormData>({
    nome: initialData?.nome || '',
    horario_inicio: initialData?.horario_inicio || new Date(),
    horario_fim: initialData?.horario_fim || null,
    intervalo: initialData?.intervalo || '',
    duracao_valor: initialData?.duracao_valor || '',
    duracao_unidade: initialData?.duracao_unidade || 'dias',
    dosagem_valor: initialData?.dosagem_valor || '',
    dosagem_unidade: initialData?.dosagem_unidade || 'mg',
    observacao: initialData?.observacao || '',
  });

  const handleInputChange = (field: keyof MedicamentoFormData, value: any) => {
    setFormData(prevState => ({ ...prevState, [field]: value }));
  };

  const onChangeStartTime = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowStartTimePicker(Platform.OS === 'ios');
    if (selectedDate) handleInputChange('horario_inicio', selectedDate);
  };
  
  const onChangeEndTime = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowEndTimePicker(Platform.OS === 'ios');
    if (selectedDate) handleInputChange('horario_fim', selectedDate);
  };

  const confirmIOSTime = () => {
    setShowStartTimePicker(false);
    setShowEndTimePicker(false);
  }
  
  const handleSave = async () => {
    const intervaloNum = parseInt(formData.intervalo, 10);
    const duracaoNum = formData.duracao_valor ? parseInt(formData.duracao_valor, 10) : null;

    if (!formData.nome || !formData.dosagem_valor) {
      Alert.alert('Atenção', 'Nome e dosagem são obrigatórios.');
      return;
    }
    if (isNaN(intervaloNum) || intervaloNum <= 0) {
      Alert.alert('Atenção', 'Por favor, insira um intervalo de horas válido.');
      return;
    }
    if (formData.duracao_valor && (duracaoNum === null || isNaN(duracaoNum) || duracaoNum <= 0)) {
        Alert.alert('Atenção', 'Por favor, insira uma duração em dias válida.');
        return;
    }

    setLoading(true);

    const horarios: string[] = [];
    const { horario_inicio, horario_fim, intervalo } = formData;
    
    let horarioAtual = horario_inicio;
    
    const limiteDoDia = horario_fim || set(new Date(), { hours: 23, minutes: 0 });

    let safetyCount = 0; 
    while (horarioAtual <= limiteDoDia && safetyCount < 24) {
      
      if (horarioAtual >= horario_inicio) {
        horarios.push(format(horarioAtual, 'HH:mm:ss'));
      }
  
      horarioAtual = addHours(horarioAtual, intervaloNum);
      safetyCount++;
    }

    if (horarios.length === 0) {
        Alert.alert('Atenção', 'Nenhum horário válido foi gerado. Verifique o horário de início, fim e o intervalo.');
        setLoading(false);
        return;
    }

    try {
      const token = await SecureStore.getItemAsync('accessToken');
      if (!token) {
        Alert.alert('Erro', 'Você não está autenticado.');
        setLoading(false);
        
        return;
      }

      const apiUrl = process.env.EXPO_PUBLIC_API_URL;

      const payload = {
        nome: formData.nome,
        dosagem_valor: formData.dosagem_valor,
        dosagem_unidade: formData.dosagem_unidade,
        observacao: formData.observacao,
        horario_inicio: format(formData.horario_inicio, 'HH:mm:ss'),
        horario_fim: formData.horario_fim ? format(formData.horario_fim, 'HH:mm:ss') : null,
        intervalo: intervaloNum,
        duracao_valor: duracaoNum,
      };

      let response;
      if(isEditing){
        response = await axios.put(`${apiUrl}/api/medicamentos/${initialData.id}`, payload, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }else{
        response = await axios.post(`${apiUrl}/api/medicamentos/`, payload, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }

      const novosAgendamentos: AgendamentoType[] = response.data.agendamentos;

      if (novosAgendamentos && novosAgendamentos.length > 0) {
        for (const agendamento of novosAgendamentos) {
          await scheduleReminder(agendamento);
        }
      }

      Alert.alert(
        'Sucesso!', 
        'Medicamento e agendamento cadastrados.',
        [{ text: 'OK', onPress: () => navigation.goBack() }] 
      );

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Erro no cadastro do medicamento:", JSON.stringify(error.response?.data));
      } else {
        console.error("Erro no cadastro do medicamento:", error);
      }
      Alert.alert('Erro', 'Não foi possível cadastrar o medicamento.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Header logoSource={LogoAmparo} />
        <Text style={styles.title}>{isEditing ? 'Editar Tratamento' : 'Cadastrar Medicamento'}</Text>

        <TextInput
          placeholder="Nome do medicamento"
          placeholderTextColor="black"
          value={formData.nome}
          onChangeText={(value) => handleInputChange('nome', value)}
          style={styles.input}
        />
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            
            <TouchableOpacity onPress={() => setShowStartTimePicker(true)} style={[styles.input, { flex: 1, marginRight: 10 }]}>
                <Text>{`Início: ${format(formData.horario_inicio, 'HH:mm')}`}</Text>
            </TouchableOpacity>

            
            <TouchableOpacity onPress={() => setShowEndTimePicker(true)} style={[styles.input, { flex: 1 }]}>
                <Text style={{ color: formData.horario_fim ? '#000' : '#999' }}>
                    {formData.horario_fim ? `Fim: ${format(formData.horario_fim, 'HH:mm')}` : 'Fim (Opcional)'}
                </Text>
            </TouchableOpacity>
        </View>

        {Platform.OS === 'android' && showStartTimePicker && (
          <DateTimePicker
            value={formData.horario_inicio}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChangeStartTime}
          />
        )}

        {Platform.OS === 'android' && showEndTimePicker && (
          <DateTimePicker
            value={formData.horario_fim || new Date()}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChangeEndTime}
          />
        )}

        {Platform.OS === 'ios' && showStartTimePicker && (
            <Modal
                transparent={true}
                animationType="slide"
                visible={showStartTimePicker}
                onRequestClose={() => setShowStartTimePicker(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <DateTimePicker
                            value={formData.horario_inicio}
                            mode="time"
                            is24Hour={true}
                            textColor='black'
                            display="spinner" 
                            onChange={onChangeStartTime}
                        />
                        <TouchableOpacity style={styles.modalButton} onPress={confirmIOSTime}>
                            <Text style={styles.modalButtonText}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )}

        {Platform.OS === 'ios' && showEndTimePicker && (
            <Modal
                transparent={true}
                animationType="slide"
                visible={showEndTimePicker}
                onRequestClose={() => setShowEndTimePicker(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <DateTimePicker
                            value={formData.horario_fim || new Date()}
                            mode="time"
                            is24Hour={true}
                            textColor='black'
                            display="spinner" 
                            onChange={onChangeEndTime}
                        />
                        <TouchableOpacity style={styles.modalButton} onPress={confirmIOSTime}>
                            <Text style={styles.modalButtonText}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )}

        <TextInput
          placeholder="Intervalo (a cada X horas)"
          placeholderTextColor="black"
          value={formData.intervalo}
          onChangeText={(value) => handleInputChange('intervalo', value)}
          style={styles.input}
          keyboardType="number-pad"
        />

        <TextInput
          placeholder="Duração do Tratamento (em dias)"
          placeholderTextColor="black"
          value={formData.duracao_valor}
          onChangeText={(value) => handleInputChange('duracao_valor', value)}
          style={styles.input}
          keyboardType="number-pad"
        />

        <View style={styles.dosagemContainer}>
          <TextInput
            placeholder="Dosagem"
            placeholderTextColor="black"
            value={formData.dosagem_valor}
            onChangeText={(value) => handleInputChange('dosagem_valor', value)}
            style={[styles.input, styles.dosagemInput]}
            keyboardType='numeric'
          />

          <View style={{ flex: 1 }}>
            <RNPickerSelect
              placeholder={{ label: 'Unidade', value: null, color:'black' }}
              items={[
                { label: 'mg', value: 'mg', color:'black' },
                { label: 'g', value: 'g', color:'black' },
                { label: 'ml', value: 'ml', color:'black' },
                { label: 'gotas', value: 'gotas', color:'black' },
                { label: 'comprimido(s)', value: 'comprimido(s)', color:'black' },
                { label: 'cápsula(s)', value: 'cápsula(s)', color:'black' },
              ]}
              onValueChange={(value) => handleInputChange('dosagem_unidade', value)}
              value={formData.dosagem_unidade}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              Icon={() => {
                  return <AntDesign name="down" size={16} color="gray" style={{ paddingRight: 10, paddingTop: 12 }} />;
              }}
            />
          </View>
        </View>

        <TextInput
          placeholder="Observação"
          placeholderTextColor="black"
          value={formData.observacao}
          onChangeText={(value) => handleInputChange('observacao', value)}
          style={styles.input}
        />
        

        <TouchableOpacity style={styles.button} onPress={handleSave} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{isEditing ? 'ATUALIZAR' : 'SALVAR'}</Text>}
        </TouchableOpacity>
      </View>

      <BottomNavigationBar
        activeTab="add"
      />
    </View>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    ...styles.input
  },
  inputAndroid: {
    ...styles.input
  },
  placeholder: {
    color: 'black',
  }
});