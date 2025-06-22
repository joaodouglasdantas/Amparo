import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1, 
  },
  remindersTitle: {
    color: 'rgba(79, 131, 217, 1)',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 16,
    marginTop: 20,
    textAlign: 'center', // centraliza o título "Lembretes"
  },
  scrollViewContent: {
    paddingBottom: 130, // adiciona padding na parte inferior para que o conteúdo não seja ocultado pela barra de navegação
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    marginHorizontal: 16,
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    marginHorizontal: 16,
  },
});

export default styles;