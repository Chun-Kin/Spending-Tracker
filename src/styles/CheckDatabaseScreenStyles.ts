import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e06e6c',
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: 'white'
    },
    expenseList: {
      width: '100%',
      padding: 20,
    },
    expenseItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
      backgroundColor: 'white',
      borderRadius: 5,
      marginBottom: 10,
    },
    earn: {
      color: 'green',
    },
    used: {
      color: 'red',
    },
  });
  
export default styles;