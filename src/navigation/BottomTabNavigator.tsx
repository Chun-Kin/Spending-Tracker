import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screen/HomeScreen';
import AddExpenseScreen from '../screen/AddExpenseScreen';
import ProfileScreen from '../screen/ProfileScreen';
import { RootTabParamList, Expense } from '../types/types';

const Tab = createBottomTabNavigator<RootTabParamList>();

interface BottomTabNavigatorProps {
  expenseData: Expense[];
  onExpenseAdded: (expense: Expense) => void;
  onDeleteExpense: (id: string) => void;
}

const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({ expenseData, onExpenseAdded, onDeleteExpense }) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'AddExpense') {
            iconName = 'add-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          }

          return <Icon name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: '#2f95dc',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
        },
        tabBarActiveBackgroundColor: 'rgba(47, 149, 220, 0.1)', // Semi-transparent circle
        tabBarItemStyle: {
          borderRadius: 30, // Makes the active tab look like a circle
          margin: 5,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="AddExpense"
        component={AddExpenseScreen}
        options={{
          title: 'Add Transaction',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
