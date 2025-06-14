import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e06e6c',
    },
    picsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: 20,
    },
    profilePic: {
      width: 100,
      height: 100,
      borderRadius: 50,
      margin: 10,
    },
    selected: {
      borderColor: 'blue',
      borderWidth: 2,
    },
  });
  
export default styles;