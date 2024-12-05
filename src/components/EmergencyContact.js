import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';


const EmergencyContactScreen = ({ navigation }) => {
  

  const emergencyContacts = [
    {
      id: 1,
      category: 'Medical Emergency',
      contacts: [
        { title: 'Ambulance', number: '108', icon: 'ambulance' },
        { title: 'Medical Helpline', number: '104', icon: 'hospital' }
      ]
    },
    {
      id: 2,
      category: 'Disaster Management',
      contacts: [
        { title: 'National Emergency', number: '112', icon: 'exclamation-triangle' },
        { title: 'Disaster Management', number: '1070', icon: 'shield-alt' }
      ]
    },
    {
      id: 3,
      category: 'Fire & Rescue',
      contacts: [
        { title: 'Fire Emergency', number: '101', icon: 'fire' },
        { title: 'Search & Rescue', number: '1072', icon: 'hands-helping' }
      ]
    },
    {
      id: 4,
      category: 'Law Enforcement',
      contacts: [
        { title: 'Police', number: '100', icon: 'shield-alt' },
        { title: 'Women Helpline', number: '1091', icon: 'female' }
      ]
    }
  ];

  const handleCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#0A477F', '#1565C0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emergency Contacts</Text>
      </LinearGradient>

      {/* Emergency Message */}
      <View style={styles.emergencyMessage}>
        <MaterialIcons name="error-outline" size={24} color="#ff1744" />
        <Text style={styles.emergencyText}>
          For immediate assistance, tap on any number to call
        </Text>
      </View>

      {/* Contacts List */}
      <ScrollView style={styles.scrollView}>
        {emergencyContacts.map((section) => (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.category}</Text>
            <View style={styles.contactsGrid}>
              {section.contacts.map((contact, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.contactCard}
                  onPress={() => handleCall(contact.number)}
                >
                  <LinearGradient
                    colors={['#ffffff', '#f5f5f5']}
                    style={styles.cardGradient}
                  >
                    <View style={styles.iconContainer}>
                      <FontAwesome5 name={contact.icon} size={24} color="#0A477F" />
                    </View>
                    <Text style={styles.contactTitle}>{contact.title}</Text>
                    <Text style={styles.contactNumber}>{contact.number}</Text>
                    <View style={styles.callButton}>
                      <MaterialIcons name="phone" size={20} color="#0A477F" />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  emergencyMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#ff1744',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  emergencyText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0A477F',
    marginBottom: 16,
  },
  contactsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  contactCard: {
    width: '47%',
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardGradient: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(26, 35, 126, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  contactNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A477F',
    marginBottom: 12,
  },
  callButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(26, 35, 126, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default EmergencyContactScreen;