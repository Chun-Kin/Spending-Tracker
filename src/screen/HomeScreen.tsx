import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../types/types';
import { useAuth } from '../context/AuthContext';
import { fetchTotalEarnings, fetchTotalExpenses } from '../database/database';
import { useExpenseContext } from '../context/ExpenseContext'; // Import the ExpenseContext
import styles from '../styles/HomeScreenStyles';

type HomeScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList, 'HomeDrawer'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { username } = useAuth();
  const { expenses } = useExpenseContext(); // Access the expenses context to listen to changes
  const [earnings, setEarnings] = useState(0);
  const [expensesTotal, setExpensesTotal] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (username) {
      fetchTotalEarnings(username, (totalEarnings) => {
        setEarnings(totalEarnings);
      });
      fetchTotalExpenses(username, (totalExpenses) => {
        setExpensesTotal(totalExpenses);
      });
    }
  }, [username, expenses]); // Rerun this effect when the expenses change

  useEffect(() => {
    setBalance(earnings - expensesTotal);
  }, [earnings, expensesTotal]);

  const balanceColor = balance >= 0 ? '#28a745' : '#dc3545'; // Green for positive, red for negative

  return (
    <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, {username.toUpperCase()}</Text>
        <Text style={styles.title}>Spending Tracker</Text>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Earnings: RM{earnings.toFixed(2)}</Text>
          <Text style={styles.boxTitle}>Expenses: RM{expensesTotal.toFixed(2)}</Text>
          <Text style={[styles.boxTitle, { color: balanceColor }]}>
            Balance: {balance >= 0 ? `+RM${balance.toFixed(2)}` : `RM${balance.toFixed(2)}`}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddExpense')}
        >
          <Text style={styles.buttonText}>Add Transaction</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
