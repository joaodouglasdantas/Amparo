import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan.',
    'Fev.',
    'Mar.',
    'Abr.',
    'Mai.',
    'Jun.',
    'Jul.',
    'Ago.',
    'Set.',
    'Out.',
    'Nov.',
    'Dez.',
  ],
  dayNames: [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje',
};
LocaleConfig.defaultLocale = 'br';

interface CalendarComponentProps {
  onDayPress: (day: any) => void;
  markedDates: any; // Objeto com datas marcadas, e.g., {'2025-05-20': {selected: true, marked: true}}
  currentMonth: string; // Ex: '2025-05-01'
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ onDayPress, markedDates, currentMonth }) => {
  return (
    <View style={styles.container}>
      <Calendar
        current={currentMonth}
        onDayPress={onDayPress}
        monthFormat={'MMMM de yyyy'}
        hideExtraDays={true}
        enableSwipeMonths={true}
        markedDates={markedDates}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: 'orange',
          disabledArrowColor: '#d9e1e8',
          monthTextColor: '#2d4150',
          indicatorColor: 'blue',
          textDayFontFamily: 'monospace',
          textMonthFontFamily: 'monospace',
          textDayHeaderFontFamily: 'monospace',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
        renderHeader={(date) => {
          const month = LocaleConfig.locales['br'].monthNames[date.getMonth()];
          const year = date.getFullYear();
          return (
            <View style={styles.customHeader}>
              <Text style={styles.monthText}>{`${month} de ${year}`}</Text>
            </View>
          );
        }}
      />
      {/* Legenda do Calendário */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#5891d4' }]} />
          <Text style={styles.legendText}>Pontual</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FFD700' }]} />
          <Text style={styles.legendText}>Atrasado</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#0047AB' }]} />
          <Text style={styles.legendText}>Registrado depois</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 20,
    paddingBottom: 10,
  },
  customHeader: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    paddingHorizontal: 10,
  },
  legendDot: {
    borderRadius: 5,
    height: 10,
    marginRight: 5,
    width: 10,
  },
  legendItem: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  legendText: {
    color: '#333',
    fontSize: 12,
  },
  monthText: {
    color: '#2d4150',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CalendarComponent;