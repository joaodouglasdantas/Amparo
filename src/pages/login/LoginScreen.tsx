import React from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator 
} from 'react-native';
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { style } from './style'; 
import LogoAmparo from '../../assets/LogoAmparo.png';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack'; 
import { RootStackParamList } from '../../../App';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [rememberMe, setRememberMe] = React.useState(false)

  console.log("Conectando à API em:", process.env.EXPO_PUBLIC_API_URL)

  const handleLogin = async () => {
    
    if(!username || !password){
      Alert.alert('Atenção', 'Por favor, preencha o e-mail e a senha')
      return
    }

    //Componente temporário
     if (username === 'test' && password === '1234'){ 
       navigation.replace('Home')
     }

    setLoading(true)

    try{
      const apiUrl = process.env.EXPO_PUBLIC_API_URL
      const response = await axios.post(`${apiUrl}/api/token/`, {
        username: username,
        password: password
      })

      const tokens  = response.data

      await SecureStore.setItemAsync('accessToken', tokens.access);
      await SecureStore.setItemAsync('refreshToken', tokens.refresh);
      navigation.replace('Home')
    }catch (error){
      console.error("Erro no login:", error)

      if (axios.isAxiosError(error) && error.response) {
          const errorMessage = error.response.data.error || 'Credenciais inválidas. Tente novamente.';
          Alert.alert('Erro de Login', errorMessage);
      } else {
          Alert.alert('Erro de Conexão', 'Não foi possível conectar ao servidor.');
      }
    } finally {
      setLoading(false)
    }
  };

  return (
    <View style={style.container}>
      <View style={style.boxTop}>
        <Image
          style={style.logo}
          source={LogoAmparo}
          resizeMode="contain"
        />
      </View>

      <View style={style.boxMid}>
        <Text style={style.textTitle}>USUÁRIO</Text>
        <View style={style.boxInput}>
          <TextInput
            style={style.textInput}
            placeholder="Digite seu usuário" 
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none" 
          />
          <AntDesign
            name='user'
            size={24}
            color='black'
          />
        </View>

        <Text style={style.textTitle}>PIN</Text>
        <View style={style.boxInput}>
          <TextInput
            style={style.textInput}
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            keyboardType="number-pad"
            secureTextEntry={true} 
            maxLength={4}
          />
          <Entypo
            name="eye" // talvez adicione uma funcionalidade para toggle visibilidade
            size={24}
            color="black"
          />
        </View>
        <View style={style.rowBetween}>
          <TouchableOpacity
            style={style.rememberMeContainer}
            onPress={() => setRememberMe(!rememberMe)}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name={rememberMe ? "check-box" : "check-box-outline-blank"}
              size={20}
              color="#fff"
            />
            <Text style={style.rememberMeText}>Lembre-se de mim</Text>
          </TouchableOpacity>
          <TouchableOpacity> 
            <Text style={style.textForget}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={style.boxBottom}>
        <TouchableOpacity 
          style={[style.button, loading && {backgroundColor: '#ccc'}]} onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
              <ActivityIndicator color="#fff" />
          ) : (
              <Text style={style.textButton}>Entrar</Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('CadastroUsuario')}>
        <Text style={style.textBotton}>Não tem conta? Criar agora!</Text>
      </TouchableOpacity>
    </View>
  );
}