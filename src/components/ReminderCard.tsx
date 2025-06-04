import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ReminderCardProps {
  time: string;
  medication: string;
  dose: string;
  frequency: string;
  notes?: string; // opcional para o segundo card
}

const ReminderCard: React.FC<ReminderCardProps> = ({ time, medication, dose, frequency, notes }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="clock-time-four-outline" size={24} color="#3F7EE4" />
        <Text style={styles.timeText}>{time}</Text>
        <Text style={styles.medicationText}> - {medication}</Text>
      </View>
      <Text style={styles.detailsText}>{dose} {frequency}</Text>
      {notes && <Text style={styles.notesText}>{notes}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E0F0FF',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3F7EE4',
    marginLeft: 5,
  },
  medicationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  detailsText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 29, // alinhar com o texto da medicação
  },
  notesText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    marginLeft: 29,
  },
});

export default ReminderCard;