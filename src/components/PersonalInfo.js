import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PersonalInfoScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    familyMembers: '',
    kids: '',
    seniors: '',
    women: '',
    buildingType: '',
    pets: '',
    medicalNeeds: '',
    mobilityIssues: '',
    emergencyContact: '',
  });

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    console.log('Form data:', formData);
  };

  const renderInput = (placeholder, key, keyboardType = 'default') => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{placeholder}</Text>
      <TextInput
        style={styles.input}
        placeholder={`Enter ${placeholder.toLowerCase()}`}
        placeholderTextColor="#8FA3BF"
        keyboardType={keyboardType}
        value={formData[key]}
        onChangeText={(value) => handleChange(key, value)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.circleButton}
        >
          <Ionicons name="chevron-back" size={24} color="#0A477F" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Family Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.card}>
          <View style={styles.infoContainer}>
            <Ionicons name="information-circle" size={24} color="#0A477F" />
            <Text style={styles.infoText}>
              We are collecting this information to better assist you during disasters. This will help us understand your
              family's specific needs and provide the right assistance quickly.
            </Text>
          </View>

          {renderInput('Number of Family Members', 'familyMembers', 'numeric')}
          {renderInput('Number of Kids', 'kids', 'numeric')}
          {renderInput('Number of People Over 60', 'seniors', 'numeric')}
          {renderInput('Number of Women', 'women', 'numeric')}
          {renderInput('Type of Building', 'buildingType')}
          {renderInput('Number of Pets', 'pets', 'numeric')}
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Medical Needs</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="List any medical conditions (e.g., diabetes, asthma)"
              placeholderTextColor="#8FA3BF"
              multiline
              numberOfLines={3}
              value={formData.medicalNeeds}
              onChangeText={(value) => handleChange('medicalNeeds', value)}
            />
          </View>

          {renderInput('Mobility Issues', 'mobilityIssues')}
          {renderInput('Emergency Contact', 'emergencyContact')}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Save Information</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFF" style={styles.submitIcon} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0A477F',
  },
  scrollView: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: '#E6EEF8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    fontSize: 15,
    color: '#0A477F',
    marginLeft: 12,
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A477F',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F8FF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#0A477F',
    borderWidth: 1,
    borderColor: '#E6EEF8',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#0A477F',
    padding: 18,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  submitIcon: {
    marginLeft: 4,
  },
});

export default PersonalInfoScreen;