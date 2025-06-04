import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface BottomNavigationBarProps {
  onCalendarPress: () => void;
  onSearchPress: () => void;
  onAddPress: () => void;
  onTimerPress: () => void;
  onSettingsPress: () => void;
  activeTab: 'calendar' | 'search' | 'add' | 'timer' | 'settings';
}

const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({
  onCalendarPress,
  onSearchPress,
  onAddPress,
  onTimerPress,
  onSettingsPress,
  activeTab,
}) => {
  const getIconColor = (tabName: string) => {
    return activeTab === tabName ? '#fff' : '#A9D6FF'; // Cor ativa e inativa
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconButton} onPress={onCalendarPress}>
        <MaterialCommunityIcons
          name="calendar-month"
          size={28}
          color={getIconColor('calendar')}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={onSearchPress}>
        <MaterialCommunityIcons
          name="text-box-search-outline"
          size={28}
          color={getIconColor('search')}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
        <MaterialCommunityIcons name="plus" size={36} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={onTimerPress}>
        <MaterialCommunityIcons
          name="clock-time-four-outline"
          size={28}
          color={getIconColor('timer')}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={onSettingsPress}>
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
    backgroundColor: '#3F7EE4', // Cor da barra de navegação
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70, // Altura da barra
  },
  iconButton: {
    padding: 10,
  },
  addButton: {
    backgroundColor: '#3F7EE4', // Cor do botão de adição
    borderRadius: 50,
    padding: 10,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 30, // Para que ele fique um pouco para cima
  },
});

export default BottomNavigationBar;