import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


export default function OTPPage({ route, navigation }) {
  const { phone, isNewUser } = route.params;
  const [code, setCode] = useState('');
  const [confirm, setConfirm] = useState(null);


  useEffect(() => {
    sendOtp();
  }, []);

  const sendOtp = async () => {
    try {
      console.log('Sending OTP to:', phone);
      const confirmation = await auth().signInWithPhoneNumber(phone);
      setConfirm(confirmation);
      console.log('OTP sent successfully');
    } catch (error) {
      console.error('Error sending OTP:', error);
      
      // Enhanced error handling for specific cases
      if (error.code === 'auth/invalid-phone-number') {
        Alert.alert('Error', 'Invalid phone number. Please check and try again.');
      } else if (error.code === 'auth/too-many-requests') {
        Alert.alert('Error', 'Too many requests. Please try again later.');
      } else {
        Alert.alert('Error', `Could not send OTP: ${error.message}`);
      }
    }
  };

  const verifyOtp = async () => {
    if (!confirm || !code) {
        Alert.alert('Error', 'Please enter a valid OTP.');
        return;
    }

    try {
        console.log('Verifying OTP:', code);
        const credential = await confirm.confirm(code);
        console.log('OTP verified successfully:', credential);

        const isNewUser = credential.additionalUserInfo.isNewUser;
        const user = credential.user;
        if (!user) throw new Error('User object not found after OTP verification');

        if (isNewUser) {
            const userPhoneNumber = JSON.parse(await AsyncStorage.getItem('userPhoneNumber'));
            const userLocation = JSON.parse(await AsyncStorage.getItem('userLocation'));
            const userAddress = JSON.parse(await AsyncStorage.getItem('userAddress'));

            if (!userPhoneNumber || !userLocation || !userAddress) {
                throw new Error('User data, location, or address not found in AsyncStorage');
            }

            // Prepare the data for MongoDB
            const dataToSave = {
                name: 'New User',
                phoneNumber: userPhoneNumber,
                location: {
                    type: 'Point',
                    coordinates: userLocation,
                },
                address: userAddress,
                notifyThroughSMS: false,
            };

            // Save the data to MongoDB using the backend API
            await axios.post('http://192.168.85.195:5000/api/users', userData);
            console.log('New user data saved to MongoDB', userData);
            Alert.alert('Success', 'User registered successfully.');
        }

        await AsyncStorage.setItem('userToken', user.uid);
        console.log('User logged in, token saved:', user.uid);
        navigation.navigate('HomeMain');

    } catch (error) {
        console.log('Error verifying OTP:', error);
        Alert.alert('Error', error.message || 'Invalid OTP. Please try again.');
    }
};

  
  
  

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
        Enter OTP
      </Text>

      <TextInput
        style={{
          height: 50,
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 10,
          paddingHorizontal: 15,
          marginTop: 20,
          backgroundColor: '#FFF',
        }}
        placeholder="Enter OTP"
        keyboardType="number-pad"
        value={code}
        onChangeText={setCode}
      />

      <TouchableOpacity
        style={{
          backgroundColor: "#0A477F",
          padding: 15,
          borderRadius: 10,
          marginTop: 20,
        }}
        onPress={verifyOtp} // Call OTP verification
      >
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: 16 }}>
          Verify OTP
        </Text>
      </TouchableOpacity>
    </View>
  );
}
