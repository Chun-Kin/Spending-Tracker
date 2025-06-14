import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import styles from '../styles/AdminHomeScreenStyles'; 
import { backupDatabase, restoreDatabase } from '../database/filedatabase'; // Import your backup/restore functions

const AdminHomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { username } = useAuth(); // Access username from context

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleGoToDatabase = () => {
    navigation.navigate('CheckDatabaseScreen');
  };

  const handleGoToViewFeedback = () => {
    navigation.navigate('ViewFeedbackScreen');
  };

  const handleBackupDatabase = async () => {
    try {
      await backupDatabase();
      Alert.alert('Success', 'Database backup completed successfully.');
    } catch (error) {
      Alert.alert('Error', 'Failed to backup the database.');
    }
  };

  const handleRestoreDatabase = async () => {
    try {
      await restoreDatabase();
      Alert.alert('Success', 'Database restore completed successfully.');
    } catch (error) {
      Alert.alert('Error', 'Failed to restore the database.');
    }
  };

  return (
    <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome {username.toUpperCase()}</Text>
        {username === 'admin' && (
          <>
            <TouchableOpacity style={styles.button} onPress={handleGoToDatabase}>
              <Text style={styles.buttonText}>Go to Check Database</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleGoToViewFeedback}>
              <Text style={styles.buttonText}>View Feedback</Text>
            </TouchableOpacity>
            {/* Backup and Restore buttons for admin */}
            <TouchableOpacity style={styles.button} onPress={handleBackupDatabase}>
              <Text style={styles.buttonText}>Backup Database</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleRestoreDatabase}>
              <Text style={styles.buttonText}>Restore Database</Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default AdminHomeScreen;
