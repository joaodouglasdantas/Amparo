import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'; 
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type MedicacaoGroupCardProps = {
  nomeMedicamento: string;
  dosagem: string;
  proximoHorario: string | null;
  outrosHorarios: string[];
  estaraFinalizado: boolean;
  dataFim: string | null;
};

const MedicacaoGroupCard: React.FC<MedicacaoGroupCardProps> = ({
  nomeMedicamento,
  dosagem,
  proximoHorario,
  outrosHorarios,
  estaraFinalizado,
  dataFim,
}) => {
  return (
    <View style={[styles.card, estaraFinalizado && styles.cardFinished]}>
      
      <View style={styles.row}>
        <Text style={[styles.medicationText, estaraFinalizado && styles.textFinished]}>{nomeMedicamento}</Text>
        <Text style={[styles.dosageText, estaraFinalizado && styles.textFinished]}> - {dosagem}</Text>
      </View>

      {estaraFinalizado ? (
        
        <View style={[styles.row, { marginTop: 8 }]}>
           <MaterialCommunityIcons name="check-circle" size={20} color="#616161" style={styles.icon} />
           <Text style={styles.finishedMessage}>
             Tratamento finalizado em {dataFim ? format(parseISO(dataFim), 'dd/MM/yyyy', { locale: ptBR }) : ''}
           </Text>
       </View>
      ) : (
        <>
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
                <Text style={styles.allTakenText}>Nenhum lembrete futuro para hoje.</Text>
            </View>
          )}
        </>
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
  cardFinished: {
    backgroundColor: '#E0E0E0',
  },
  textFinished: {
      color: '#616161', 
  },
  finishedMessage: {
      color: '#424242',
      fontSize: 14,
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