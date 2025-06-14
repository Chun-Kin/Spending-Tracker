import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FeedbackScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSaveFeedback = async () => {
    if (name.trim() === '' || feedback.trim() === '') {
      Alert.alert('Error', 'Please fill out both fields.');
      return;
    }

    const feedbackData = {
      name,
      feedback,
      date: new Date().toISOString(),
    };

    console.log('Saving feedback data:', feedbackData); // Log the feedback data

    try {
      // Retrieve existing feedback data
      const existingFeedback = await AsyncStorage.getItem('feedback');
      console.log('Existing feedback:', existingFeedback); // Log the existing feedback data
      let feedbackList = existingFeedback ? JSON.parse(existingFeedback) : [];

      // Add new feedback to the list
      feedbackList.push(feedbackData);

      console.log('Updated feedback list:', feedbackList); // Log the updated feedback list

      // Save updated feedback list to AsyncStorage
      await AsyncStorage.setItem('feedback', JSON.stringify(feedbackList));

      // Clear input fields
      setName('');
      setFeedback('');

      Alert.alert('Success', 'Feedback submitted successfully!');
    } catch (error) {
      console.error('Error saving feedback:', error);
      Alert.alert('Error', 'Failed to submit feedback.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Feedback</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, styles.feedbackInput]}
        placeholder="Your Feedback"
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />
      <Button 
        title="Submit Feedback" 
        onPress={handleSaveFeedback} 
        color="#e91e63" // Pink color for the button
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fce4ec', // Light pink background for the container
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#e91e63', // Pink color for the title
  },
  input: {
    borderWidth: 1,
    borderColor: '#e91e63', // Pink border for inputs
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
  },
  feedbackInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default FeedbackScreen;
