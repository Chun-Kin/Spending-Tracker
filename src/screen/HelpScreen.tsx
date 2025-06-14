import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/HelpScreenStyles'; // Import the styles

const HelpScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help</Text>
      <Text style={styles.content}>
        If you need assistance with using the app, please refer to our user guide or contact support at support@cincaispendingtracker.com.
      </Text>
      <Text style={styles.content}>
        To add a new expense, navigate to the "Add Expense" section from the main menu. Enter the description, amount, and select whether it’s an income or expense. Tap "Add Expense" to save your entry.
      </Text>
      <Text style={styles.content}>
        For further help, call Lim Jun Hau or go to his house.
      </Text>
    </View>
  );
};

export default HelpScreen;
