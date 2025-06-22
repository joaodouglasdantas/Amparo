import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  centerContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
  },
  title: {
    color: 'rgba(79, 131, 217, 1)',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 16,
    marginTop: 20,
    textAlign: 'center'
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});

export default styles;