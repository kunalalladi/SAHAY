import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';

const VolunteerRegistrationScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [skills, setSkills] = useState('');
  const [govtProof, setGovtProof] = useState(null);
  const navigation = useNavigation();

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
      if (result.type === 'success') {
        setGovtProof(result);
      } else {
        Alert.alert('File upload cancelled');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while uploading the file.');
    }
  };

  const handleSubmit = () => {
    console.log({ name, email, phone, address, skills, govtProof });
    Alert.alert('Registration Successful', 'Thank you for registering as a volunteer!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.circleButton}>
          <Ionicons name="chevron-back" size={20} color="#0A477F" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Volunteer Registration</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={styles.input}
                value={address}
                onChangeText={setAddress}
                placeholder="Enter your address"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Skills</Text>
              <TextInput
                style={[styles.input, styles.textarea]}
                value={skills}
                onChangeText={setSkills}
                placeholder="Enter your skills"
                multiline
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Upload Government ID Proof</Text>
              <TouchableOpacity
                style={styles.fileInput}
                onPress={handleFileUpload}
              >
                <Ionicons name="cloud-upload" size={24} color="#0A477F" />
                <Text style={styles.fileInputText}>
                  {govtProof ? govtProof.name : 'Choose File'}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6FF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#EFF6FF',
    marginBottom: 10
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginRight: 30
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A477F',
    marginLeft: 12,
    
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  formContainer: {
    marginTop: 8,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  fileInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  fileInputText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#6B7280',
  },
  submitButton: {
    marginTop: 16,
    backgroundColor: '#0A477F',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VolunteerRegistrationScreen;
