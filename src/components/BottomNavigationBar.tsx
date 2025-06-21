import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../pages/home/HomeScreen'; 

interface BottomNavigationBarProps {
  activeTab: 'calendar' | 'search' | 'add' | 'timer' | 'settings';
}

const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({ activeTab }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const getIconColor = (tabName: string) => {
    return activeTab === tabName ? '#fff' : '#A9D6FF';
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Home')}>
        <MaterialCommunityIcons
          name="calendar-month"
          size={28}
          color={getIconColor('calendar')}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconButton} onPress={() => {}}>
        <MaterialCommunityIcons
          name="text-box-search-outline"
          size={28}
          color={getIconColor('search')}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('CadastroMedicamento')}>
        <Feather
          name="plus"
          size={38} 
          color={getIconColor('add')} 
        />
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.iconButton} onPress={() => { }}>
        <MaterialCommunityIcons
          name="clock-time-four-outline"
          size={28}
          color={getIconColor('timer')}
        />
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Configuracao')}>
        <MaterialCommunityIcons
          name="cog"
          size={28}
          color={getIconColor('settings')}
        />
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#558DC2',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80, 
    paddingBottom: 10, 
  },
  iconButton: {
    padding: 10,
  },
});

export default BottomNavigationBar;