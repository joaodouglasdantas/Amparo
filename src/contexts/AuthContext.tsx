import React, { createContext, useState, useEffect, useContext, useMemo, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import api from '../services/api'; 
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { AgendamentoType } from '../pages/home/HomeScreen'; 
import { scheduleReminder } from '../services/notificacao'; 

type AuthContextType = {
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  userToken: string | null;
  isLoading: boolean;
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldHandleWhileInForeground: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      const token = await SecureStore.getItemAsync('accessToken');
      setUserToken(token);
      setIsLoading(false);
    };
    bootstrapAsync();
  }, []);

  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        alert('Falha ao obter permissão para notificações! Os alarmes podem não funcionar.');
        return;
      }

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 500, 250, 250, 500],
          lightColor: '#FF231F7C',
          bypassDnd: true,
          sound: 'alarm.mp3',
        });
      }
    };

    registerForPushNotificationsAsync();
  }, []); 

  const authContextValue = useMemo(
    () => ({
      isLoading,
      userToken,
      signIn: async (username: any, password: any) => {
        const response = await api.post('/api/token/', { username, password });
        const { access, refresh } = response.data;
        await SecureStore.setItemAsync('accessToken', access);
        await SecureStore.setItemAsync('refreshToken', refresh);
        
        const agendamentosResponse = await api.get('/api/agendamentos/', {
          headers: { Authorization: `Bearer ${access}` }
        });
        await Notifications.cancelAllScheduledNotificationsAsync();
        for (const ag of agendamentosResponse.data) {
          await scheduleReminder(ag);
        }
        
        setUserToken(access);
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
        setUserToken(null);
      },
    }),
    [isLoading, userToken]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};