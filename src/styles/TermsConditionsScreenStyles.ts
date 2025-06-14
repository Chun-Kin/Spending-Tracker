import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffe4e1', // Light pink background
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#d81b60', // Dark pink for the title
        marginBottom: 30,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#cc3366',
        marginVertical: 15,
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
    },
});

export default styles;
