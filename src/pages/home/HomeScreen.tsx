import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack'; // Importe NativeStackScreenProps
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale'; 


import Header from '../../components/Header';
import CalendarComponent from '../../components/CalendarComponent';
import ReminderCard from '../../components/ReminderCard';
import BottomNavigationBar from '../../components/BottomNavigationBar';

import LogoAmparo from '../../assets/LogoAmparo.png'


export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Cadastro: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  // estado para a data selecionada no calendário
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), 'yyyy-MM-dd') // data atual no formato YYYY-MM-DD
  );

  // estado para as datas marcadas no calendário (para exibir pontos de eventos, etc.)
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});

  // estado para a aba ativa da barra de navegação inferior
  const [activeTab, setActiveTab] = useState<'calendar' | 'search' | 'add' | 'timer' | 'settings'>('calendar');

  // efeito para marcar a data selecionada no calendário
  useEffect(() => {
    // a cada vez que selectedDate muda, atualiza as datas marcadas para refletir a seleção
    setMarkedDates({
      [selectedDate]: { selected: true, marked: true, selectedColor: '#3F7EE4' },
      // exemplo: se você quiser marcar outras datas com pontos:
      // '2025-06-05': { marked: true, dotColor: 'red' },
      // '2025-06-10': { marked: true, dotColor: 'blue' },
    });
  }, [selectedDate]); // dependência: executa quando selectedDate muda

  // função chamada quando um dia é pressionado no calendário
  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString); // day.dateString é no formato 'YYYY-MM-DD'
    
    console.log('Dia selecionado:', day.dateString);
    Alert.alert('Dia Selecionado', `Você selecionou: ${format(new Date(day.dateString), 'dd/MM/yyyy', { locale: ptBR })}`);
  };

  // funções para os botões da barra de navegação inferior (exemplo)
  const handleCalendarPress = () => {
    setActiveTab('calendar');
    // lógica específica para a aba Calendário
    console.log('Aba Calendário clicada!');
  };

  const handleSearchPress = () => {
    setActiveTab('search');
    // lógica específica para a aba Pesquisa
    console.log('Aba Pesquisa clicada!');
  };

  const handleAddPress = () => {
    console.log('Plus button clicked!');
    setActiveTab('add');
    // lógica específica para a aba Adicionar
    navigation.navigate('Cadastro');
    console.log('Aba Adicionar clicada!');

    
  };

  const handleTimerPress = () => {
    setActiveTab('timer');
    // lógica específica para a aba Temporizador
    console.log('Aba Temporizador clicada!');
  };

  const handleSettingsPress = () => {
    setActiveTab('settings');
    // lógica específica para a aba Configurações
    console.log('Aba Configurações clicada!');
    // exemplo: navegação para uma tela de configurações
    // navigation.navigate('Settings');
  };


  return (
    <View style={styles.container}>
      {/* componente de cabeçalho com o logo da Amparo */}
      <Header logoSource={LogoAmparo} />

      {/* scrollview para o conteúdo principal da tela */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* componente de calendário */}
        <CalendarComponent
          onDayPress={handleDayPress}
          markedDates={markedDates}
          // currentMonth pode ser a data atual ou a data selecionada, dependendo da preferência
          currentMonth={format(new Date(), 'yyyy-MM-01')}
        />

        <Text style={styles.remindersTitle}>Lembretes</Text>

        {/* exemplo de cards de Lembretes estáticos */}
        <ReminderCard
          time="18:00"
          medication="Losartana"
          dose="50mg"
          frequency="seg, qua, sex"
        />
        <ReminderCard
          time="18:00"
          medication="Losartana"
          dose="50mg"
          frequency="seg, qua, sex"
          notes="Tomar 2 comprimidos"
        />
        <ReminderCard
          time="20:00"
          medication="Omeprazol"
          dose="20mg"
          frequency="todos os dias"
        />
      </ScrollView>

      {/* barra de Navegação Inferior */}
      <BottomNavigationBar
        onCalendarPress={handleCalendarPress}
        onSearchPress={handleSearchPress}
        onAddPress={handleAddPress}
        onTimerPress={handleTimerPress}
        onSettingsPress={handleSettingsPress}
        activeTab={activeTab} // passa a aba ativa para o componente de navegação
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1, // cor de fundo geral da tela
  },
  remindersTitle: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 16,
    marginTop: 20,
    textAlign: 'center', // centraliza o título "Lembretes"
  },
  scrollViewContent: {
    paddingBottom: 130, // adiciona padding na parte inferior para que o conteúdo não seja ocultado pela barra de navegação
  },
});

export default HomeScreen;