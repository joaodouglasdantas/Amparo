// src/components/MedicationGroupCard.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'; // Importando os dois ícones

type MedicacaoGroupCardProps = {
  nomeMedicamento: string;
  dosagem: string;
  proximoHorario: string | null;
  outrosHorarios: string[];
};

const MedicacaoGroupCard: React.FC<MedicacaoGroupCardProps> = ({
  nomeMedicamento,
  dosagem,
  proximoHorario,
  outrosHorarios,
}) => {
  return (
    <View style={styles.card}>
      
      <View style={styles.row}>
        <Text style={styles.medicationText}>{nomeMedicamento}</Text>
        <Text style={styles.dosageText}> - {dosagem}</Text>
      </View>

      {proximoHorario && (
        <View style={[styles.row, { marginTop: 8 }]}>
          <MaterialCommunityIcons name="clock-time-four-outline" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.detailsText}>Próximo às </Text>
          <Text style={styles.timeText}>{proximoHorario}</Text>
        </View>
      )}

      
      {outrosHorarios.length > 0 && (
        <View style={[styles.row, { marginTop: 4 }]}>
            
            <View style={{ width: 20, marginRight: 8 }} /> 
            <Text style={styles.footerText}>
                Também às {outrosHorarios.join(', ')}
            </Text>
        </View>
      )}

      
      {!proximoHorario && (
         <View style={[styles.row, { marginTop: 8 }]}>
            <MaterialCommunityIcons name="check-circle-outline" size={20} color="#A9D6FF" style={styles.icon} />
            <Text style={styles.allTakenText}>Todos os horários de hoje já passaram.</Text>
        </View>
      )}

    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(79, 131, 217, 1)',
    borderRadius: 10,
    marginBottom: 12,
    marginHorizontal: 16,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  medicationText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dosageText: {
    color: '#E0EFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  detailsText: {
    color: '#A9D6FF',
    fontSize: 14,
  },
  timeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    color: '#A9D6FF',
    fontSize: 12,
    fontStyle: 'italic',
  },
  allTakenText: {
      color: '#A9D6FF',
      fontSize: 14,
      fontStyle: 'italic',
  }
});

export default MedicacaoGroupCard;