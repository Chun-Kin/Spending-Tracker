import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Expense } from '../types/types';
import { useAuth } from '../context/AuthContext';
import { fetchExpenses as fetchExpensesFromDB, deleteExpense as deleteExpenseFromDB } from '../database/database';
import { useExpenseContext } from '../context/ExpenseContext';
import styles from '../styles/ExpenseHistoryScreenStyles'; 

type ExpenseHistoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ExpenseHistory'>;

type Props = {
  navigation: ExpenseHistoryScreenNavigationProp;
};

const ExpenseHistoryScreen: React.FC<Props> = ({ navigation }) => {
  const { username } = useAuth();
  const { expenses, setExpenses, deleteExpense } = useExpenseContext(); // Use the context

  useEffect(() => {
    if (username) {
      retrieveExpenses(username);
    }
  }, [username]);

  const retrieveExpenses = (username: string | null) => {
    fetchExpensesFromDB(username, (fetchedExpenses) => {
      setExpenses(fetchedExpenses);
    });
  };

  const handleDeleteExpense = (id: string) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this expense?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            deleteExpenseFromDB(id, (success) => {
              if (success) {
                setExpenses((prevExpenses) =>
                  prevExpenses.filter((expense) => expense.id !== id)
                );
                deleteExpense(id);
                Alert.alert('Success', 'Expense deleted successfully!');
              } else {
                Alert.alert('Error', 'Failed to delete expense');
              }
            });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.expenseItem,
              {
                backgroundColor:
                  item.type === 'earn' ? 'lightgreen' : item.type === 'used' ? 'lightcoral' : '#f9f9f9',
              },
            ]}
          >
            <Text>Description: {item.description}</Text>
            <Text>Amount: RM{item.amount.toFixed(2)}</Text>
            <Text>Type: {item.type}</Text>
            <Button title="Delete" onPress={() => handleDeleteExpense(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default ExpenseHistoryScreen;
