import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import ExpenseHistoryScreen from '../screen/ExpenseHistoryScreen';
import HelpScreen from '../screen/HelpScreen';
import TermsConditionsScreen from '../screen/TermsConditionsScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';
import BottomTabNavigator from './BottomTabNavigator';
import { RootDrawerParamList, Expense } from '../types/types';
import BusinessNewsScreen from '../screen/BusinessNewsScreen';
import ExchangeRateScreen from '../screen/ExchangeRateScreen';
import CryptoTrackerScreen from '../screen/CryptoTrackerScreen';
import FeedbackScreen from '../screen/FeedbackScreen'; // Import FeedbackScreen

const Drawer = createDrawerNavigator<RootDrawerParamList>();

interface DrawerNavigatorProps {
  expenseData: Expense[];
  onExpenseAdded: (expense: Expense) => void;
  onDeleteExpense: (id: string) => void;
}

const DrawerNavigator: React.FC<DrawerNavigatorProps> = ({ expenseData, onExpenseAdded, onDeleteExpense }) => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeDrawer"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="HomeDrawer"
        options={{
          title: 'Cincai Spending Tracker',
          drawerIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      >
        {() => (
          <BottomTabNavigator
            expenseData={expenseData}
            onExpenseAdded={onExpenseAdded}
            onDeleteExpense={onDeleteExpense}
          />
        )}
      </Drawer.Screen>
      
      {/* Existing Screens */}
      <Drawer.Screen
        name="ExpenseHistory"
        component={ExpenseHistoryScreen}
        options={{
          title: 'Expense History',
          drawerIcon: ({ color, size }) => (
            <Icon name="time-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Help"
        component={HelpScreen}
        options={{
          title: 'Help',
          drawerIcon: ({ color, size }) => (
            <Icon name="help-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="TermsConditions"
        component={TermsConditionsScreen}
        options={{
          title: 'Terms & Conditions',
          drawerIcon: ({ color, size }) => (
            <Icon name="document-text-outline" color={color} size={size} />
          ),
        }}
      />

      {/* New Screens */}
      <Drawer.Screen
        name="BusinessNews"
        component={BusinessNewsScreen}
        options={{
          title: 'Business News',
          drawerIcon: ({ color, size }) => (
            <Icon name="newspaper-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="ExchangeRate"
        component={ExchangeRateScreen}
        options={{
          title: 'Exchange Rate',
          drawerIcon: ({ color, size }) => (
            <Icon name="cash-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="CryptoTracker"
        component={CryptoTrackerScreen}
        options={{
          title: 'Crypto Tracker',
          drawerIcon: ({ color, size }) => (
            <Icon name="logo-bitcoin" color={color} size={size} />
          ),
        }}
      />
      {/* Added Feedback Screen */}
      <Drawer.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{
          title: 'Feedback',
          drawerIcon: ({ color, size }) => (
            <Icon name="chatbubble-outline" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
