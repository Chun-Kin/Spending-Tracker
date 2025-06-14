import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      backgroundColor: 'rgba(0,0,0,0.5)', // Optional: Add semi-transparent background for better readability
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      color: 'white',
    },
    button: {
      backgroundColor: '#007bff', // Button color
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginVertical: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
export default styles;