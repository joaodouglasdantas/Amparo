import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';

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
    return activeTab === tabName ? '#fff' : '#A9D6FF';
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

      <TouchableOpacity style={styles.iconButton} onPress={onAddPress}>
        <Feather
          name="plus"
          size={28}
          color={getIconColor('add')} 
        />
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
    backgroundColor: '#558DC2',
    paddingVertical: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  iconButton: {
    padding: 10,
  },
});

export default BottomNavigationBar;
