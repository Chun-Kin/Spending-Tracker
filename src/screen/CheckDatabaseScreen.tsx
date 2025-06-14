import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, FlatList } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { fetchUsers, fetchExpenses } from '../database/database';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import styles from '../styles/CheckDatabaseScreenStyles'; 

const CheckDatabaseScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { userId, username } = useAuth(); // Access userId and username from context
  const [expenses, setExpenses] = useState<any[]>([]);

  useEffect(() => {
    if (username !== 'admin') {
      Alert.alert("Access Denied", "You need admin privileges to view this page.");
      navigation.navigate('Drawer'); // Navigate back to HomeScreen
    } else {
      fetchUsers((fetchedUsers) => {
        console.log("User data:", fetchedUsers);
      });
      fetchExpenses(null, (fetchedExpenses) => {
        setExpenses(fetchedExpenses);
        console.log("Expense data:", fetchedExpenses);
      });
    }
  }, [username]);

  if (username !== 'admin') {
    return (
      <View style={styles.container}>
        <Text>Access Denied</Text>
      </View>
    );
  }

  const renderExpenseItem = ({ item }: { item: any }) => {
    const amount = Number(item.amount); // Convert to number
    return (
      <View style={styles.expenseItem}>
        <Text>{item.description}</Text>
        <Text>{item.type}</Text>
        <Text style={item.type === 'earn' ? styles.earn : styles.used}>
          RM {amount.toFixed(2)} 
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Expense Data</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderExpenseItem}
        style={styles.expenseList}
      />
      <Button 
        title="Go Back"
        onPress={() => navigation.navigate('AdminHomeScreen')}
      />
    </View>
  );
};

export default CheckDatabaseScreen;
