import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

const SafeTipsScreen = () => {
  const navigation = useNavigation();

  const safetyTips = [
    {
      icon: 'alert-circle',
      title: 'Stay Informed',
      description: 'Monitor local news and emergency alerts to stay aware of developing situations.',
      color: '#4A90E2'
    },
    {
      icon: 'home',
      title: 'Secure Your Home',
      description: 'Board up windows, secure loose outdoor items, and maintain an emergency supply kit ready.',
      color: '#50C878'
    },
    {
      icon: 'people',
      title: 'Family Communication',
      description: 'Establish meeting points and maintain regular check-ins with family members.',
      color: '#FF6B6B'
    },
    {
      icon: 'medical',
      title: 'Emergency Medical Kit',
      description: 'Keep a well-stocked first aid kit and know basic medical procedures.',
      color: '#FFB366'
    },
    {
      icon: 'water',
      title: 'Water Supply',
      description: 'Store at least 1 gallon of water per person per day for at least 3 days.',
      color: '#40E0D0'
    },
    {
      icon: 'battery-full',
      title: 'Power Backup',
      description: 'Keep portable chargers and batteries ready for essential devices.',
      color: '#9B59B6'
    },
    {
      icon: 'document-text',
      title: 'Important Documents',
      description: 'Store copies of vital documents in a waterproof container.',
      color: '#E67E22'
    },
    {
      icon: 'car',
      title: 'Evacuation Plan',
      description: 'Have multiple evacuation routes planned and keep your vehicle fueled.',
      color: '#2C3E50'
    },
    {
      icon: 'shield',
      title: 'Personal Safety Equipment',
      description: 'Wear appropriate gear like helmets, gloves, or goggles while engaging in risk-prone activities.',
      color: '#FFD700'  // Gold
    },
    {
        icon: 'flame',
        title: 'Fire Extinguisher',
        description: 'Ensure you have a working fire extinguisher accessible in case of fire emergencies.',
        color: '#FF4500'  // OrangeRed
    },
    {
        icon: 'flashlight',
        title: 'Emergency Light',
        description: 'Have flashlights ready with extra batteries to navigate in case of power outages.',
        color: '#FF7F50'  // Coral
    },
    {
        icon: 'call',
        title: 'Emergency Contacts',
        description: 'Prepare a list of important emergency phone numbers including local police, fire department, and close contacts.',
        color: '#6495ED'  // CornflowerBlue
    },
    {
        icon: 'cloud',
        title: 'Weather Monitoring',
        description: 'Use weather apps to monitor conditions and alerts, particularly during severe weather seasons.',
        color: '#9370DB'  // MediumPurple
    },
    {
        icon: 'compass',
        title: 'Navigation Tools',
        description: 'Keep a physical map and compass as backup navigation tools in case of technology failure.',
        color: '#FFB300'  // Amber
    },
    {
        icon: 'bulb',
        title: 'Safety Drills',
        description: 'Conduct regular safety drills to ensure everyone knows what to do in an emergency.',
        color: '#FFEA00'  // Bright Yellow
    },
    {
        icon: 'medkit',
        title: 'First Aid Training',
        description: 'Enroll in first aid and CPR courses to be prepared for medical emergencies.',
        color: '#28B463'  // Green
    },
    {
        icon: 'checkmark-circle',
        title: 'Routine Checks',
        description: 'Regularly check smoke detectors and carbon monoxide alarms to ensure they are functional.',
        color: '#E74C3C'  // Red
    },
    {
        icon: 'umbrella',
        title: 'Severe Weather Preparedness',
        description: 'Have a plan in place for severe weather events, including shelter locations and supplies.',
        color: '#3498DB'  // Light Blue
    }
  ];

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.mainTitle}>Safety Tips</Text>
          <Text style={styles.subtitle}>Stay prepared, stay safe</Text>
        </View>

        {/* Featured Tip */}
        <View style={styles.featuredCard}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.featuredGradient}
          >
            <View style={styles.featuredContent}>
              <Ionicons name="shield-checkmark" size={40} color="#fff" />
              <Text style={styles.featuredTitle}>Emergency Preparedness</Text>
              <Text style={styles.featuredDescription}>
                Being prepared is your best defense against any emergency
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* Tips Grid */}
        <View style={styles.tipsContainer}>
          {safetyTips.map((tip, index) => (
            <View key={index} style={styles.tipCard}>
              <View style={[styles.iconContainer, { backgroundColor: `${tip.color}15` }]}>
                <Ionicons name={tip.icon} size={28} color={tip.color} />
              </View>
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <Text style={styles.tipDescription}>{tip.description}</Text>
            </View>
          ))}
        </View>

        {/* Emergency Contact Button */}
        <TouchableOpacity style={styles.emergencyButton}>
          <LinearGradient
            colors={['#FF6B6B', '#FF8E8E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.emergencyGradient}
          >
            <Ionicons name="call-outline" size={24} color="#fff" />
            <Text style={styles.emergencyText}>Emergency Contact</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 28,
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroSection: {
    padding: 24,
    paddingTop: 40,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    letterSpacing: 0.5,
  },
  featuredCard: {
    margin: 16,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  featuredGradient: {
    padding: 24,
  },
  featuredContent: {
    alignItems: 'center',
    padding: 16,
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  featuredDescription: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  tipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    justifyContent: 'space-between',
  },
  tipCard: {
    width: cardWidth,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  tipTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  tipDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  emergencyButton: {
    margin: 16,
    marginTop: 8,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  emergencyGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  emergencyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default SafeTipsScreen;