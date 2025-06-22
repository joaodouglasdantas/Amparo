import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
  },
  modalButton: {
    backgroundColor: '#558DC2',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  modalButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    marginVertical: 20,
    textAlign: 'center',
    color: '#558DC2',
    marginBottom: 30,
    marginTop: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#558DC2',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#f0f4f8',
    fontSize: 14,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#558DC2',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dosagemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dosagemInput: {
    flex: 1,
    marginRight: 20,
  },
  dosagemUnidadeInput: {
    flex: 1,
  }
});

export default styles;

