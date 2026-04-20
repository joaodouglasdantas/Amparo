import React from 'react';
import { View, Text, Switch, StyleSheet, Platform } from 'react-native';

type SettingsRowProps = {
  label: string;
  value: boolean;
  onValueChange: (newValue: boolean) => void;
};

const SettingsRow: React.FC<SettingsRowProps> = ({ label, value, onValueChange }) => {
  return (
    <View style={styles.rowContainer}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={value ? "#3F7EE4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
});

export default SettingsRow;