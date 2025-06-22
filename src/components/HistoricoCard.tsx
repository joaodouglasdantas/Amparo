// src/components/HistoricoCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format, parseISO } from 'date-fns';

type HistoricoCardProps = {
  registro: {
    tomou: boolean;
    data_hora_tomada: string;
    agendamento: {
      horario: string;
      medicamento: {
        nome: string;
        dosagem_formatada: string;
      }
    }
  }

  onPress: () => void;
};

const HistoricoCard: React.FC<HistoricoCardProps> = ({ registro, onPress }) => {
  const medicamento = registro?.agendamento?.medicamento;
  const horario = registro?.agendamento?.horario;
  const tomou = registro?.tomou;

  const cardStyle = [styles.card, !tomou && styles.cardMissed];
  const textStyle = [styles.baseText, !tomou && styles.textMissed];
  const iconColor = tomou ? '#fff' : '#AAB5C1';

  if (!medicamento || !horario) {
    return (
      <View style={[styles.card, styles.cardError]}>
        <Text style={styles.errorText}>Erro ao carregar este registro.</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={cardStyle}>
        <View style={styles.leftContent}>
          <Text style={[styles.medicationText, textStyle]}>{medicamento.nome}</Text>
          <Text style={[styles.dosageText, textStyle]}>{medicamento.dosagem_formatada ?? ''}</Text>
        </View>
        <View style={styles.rightContent}>
          <Text style={[styles.timeText, textStyle]}>{format(parseISO(`1970-01-01T${horario}`), 'HH:mm')}</Text>
          <MaterialCommunityIcons
            name={tomou ? "check-circle" : "close-circle"}
            size={24}
            color={iconColor}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#558DC2',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 16,
  },
  cardMissed: {
    backgroundColor: '#546581', 
    borderColor: '#C8D0D9',
    borderWidth: 1,
  },
  cardError: {
    backgroundColor: '#FFEBEE',
    borderColor: '#D32F2F',
    borderWidth: 1,
  },
  errorText: {
      color: '#D32F2F',
      fontStyle: 'italic',
  },
  leftContent: {
    flex: 1,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  medicationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  dosageText: {
    fontSize: 14,
    color: '#E0EFFF',
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 8,
  },
  baseText: {
    color: '#fff',
  },
  textMissed: {
    color: '#fff', 
  },
});

export default HistoricoCard;