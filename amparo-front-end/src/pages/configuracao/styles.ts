import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3F7EE4',
    textAlign: 'center',
    marginVertical: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    paddingVertical: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#3F7EE4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 10,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3F7EE4',
  },
  secondaryButtonText: {
    color: '#3F7EE4',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
      marginTop: 30,
      padding: 15,
      borderRadius: 10,
      backgroundColor: '#FFDDDD',
      alignItems: 'center',
  },
  logoutButtonText: {
      color: '#D92D2D',
      fontWeight: 'bold',
      fontSize: 16,
  }
});

export default styles;