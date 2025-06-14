import React from 'react';
import { View, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import { saveProfilePic } from '../database/database';
import { useAuth } from '../context/AuthContext'; 
import { useProfilePic } from '../context/ProfilePicContext'; 
import styles from '../styles/ProfilePictureSelectionScreen'; 

type ProfilePictureSelectionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfilePictureSelection'>;

const profilePics = [
  require('../../assets/images/profile_pic1.png'),
  require('../../assets/images/profile_pic2.png'),
  require('../../assets/images/profile_pic3.png'),
  require('../../assets/images/profile_pic4.png'),
  require('../../assets/images/profile_pic5.png'),
  require('../../assets/images/profile_pic6.png'),
  require('../../assets/images/profile_pic7.png'),
  require('../../assets/images/profile_pic8.png'),
  require('../../assets/images/profile_pic9.png'),
  require('../../assets/images/profile_pic10.png'),
];

const ProfilePictureSelectionScreen: React.FC<{ navigation: ProfilePictureSelectionScreenNavigationProp }> = ({ navigation }) => {
  const { selectedPic, setSelectedPic } = useProfilePic(); // Use the custom hook to get and set the selected profile picture
  const { username } = useAuth(); // Get the username from AuthContext

  const handleSelect = (image: any) => {
    setSelectedPic(image); // Set the selected profile picture
  };

  const handleConfirm = () => {
    if (username && selectedPic) {
      saveProfilePic(username, selectedPic, (success) => {
        if (success) {
          navigation.goBack(); // Navigate back if the profile picture is successfully saved
        } else {
          console.log('Failed to save profile picture');
        }
      });
    } else {
      console.log('Username or selected picture is missing');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.picsContainer}>
        {profilePics.map((pic, index) => (
          <TouchableOpacity key={index} onPress={() => handleSelect(pic)}>
            <Image
              source={pic}
              style={[styles.profilePic, selectedPic === pic && styles.selected]} // Apply styles
            />
          </TouchableOpacity>
        ))}
      </View>
      <Button title="Confirm" onPress={handleConfirm} />
    </View>
  );
};

export default ProfilePictureSelectionScreen;
