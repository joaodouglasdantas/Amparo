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
});

export default styles;