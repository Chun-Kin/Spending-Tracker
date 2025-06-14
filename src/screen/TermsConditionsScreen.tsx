import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/TermsConditionsScreenStyles'; // Import the styles

const TermsConditionsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Terms and Conditions</Text>
      <Text style={styles.content}>
        By using our app, you agree to the following terms and conditions:
      </Text>
      <Text style={styles.sectionTitle}>Acceptance of Terms</Text>
      <Text style={styles.content}>
        By accessing and using the Cincai Spending Tracker app, you accept and agree to be bound by the terms and conditions of this agreement. If you do not agree to these terms, please refrain from using the app.
      </Text>
      <Text style={styles.sectionTitle}>Privacy Policy</Text>
      <Text style={styles.content}>
        Your privacy is important to us. Please review our Privacy Policy, which governs your use of the app, to understand our practices.
      </Text>
    </View>
  );
};

export default TermsConditionsScreen;
