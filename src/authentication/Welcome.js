import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const { width: viewportWidth } = Dimensions.get('window'); // Get screen width for responsive design

  const handleEmergencyPress = () => {
    navigation.navigate('HomeMain');
  };

  const handleExplorePress = () => {
    navigation.navigate('Onboarding');
  };

  return (
    <View style={styles.container}>
      {/* Header Section: Logo, Title, and Emoji in a row */}
      <View style={styles.header}>
        <Image source={require('../../assets/logo.jpg')} style={styles.logo} />
        <Text style={styles.welcomeText}>Welcome to Sahay</Text>
        <Text style={styles.waveEmoji}>👋</Text>
      </View>

      {/* Subheading */}
      <Text style={styles.subtitle}>Your Crisis Companion !!!</Text>

      {/* Full-width image */}
      <Image
        source={require('../../assets/intro_page_img_e.png')}
        style={[styles.image, { width: viewportWidth }]} // Full width image
      />

      {/* Help Box */}
      <View style={styles.helpBox}>
        <Text style={styles.helpHeading}>Need help right now?</Text>
        <Text style={styles.helpDescription}>
        Get immediate assistance by tapping "Yes, it's an emergency" or explore the app by selecting "No, I'm good."
        </Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergencyPress}>
            <Text style={styles.buttonText}>Yes, it's an emergency</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exploreButton} onPress={handleExplorePress}>
            <Text style={styles.buttonText}>No, I'm good</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  // Header row: logo, title, and emoji
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    justifyContent: 'flex-start', // Ensures all content aligns to the left
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0A477F',
  },
  waveEmoji: {
    fontSize: 24,
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginVertical: 10,
    
  },
  image: {
    height: "50%", // Set image height to 500
    marginBottom: 10, // Reduce this value to decrease space between image and subheading
    alignSelf: "center",
  },
  helpBox: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  helpHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0A477F',
    marginBottom: 15,
    textAlign: 'justify',
  },
  helpDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 25,
    textAlign: 'justify',
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
  },

  emergencyButton: {
    backgroundColor: '#E63946',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
  },
  exploreButton: {
    backgroundColor: '#0A477F',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
