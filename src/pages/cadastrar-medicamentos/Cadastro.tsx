import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import Header from '../../components/Header';
import BottomNavigationBar from '../../components/BottomNavigationBar';
import LogoAmparo from '../../assets/LogoAmparo.png';

export default function CadastrarMedicamento() {
  const [nome, setNome] = useState('');
  const [horario, setHorario] = useState('');
  const [frequencia, setFrequencia] = useState('');
  const [dosagem, setDosagem] = useState('');
  const [observacao, setObservacao] = useState('');

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Header logoSource={LogoAmparo} />
        <Text style={styles.title}>Cadastrar Medicamento</Text>

        <TextInput
          placeholder="Nome do medicamento"
          placeholderTextColor="#558DC2"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
        />

        <TextInput
          placeholder="Horário"
          placeholderTextColor="#558DC2"
          value={horario}
          onChangeText={setHorario}
          style={styles.input}
        />

        {/* Aqui o Select customizado */}
        <RNPickerSelect
          placeholder={{ label: 'Frequência', value: null, color: '#888' }}
          items={[
            { label: 'Diário', value: 'Diário' },
            { label: 'Semanal', value: 'Semanal' },
          ]}
          onValueChange={(value) => setFrequencia(value)}
          value={frequencia}
          style={{
            inputIOS: styles.pickerInput,
            inputAndroid: styles.pickerInput,
            placeholder: {
              color: '#558DC2',
              fontSize: 14,
            },
          }}
          useNativeAndroidPickerStyle={false} // para aplicar estilo no Android
        />

        <TextInput
          placeholder="Dosagem"
          placeholderTextColor="#558DC2"
          value={dosagem}
          onChangeText={setDosagem}
          style={styles.input}
        />

        <TextInput
          placeholder="Observação"
          placeholderTextColor="#558DC2"
          value={observacao}
          onChangeText={setObservacao}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button}>
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


{/*Estilização */}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  container: {
    padding: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    color: '#558DC2',
    marginBottom: 30,
    marginTop: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#558DC2',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#f0f4f8',
    fontSize: 14,
  },
  pickerInput: {
    height: 44,
    fontSize: 14,
    color: '#000',
    paddingHorizontal: 10,
    backgroundColor: '#f0f4f8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#558DC2',
    paddingVertical: 12, // centraliza verticalmente no iOS
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#558DC2',
    padding: 10,
    borderRadius: 8,
    marginTop: 30,
    width: 167,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
