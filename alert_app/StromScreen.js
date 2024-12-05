import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const StormScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Storm</Text>
      <ScrollView style={styles.infoBox}>
        <Text style={styles.infoText}>
          Storms are violent disturbances in the atmosphere that bring about strong winds, rain, lightning, and thunder. They form due to varying pressures and temperatures in the air. Storms can vary in size and impact, with some causing severe destruction and others merely bringing showers.
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

export default StormScreen;