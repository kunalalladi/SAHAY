import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const HeatwaveScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Heatwave</Text>
      <ScrollView style={styles.infoBox}>
        <Text style={styles.infoText}>
          A heatwave is an extended period of excessively hot weather, which may be accompanied by high humidity. Heatwaves occur when high pressure in the atmosphere pushes warm air towards the ground, trapping it and creating a cycle of rising temperatures. They can pose serious health risks and impact infrastructure, agriculture, and water resources.
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

export default HeatwaveScreen;