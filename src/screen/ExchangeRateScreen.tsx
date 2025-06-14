import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ExchangeRateScreen = () => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [rate, setRate] = useState<number | null>(null);
  const [amount, setAmount] = useState('1');  // Default input value is '1'
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  const API_KEY = 'b19f5e509d36a12c639b0ebd';  // Replace with your actual API key

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`);
        const data = await response.json();
        
        if (data.conversion_rates) {
          setExchangeRates(data.conversion_rates);
          setRate(data.conversion_rates[targetCurrency]);
        } else {
          console.error('Error: conversion_rates not found in API response', data);
        }
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchExchangeRate();
  }, [baseCurrency, targetCurrency]);

  useEffect(() => {
    // Calculate the converted amount whenever the rate or amount changes
    if (rate && amount) {
      setConvertedAmount(parseFloat(amount) * rate); // No formatting, keeps the full precision
    }
  }, [rate, amount]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Exchange Rate Converter</Text>
      
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Base Currency: </Text>
        <Picker
          selectedValue={baseCurrency}
          style={styles.picker}
          onValueChange={(itemValue) => setBaseCurrency(itemValue)}
        >
          {Object.keys(exchangeRates).length > 0 ? (
            Object.keys(exchangeRates).map((currency) => (
              <Picker.Item key={currency} label={currency} value={currency} />
            ))
          ) : (
            <Picker.Item label="Loading..." value="loading" />
          )}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Target Currency: </Text>
        <Picker
          selectedValue={targetCurrency}
          style={styles.picker}
          onValueChange={(itemValue) => setTargetCurrency(itemValue)}
        >
          {Object.keys(exchangeRates).length > 0 ? (
            Object.keys(exchangeRates).map((currency) => (
              <Picker.Item key={currency} label={currency} value={currency} />
            ))
          ) : (
            <Picker.Item label="Loading..." value="loading" />
          )}
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Amount in {baseCurrency}: </Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />
      </View>

      {rate && (
        <Text style={styles.rate}>
          1 {baseCurrency} = {rate} {targetCurrency}
        </Text>
      )}

      {convertedAmount && (
        <Text style={styles.converted}>
          {amount} {baseCurrency} = {convertedAmount} {targetCurrency}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#ffe5e9', // Light pink background
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#ff69b4', // Hot pink header text
  },
  pickerContainer: {
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#ffc0cb', // Light pink picker background
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#ff69b4', // Hot pink label text
  },
  input: {
    height: 40,
    borderColor: '#ff69b4', // Hot pink border
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#ffe5e9', // Light pink input background
  },
  rate: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#ff69b4', // Hot pink rate text
  },
  converted: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    color: '#ff69b4', // Hot pink converted amount text
  },
});

export default ExchangeRateScreen;
