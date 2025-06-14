import React, { useState } from 'react';
import { View, Text, TextInput, ImageBackground, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button as PaperButton } from 'react-native-paper'; // Import the Button from react-native-paper
import { RootStackParamList } from '../types/types';
import { loginUser } from '../database/database';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import styles from '../styles/LoginScreenStyles';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthenticated } = useAuth(); // Access setAuthenticated from context

  const handleLogin = () => {
    loginUser(username, password, (success, returnedUsername) => {
      if (success && returnedUsername) {
        setAuthenticated(true, returnedUsername);
        if (username === 'admin' && password === 'admin') {
          navigation.navigate('AdminHomeScreen');
        } else {
          navigation.navigate('Drawer');
        }
      } else {
        Alert.alert('Invalid username or password');
      }
    });
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  return (
    <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Cincai Spending Tracker!</Text>
        <Text style={styles.text}>The only app you need to track your spendings!</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <PaperButton mode="contained" onPress={handleLogin} style={styles.button}>
          Login
        </PaperButton>
        <Text style={styles.text1}>
          Don't have an account?{' '}
          <Text style={styles.link} onPress={handleRegisterPress}>
            Click here to register
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
