import React, { useState, useMemo } from 'react';
import { View, Text, SectionList, SafeAreaView, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { format, parseISO, isToday, isYesterday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import api from '../../services/api';
import Header from '../../components/Header';
import HistoricoRecordCard from '../../components/HistoricoCard';
import LogoAmparo from '../../assets/LogoAmparoPreto.png';
import styles from './styles'; 
import BottomNavigationBar from '../../components/BottomNavigationBar';

// Um tipo para nossos dados de registro
type RegistroType = any; 

export default function HistoricoScreen() {
  const [registros, setRegistros] = useState<RegistroType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'calendar' | 'search' | 'add' | 'timer' | 'settings'>('timer');
  

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

  // Função auxiliar para formatar os títulos das seções
  const formatSectionTitle = (dateString: string) => {
    const date = parseISO(dateString);
    if (isToday(date)) return 'Hoje';
    if (isYesterday(date)) return 'Ontem';
    return format(date, "EEEE, dd 'de' MMMM", { locale: ptBR });
  };
  
  const groupedRecords = useMemo(() => {
    if (registros.length === 0) return [];
    
    // Agrupa todos os registros por data (YYYY-MM-DD)
    const groups = registros.reduce((acc, registro) => {
      const dateKey = format(parseISO(registro.data_hora_tomada), 'yyyy-MM-dd');
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(registro);
      return acc;
    }, {} as { [key: string]: RegistroType[] });

    // Transforma o objeto em um array no formato que a SectionList espera
    return Object.keys(groups).map(date => ({
      title: formatSectionTitle(date), // ex: 'Hoje', 'Ontem', '20 de Junho'
      data: groups[date],
    }));
  }, [registros]);


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
          renderItem={({ item }) => <HistoricoRecordCard registro={item} />}
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
      <BottomNavigationBar
        activeTab={activeTab} 
      />
    </View>
  );
}

