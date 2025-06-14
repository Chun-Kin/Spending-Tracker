import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Switch } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import styles from '../styles/ProfileScreenStyles';
import { useProfilePic } from '../context/ProfilePicContext'; // Import the custom hook
import { useAuth } from '../context/AuthContext';
import { fetchProfilePic } from '../database/database';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

const defaultProfilePic = require('../../assets/images/default_profile.png');

const ProfileScreen: React.FC<{ navigation: ProfileScreenNavigationProp }> = ({ navigation }) => {
  const { username } = useAuth();
  
  useEffect(() => {
    if (username) {
      fetchProfilePic(username, (profilePic) => {
        selectedPic(profilePic || defaultProfilePic);
      });
    }
  }, [username]);

  const { selectedPic } = useProfilePic();
  const handleSelectPic = () => {
    navigation.navigate('ProfilePictureSelection');
  };
  
  const [notificationsEnabled, setNotificationsEnabled] = React.useState<boolean>(false);

  return (
    <View style={styles.container}>
      <View style={styles.profilePicContainer}>
        <Image source={selectedPic || defaultProfilePic} style={styles.profilePic} />
      </View>
      <Text style={styles.title}>Profile</Text>
      <TouchableOpacity style={styles.button} onPress={handleSelectPic}>
        <Text style={styles.buttonText}>Select Profile Picture</Text>
      </TouchableOpacity>
      <View style={styles.notificationsContainer}>
        <Text style={styles.notificationsText}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          thumbColor={notificationsEnabled ? '#ff66b2' : '#f4f3f4'}
          trackColor={{ false: '#767577', true: '#ff66b2' }}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;
