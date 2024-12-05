import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const VolunteerRegistration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [aadharCard, setAadharCard] = useState(null);

  const handleUploadAadhar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setAadharCard(result.uri);
    }
  };

  const handleSubmit = () => {
    Alert.alert('Registration Successful', `Name: ${name}, Email: ${email}, Phone: ${phone}, Address: ${address}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          {/* Header with Logo, Address, and Icons */}
          
          {/* <View style={styles.header}>
            <Image source={require('../../assets/logo.jpg')} style={styles.logo} />
            <Text style={styles.address}>User Address</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity>
                <AntDesign name="notification" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialCommunityIcons name="google-translate" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialCommunityIcons name="account-circle" size={32} color="black" />
              </TouchableOpacity>
            </View>
          </View> */}

          {/* Registration Form */}
          <View style={styles.formContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
            />

            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />

            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Enter your address"
            />

            <Text style={styles.label}>Upload Aadhar Card</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={handleUploadAadhar}>
              <Text style={styles.uploadButtonText}>{aadharCard ? 'Aadhar Uploaded' : 'Upload Aadhar Card'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8', // Light background color for contrast
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 2,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  address: {
    flex: 1,
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 10,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    margin: 15,
    flex: 1,
    justifyContent: 'flex-start',
  },
  label: {
    marginVertical: 8,
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  uploadButton: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#28A745',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default VolunteerRegistration;
