import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5C9EDC',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 220,
    height: 100,
    marginTop: 100,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  subtitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 23,
    marginBottom: 28,
    textAlign: 'center',
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  pinCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#fff',
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  pinDot: {
    width: 12,
    height: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  keypad: {
    width: '70%',
    marginTop: 12,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  key: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  keyText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  eraseText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    opacity: 0.8,
  },
  faceid: {
    fontSize: 26,
    color: '#fff',
    opacity: 0.8,
  },
});