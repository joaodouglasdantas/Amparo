import * as Notifications from 'expo-notifications';
import { AgendamentoType } from '../pages/home/HomeScreen';
import { parse, getDay } from 'date-fns';

export const scheduleReminder = async (agendamento: AgendamentoType) => {
  const identifier = `agendamento-${agendamento.id}`;
  
  try {
    await Notifications.cancelScheduledNotificationAsync(identifier);
    const horarioDate = parse(agendamento.horario, 'HH:mm:ss', new Date());
    const horarioAlarmeHoje = new Date();
    horarioAlarmeHoje.setHours(horarioDate.getHours());
    horarioAlarmeHoje.setMinutes(horarioDate.getMinutes());
    horarioAlarmeHoje.setSeconds(0);

    if (horarioAlarmeHoje < new Date()) {
      console.log(`Horário ${agendamento.horario} para ${agendamento.medicamento.nome} já passou hoje. O alarme será para amanhã.`);
    }

    let trigger: Notifications.CalendarTriggerInput = {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        hour: horarioDate.getHours(),
        minute: horarioDate.getMinutes(),
        repeats: true,
    };

    const hour = horarioDate.getHours();
    const minute = horarioDate.getMinutes();
    if (agendamento.frequencia === 'Diário') {
      trigger = {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        hour,
        minute,
        repeats: true,
        channelId: 'default',
      };
    } else if (agendamento.frequencia === 'Semanal') {
      
      const weekday = getDay(horarioAlarmeHoje) + 1; 
      trigger = {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        weekday, 
        hour,
        minute,
        repeats: true,
        channelId: 'default',
      };
    }
    if (trigger) {
      await Notifications.scheduleNotificationAsync({
        identifier,
        content: {
          title: '💊 Hora do seu remédio!',
          body: `Não se esqueça de tomar seu ${agendamento.medicamento.nome} (${agendamento.medicamento.dosagem}).`,
          sound: 'alarm.mp3',
          data: {
            screen: 'Alarm',
            agendamentoId: agendamento.id,
          },
          vibrate: [0, 250, 250, 500, 250, 250, 500],
          sticky: true,
        },
        trigger, 
      });
    }
  } catch (error) {
    console.error(`Falha ao agendar notificação para agendamento ${agendamento.id}:`, error);
  }
}