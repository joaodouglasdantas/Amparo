import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Alert, Modal } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

import Header from '../../components/Header';
import BottomNavigationBar from '../../components/BottomNavigationBar';
import LogoAmparo from '../../assets/LogoAmparo.png';
import AntDesign from '@expo/vector-icons/AntDesign';

// 1. Definimos um tipo forte para os dados do nosso formulário
type MedicamentoFormData = {
  nome: string;
  horario: Date;
  frequencia: 'Diário' | 'Semanal' | null;
  dosagem: string;
  observacao: string;
};

// Precisamos também das props de navegação
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../home/HomeScreen'; // Reutilizando o tipo da HomeScreen
type CadastroScreenProps = NativeStackScreenProps<RootStackParamList, 'CadastroMedicamento'>;


export default function CadastrarMedicamento({ navigation }: CadastroScreenProps) {
  // 2. Usamos um único estado para o formulário, tipado com nossa interface
  const [formData, setFormData] = useState<MedicamentoFormData>({
    nome: '',
    horario: new Date(), // Inicia com a data/hora atual
    frequencia: null,
    dosagem: '',
    observacao: '',
  });

  // Estado para controlar a visibilidade do seletor de horário
  const [showTimePicker, setShowTimePicker] = useState(false);

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

  // 4. Criamos a função de salvamento
  const handleSave = () => {
    // Aqui você faria a validação dos dados
    if (!formData.nome || !formData.horario || !formData.frequencia || !formData.dosagem) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Aqui você faria a chamada para a sua API com axios
    console.log('Dados a serem enviados para a API:', {
        ...formData,
        // Formata o horário para uma string antes de enviar (ex: "18:30")
        horario: formData.horario ? format(formData.horario, 'HH:mm') : null,
    });

    Alert.alert('Sucesso', 'Medicamento cadastrado!');
    // Exemplo: navegar de volta para a Home após salvar
    // navigation.navigate('Home'); 
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
        

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>SALVAR</Text>
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

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
  },
  modalButton: {
    backgroundColor: '#558DC2',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  modalButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    marginVertical: 20,
    textAlign: 'center',
    color: '#558DC2',
    marginBottom: 30,
    marginTop: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#558DC2',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#f0f4f8',
    fontSize: 14,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#558DC2',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

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