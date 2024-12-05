import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const FloodScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flood</Text>
      <ScrollView style={styles.infoBox}>
        <Text style={styles.infoText}>
          Flooding is an overflow of water that submerges land that is usually dry. It occurs due to excessive rainfall, rivers overflowing, storm surges, or melting snow. Floods can cause extensive property damage, disrupt transportation, and impact human lives. Preventive measures and early warnings play a crucial role in reducing the impact of floods.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F0FF',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003366',
    marginVertical: 20,
  },
  infoBox: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    shadowColor: '#003366',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    color: '#4D6A8D',
    lineHeight: 22,
  },
});

export default FloodScreen;