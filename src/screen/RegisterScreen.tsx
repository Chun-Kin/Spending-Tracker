import React, { useState } from 'react';
import { View, Text, TextInput, ImageBackground, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button as PaperButton } from 'react-native-paper'; // Import only the Button from react-native-paper
import { RootStackParamList } from '../types/types';
import { registerUser } from '../database/database';
import styles from '../styles/RegisterScreenStyles';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Address must contain at least one @ and "."');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match'); //password not the same
    } 
    else if (password.length < 5 || password.length > 20) {
      setConfirmPasswordError('Password must be between 5 and 20 characters');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleRegister = () => {
    if (!emailError && !confirmPasswordError && username && email && password && confirmPassword) {
      registerUser(username, email, password, (success) => {
        if (success) {
          Alert.alert("Registration successful");
          navigation.replace("Login");
        } else {
          Alert.alert("Registration failed");
        }
      });
    } else {
      Alert.alert("Please fill all fields correctly");
    }
  };

  return (
    <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            validateEmail(text);
          }}
          keyboardType='email-address'
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            validatePassword(text, confirmPassword);
          }}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            validatePassword(password, text);
          }}
          secureTextEntry
        />
        {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
        <PaperButton mode="contained" onPress={handleRegister} style={styles.button}>
          Register
        </PaperButton>
        <Text style={styles.text1}>
          Already have an account?{' '}
          <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
            Click here to login
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

export default RegisterScreen;
