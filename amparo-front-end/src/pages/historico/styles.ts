import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1, 
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
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3F7EE4',
        backgroundColor: '#f5f5f5',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '70%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalMedication: {
        fontSize: 20,
        marginBottom: 20,
    },
    timePickerButton: {
        borderWidth: 1,
        borderColor: '#558DC2',
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
        backgroundColor: '#f0f4f8',
        justifyContent: 'center',
        fontSize: 14,
    },
    modalButtonContainer: {
        width: '85%',
        justifyContent: 'space-around',
        height: 70,
        alignItems: 'center',
        flexDirection: 'row',
    },
    inputLabel: {
        fontSize: 14,
        color: '#888',
        marginBottom: 8,
    },
    timeInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    timeInputBox: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        width: 60,
        height: 50,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    timeInputSeparator: {
        fontSize: 24,
        fontWeight: 'bold',
        marginHorizontal: 10,
    },
});

export default styles;