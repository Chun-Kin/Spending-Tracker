import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EXCHANGE_RATE_API_URL = 'https://v6.exchangerate-api.com/v6/b19f5e509d36a12c639b0ebd/latest/USD';  // Replace with your API key

const CryptoTracker = () => {
  const [btcPriceUSD, setBtcPriceUSD] = useState<number | null>(null);  // BTC price in USD
  const [btcPriceMYR, setBtcPriceMYR] = useState<number | null>(null);  // BTC price in MYR
  const [usdToMyrRate, setUsdToMyrRate] = useState<number | null>(null);  // USD to MYR exchange rate
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the exchange rate from USD to MYR
    fetch(EXCHANGE_RATE_API_URL)
      .then(response => response.json())
      .then(data => {
        if (data.conversion_rates) {
          setUsdToMyrRate(data.conversion_rates.MYR);
        }
      })
      .catch(err => setError('Error fetching exchange rate: ' + err.message));

    // Connect to Binance WebSocket for real-time BTC/USDT price updates
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const priceUSD = parseFloat(message.p);
      setBtcPriceUSD(priceUSD);

      // Convert to MYR if exchange rate is available
      if (usdToMyrRate) {
        setBtcPriceMYR(priceUSD * usdToMyrRate);
      }
    };

    // Cleanup on component unmount
    return () => ws.close();
  }, [usdToMyrRate]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Real-Time BTC Price</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      {btcPriceMYR !== null ? (
        <Text style={styles.price}>BTC Price in MYR: RM {btcPriceMYR.toFixed(2)}</Text>
      ) : (
        <Text style={styles.loading}>Loading price...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffeef2', // Light pink background
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#d74b6b', // Pinkish color for the header text
  },
  error: {
    color: '#e74c3c', // Red for error messages
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#d74b6b', // Pinkish color for the price text
  },
  loading: {
    fontSize: 18,
    color: '#a3a3a3', // Gray for loading state
  },
});

export default CryptoTracker;
