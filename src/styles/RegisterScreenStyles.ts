import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: 'white',
    },
    input: {
      height: 50,
      borderColor: '#ff99ac', // Light pink border for inputs
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 15,
      backgroundColor: '#fff',
      borderRadius: 25, // Rounded corners for inputs
    },
    inputError: {
      borderColor: 'red',
    },
    errorText: {
      color: 'red',
      marginBottom: 10,
      textAlign: 'center',
    },
    text1: {
      marginTop: 10,
      marginBottom: 20,
      textAlign: 'center',
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
      fontFamily: 'Helvetica',
    },
    link: {
      color: 'red',
      fontWeight: 'bold',
      textDecorationLine: 'underline',
    },
  });

export default styles;