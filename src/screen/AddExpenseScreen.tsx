import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Expense } from '../types/types';
import { useAuth } from '../context/AuthContext';
import { addExpense as addExpenseToDB } from '../database/database';
import { useExpenseContext } from '../context/ExpenseContext';
import styles from '../styles/AddExpenseScreenStyles'; 

type AddExpenseScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddExpense'>;

type Props = {
  navigation: AddExpenseScreenNavigationProp;
};

const AddExpenseScreen: React.FC<Props> = ({ navigation }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'earn' | 'used' | 'default'>('default');
  const { username } = useAuth();
  const { addExpense } = useExpenseContext();

  const handleAddExpense = () => {
    if (type === 'default') {
      Alert.alert('Error', 'Please select a type (Earn or Used)');
      return;
    }

    const amountFloat = parseFloat(amount);

    if (isNaN(amountFloat)) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    addExpenseToDB(username, description, amountFloat, type, (success) => {
      if (success) {
        const newExpense: Expense = {
          id: new Date().toISOString(),
          description,
          amount: amountFloat,
          type,
        };

        addExpense(newExpense);

        Alert.alert(
          'Success',
          'Transaction added successfully!',
          [{ text: 'OK', onPress: () => navigation.goBack() }],
        );
      } else {
        Alert.alert('Error', 'Failed to add transaction');
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Transaction $$$</Text>
      <View style={styles.amountContainer}>
        <TextInput
          style={styles.input}
          placeholder="Transaction Name"
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.currency}>RM</Text>
        <TextInput
          style={styles.amountInput}
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <Picker
          selectedValue={type}
          onValueChange={(itemValue) => setType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Type" value="default" />
          <Picker.Item label="Received" value="earn" />
          <Picker.Item label="Used" value="used" />
        </Picker>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAddExpense}>
          <Text style={styles.buttonText}>Add Transaction</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddExpenseScreen;
