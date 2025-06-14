// src/components/BusinessNews.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Linking, StyleSheet, TouchableOpacity } from 'react-native';

const BusinessNewsScreen: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  
  const apiKey = 'ba0169b96add43dfa99bba315619e932'; // Your API key
  const pageSize = 20; // Number of articles to fetch

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?category=business&pageSize=${pageSize}&apiKey=${apiKey}`);
        const data = await response.json();

        if (response.ok) {
          setArticles(data.articles);
          setError('');
        } else {
          setError(`Error: ${data.message}`);
        }
      } catch (err) {
        setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    };

    fetchNews();
  }, [apiKey, pageSize]);

  const handlePress = (url: string) => {
    Linking.openURL(url);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.articleContainer}>
      <TouchableOpacity onPress={() => handlePress(item.url)}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Business News</Text>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={articles}
          renderItem={renderItem}
          keyExtractor={(item) => item.url}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,  // Ensures the container takes up the full screen
    padding: 16,
    backgroundColor: '#FDECF5', // Light pink background
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#E91E63', // Pink color for header text
  },
  articleContainer: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF', // White background for articles
    padding: 12,
    borderRadius: 8,
    shadowColor: '#E91E63', // Pink shadow for articles
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2, // For Android shadow effect
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E91E63', // Pink color for titles
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  error: {
    color: 'red',
  },
  list: {
    // Empty or minimal styling for the FlatList content
  },
});

export default BusinessNewsScreen;
