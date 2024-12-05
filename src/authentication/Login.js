import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginPage({ navigation }) {
  const [phone, setPhone] = useState("");

  const storeUserData = async (userData) => {
    try {
      await AsyncStorage.setItem('userPhoneNumber', JSON.stringify(userData));
    } catch (e) {
      console.log("Error saving user data", e);
    }
  };

  const checkPhoneNumber = async () => {
    console.log("Checking phone number function called with phone:", phone);
    if (!phone) {
        Alert.alert("Please enter your mobile number");
        return;
    }

    try {
        const phoneWithCountryCode = `+91${phone.trim()}`;
        console.log("Formatted phone number:", phoneWithCountryCode);

        // Send GET request to backend to check if phone number exists
        const response = await axios.get('http://192.168.29.85:5000/api/users/check', {
            params: { phoneNumber: phoneWithCountryCode }
        });

        

        if (response.data.exists) {
            console.log("Existing user found");
            navigation.navigate("OTPPage", { phone: phoneWithCountryCode, isNewUser: false });
        } else {
            console.log("New user registration");
            const newUser = { phone: phoneWithCountryCode };
            await storeUserData(newUser);
            navigation.navigate("OTPPage", { phone: phoneWithCountryCode, isNewUser: true });
        }
    } catch (error) {
        console.log("Error checking phone number:", error);
        Alert.alert("Error", "Something went wrong. Please try again.");
    }
};

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#FFFFFF" }}>
      <Image
        source={require('../../assets/logo.jpg')}
        style={{
          width: "100%",  // Use string for percentage
          height: 150,
          resizeMode: "contain",
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
          marginBottom: 10,
        }}
      />

      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 20,
          marginBottom: 40,
          color: "#333",
        }}
      >
        Login
      </Text>

      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 30,
          color: "#333",
        }}
      >
        Enter your mobile number to login
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <Text
          style={{
            padding: 10,
            borderWidth: 1,
            height: 50,
            borderColor: "#ccc",
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            textAlign: "center",
            backgroundColor: "#EEE",
            width: 60,
            lineHeight: 30,
          }}
        >
          +91
        </Text>
        <TextInput
          style={{
            flex: 1,
            height: 50,
            borderColor: "#ccc",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRadius: 10,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            paddingHorizontal: 15,
            backgroundColor: "#FFF",
          }}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#0A477F",
          padding: 15,
          borderRadius: 10,
          marginTop: 20,
        }}
        onPress={checkPhoneNumber} // Call function to check if phone exists in database
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Log in
        </Text>
      </TouchableOpacity>
    </View>
  );
}
