import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Alert, Modal } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import styles from './style';
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { ActivityIndicator } from 'react-native'

import Header from '../../components/Header';
import BottomNavigationBar from '../../components/BottomNavigationBar';
import LogoAmparo from '../../assets/LogoAmparo.png';
import AntDesign from '@expo/vector-icons/AntDesign';

type MedicamentoFormData = {
  nome: string;
  horario: Date;
  frequencia: 'Diário' | 'Semanal' | null;
  dosagem: string;
  observacao: string;
};

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../home/HomeScreen'; 
type CadastroScreenProps = NativeStackScreenProps<RootStackParamList, 'CadastroMedicamento'>;


export default function CadastrarMedicamento({ navigation }: CadastroScreenProps) {
  const [formData, setFormData] = useState<MedicamentoFormData>({
    nome: '',
    horario: new Date(), // Inicia com a data/hora atual
    frequencia: null,
    dosagem: '',
    observacao: '',
  });
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  // 3. Criamos um handler genérico para atualizar o estado
  const handleInputChange = (field: keyof MedicamentoFormData, value: any) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };
  
  const onChangeTime = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }

    if (selectedDate) {
        handleInputChange('horario', selectedDate);
    }
  };

  
  const handleSave = async () => {
    if (!formData.nome || !formData.horario || !formData.frequencia || !formData.dosagem) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true);

    try {
      // 1. Pegar o token de autenticação
      const token = await SecureStore.getItemAsync('accessToken');
      if (!token) {
        Alert.alert('Erro', 'Você não está autenticado.');
        setLoading(false);
        // Opcional: navegar para a tela de login
        // navigation.navigate('Login');
        return;
      }

      const apiUrl = process.env.EXPO_PUBLIC_API_URL;

      // 2. Preparar os dados para enviar. O horário precisa ser formatado.
      const payload = {
        ...formData,
        horario: format(formData.horario, 'HH:mm'), // Formata para '18:30'
      };
      
      // 3. Fazer a chamada de API com o cabeçalho de autorização
      await axios.post(`${apiUrl}/api/medicamentos/`, payload, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      Alert.alert(
        'Sucesso!', 
        'Medicamento e agendamento cadastrados.',
        [{ text: 'OK', onPress: () => navigation.goBack() }] // Volta para a tela anterior
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

  const confirmIOSTime = () => {
    setShowTimePicker(false);
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Header logoSource={LogoAmparo} />
        <Text style={styles.title}>Cadastrar Medicamento</Text>

        <TextInput
          placeholder="Nome do medicamento"
          placeholderTextColor="black"
          value={formData.nome}
          onChangeText={(value) => handleInputChange('nome', value)}
          style={styles.input}
        />
        
        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.input}>
            <Text style={{color: 'black' }}>
                {formData.horario ? `Horário: ${format(formData.horario, 'HH:mm')}` : 'Horário'}
            </Text>
        </TouchableOpacity>

        {Platform.OS === 'android' && showTimePicker && (
          <DateTimePicker
            value={formData.horario}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChangeTime}
          />
        )}

        {Platform.OS === 'ios' && (
            <Modal
                transparent={true}
                animationType="slide"
                visible={showTimePicker}
                onRequestClose={() => setShowTimePicker(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <DateTimePicker
                            value={formData.horario}
                            mode="time"
                            is24Hour={true}
                            textColor='black'
                            display="spinner" 
                            onChange={onChangeTime}
                        />
                        <TouchableOpacity style={styles.modalButton} onPress={confirmIOSTime}>
                            <Text style={styles.modalButtonText}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )}

        <RNPickerSelect
          placeholder={{ label: 'Frequência', value: null, color:'black' }}
          items={[
            { label: 'Diário', value: 'Diário', color:'black' },
            { label: 'Semanal', value: 'Semanal', color:'black' },
          ]}
          onValueChange={(value) => handleInputChange('frequencia', value)}
          value={formData.frequencia}
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false}
          Icon={() => {
              return <AntDesign name="down" size={16} color="gray" style={{ paddingRight: 15, paddingTop: 12 }} />;
          }}
        />

        <TextInput
          placeholder="Dosagem (ex: 50mg)"
          placeholderTextColor="black"
          value={formData.dosagem}
          onChangeText={(value) => handleInputChange('dosagem', value)}
          style={styles.input}
        />

        <TextInput
          placeholder="Observação"
          placeholderTextColor="black"
          value={formData.observacao}
          onChangeText={(value) => handleInputChange('observacao', value)}
          style={styles.input}
        />
        

        <TouchableOpacity style={styles.button} onPress={handleSave} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>SALVAR</Text>}
        </TouchableOpacity>
      </View>

      <BottomNavigationBar
        onCalendarPress={() => {}}
        onSearchPress={() => {}}
        onAddPress={() => {}}
        onTimerPress={() => {}}
        onSettingsPress={() => {}}
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