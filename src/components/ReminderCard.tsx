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
    marginBottom: 10,
    marginHorizontal: 16,
    padding: 15,
  },
  detailsText: {
    color: '#555',
    fontSize: 14,
    marginLeft: 29, // alinhar com o texto da medicação
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
  },
  medicationText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notesText: {
    color: '#555',
    fontSize: 14,
    marginLeft: 29,
    marginTop: 5,
  },
  timeText: {
    color: '#3F7EE4',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default ReminderCard;