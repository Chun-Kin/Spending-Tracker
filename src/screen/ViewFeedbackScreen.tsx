import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ViewFeedbackScreen: React.FC = ({ navigation }: any) => {
  const [feedback, setFeedback] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      console.log('Starting fetchFeedback function...');
      try {
        const storedFeedback = await AsyncStorage.getItem('feedback');
        console.log('Retrieved feedback from AsyncStorage:', storedFeedback);

        if (storedFeedback) {
          const parsedFeedback = JSON.parse(storedFeedback);
          console.log('Parsed feedback:', parsedFeedback);

          if (Array.isArray(parsedFeedback)) {
            setFeedback(parsedFeedback);
          } else {
            console.warn('Stored feedback is not an array.');
          }
        } else {
          console.log('No feedback found in AsyncStorage.');
        }
      } catch (error) {
        console.error('Failed to fetch feedback:', error);
      } finally {
        console.log('fetchFeedback completed');
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const handleDelete = (index: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this feedback?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              // Create a copy of the feedback array and remove the selected item
              const updatedFeedback = [...feedback];
              updatedFeedback.splice(index, 1); // Removes the item at the specified index

              // Update AsyncStorage and state
              await AsyncStorage.setItem('feedback', JSON.stringify(updatedFeedback));
              setFeedback(updatedFeedback);
              console.log('Feedback deleted successfully.');
            } catch (error) {
              console.error('Failed to delete feedback:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading feedback...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#e91e63" />
      </TouchableOpacity>
      <Text style={styles.title}>User Feedback</Text>
      <ScrollView style={styles.feedbackContainer}>
        {feedback.length > 0 ? (
          feedback.map((item, index) => (
            <View key={index} style={styles.feedbackItem}>
              <Text style={styles.feedbackText}>Name: {item.name}</Text>
              <Text style={styles.feedbackText}>Feedback: {item.feedback}</Text>
              <Text style={styles.feedbackText}>Date: {item.date}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(index)}
              >
                <Ionicons name="trash" size={20} color="#e91e63" />
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.feedbackText}>No feedback available.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#e91e63', // Pink color
  },
  goBackButton: {
    marginBottom: 15,
  },
  feedbackContainer: {
    flex: 1,
  },
  feedbackItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#fce4ec', // Light pink background
    borderRadius: 5,
  },
  feedbackText: {
    fontSize: 16,
    color: '#333',
  },
  deleteButton: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#e91e63', // Pink color
    marginLeft: 5,
  },
});

export default ViewFeedbackScreen;