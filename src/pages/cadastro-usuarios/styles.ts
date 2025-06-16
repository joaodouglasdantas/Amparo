import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#5C9EDC',
    },
    flex: {
      flex: 1,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingTop: 15,
    },
    logo: {
      width: 200,
      height: 80,
      marginBottom: 10,
      marginTop: 30,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 20,
    },
    input: {
      width: '90%',
      height: 48,
      backgroundColor: '#fff',
      borderRadius: 8,
      paddingHorizontal: 14,
      fontSize: 16,
      marginBottom: 12,
      elevation: 2,
    },
    label: {
      width: '90%',
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 6,
      marginTop: 8,
      textAlign: 'left',
    },
    pinContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around', 
        width: '70%', 
        marginVertical: 10,
        marginBottom: 15,
    },
    pinBox: {
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    pinText: {
        fontSize: 30,
        color: '#333',
        textAlign: 'center',
    },
    pinInput: {
      width: '60%',
      height: 48,
      backgroundColor: '#fff',
      borderRadius: 8,
      paddingVertical: 10,
      fontSize: 24,
      letterSpacing: 15,
      textAlign: 'center',
      marginBottom: 12,
      elevation: 2,
      color: '#333', 
    },
    keypad: {
      width: '70%',
      marginVertical: 10,
    },
    keypadRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 5,
    },
    keypadButton: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    keypadButtonText: {
      fontSize: 28,
      color: '#fff',
      fontWeight: 'bold',
    },
    confirmButton: {
      backgroundColor: 'rgba(16, 84, 148, 1)',
      borderRadius: 8,
      marginTop: 15,
      width: '60%',
      paddingVertical: 12,
      alignItems: 'center',
      elevation: 2,
      minHeight: 48, // Garante altura mínima para o ActivityIndicator
    },
    confirmButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
});

export default styles;