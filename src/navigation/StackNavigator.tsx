import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screen/LoginScreen';
import RegisterScreen from '../screen/RegisterScreen';
import ProfileScreen from '../screen/ProfileScreen';
import ProfilePictureSelectionScreen from '../screen/ProfilePictureSelectionScreen';
import DrawerNavigator from './DrawerNavigator';
import AdminHomeScreen from '../screen/AdminHomeScreen';
import CheckDatabaseScreen from '../screen/CheckDatabaseScreen';
import ViewFeedbackScreen from '../screen/ViewFeedbackScreen'; 
import { RootStackParamList, Expense } from '../types/types';
import { useAuth } from '../context/AuthContext';

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const { isAuthenticated, username } = useAuth();

  const handleExpenseAdded = (expense: Expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prevExpenses) => prevExpenses.filter(expense => expense.id !== id));
  };

  const getInitialRouteName = () => {
    if (isAuthenticated) {
      if (username === 'admin') {
        return 'AdminHomeScreen';
      } else {
        return 'Drawer';
      }
    } else {
      return 'Login';
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={getInitialRouteName()} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Drawer">
          {() => (
            <DrawerNavigator
              expenseData={expenses}
              onExpenseAdded={handleExpenseAdded}
              onDeleteExpense={handleDeleteExpense}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="ProfilePictureSelection" component={ProfilePictureSelectionScreen} />
        <Stack.Screen name="AdminHomeScreen" component={AdminHomeScreen} />
        <Stack.Screen name="CheckDatabaseScreen" component={CheckDatabaseScreen} />
        <Stack.Screen name="ViewFeedbackScreen" component={ViewFeedbackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
