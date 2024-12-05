import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const MapsScreen = () => {
  const navigation = useNavigation();
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const GOOGLE_PLACES_API_KEY = 'AIzaSyAbsiiK3o8h33gL4kT-Tnn_gLL8aTr2ezw'; 

  // Load saved location from AsyncStorage
  useEffect(() => {
    const loadSavedLocation = async () => {
      try {
        const savedLocation = await AsyncStorage.getItem('userLocation');
        if (savedLocation) {
          const { latitude, longitude } = JSON.parse(savedLocation);
          setRegion({ latitude, longitude, latitudeDelta: 0.015, longitudeDelta: 0.0121 });
        }
      } catch (error) {
        console.error('Failed to load location from AsyncStorage', error);
      }
    };
    loadSavedLocation();
  }, []);

  const fetchLocationSuggestions = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${GOOGLE_PLACES_API_KEY}&types=geocode&language=en`;
    try {
      const response = await axios.get(url);
      setSuggestions(response.data.predictions);
    } catch (err) {
      console.error('Error fetching suggestions', err);
    }
  };

  const handleAddressInputChange = (input) => {
    setAddress(input);
    fetchLocationSuggestions(input);
  };

  const handleSuggestionPress = async (placeId) => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_PLACES_API_KEY}`;
    try {
      const response = await axios.get(url);
      const { lat, lng } = response.data.result.geometry.location;
      setRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
      setSuggestions([]);
      setAddress(response.data.result.formatted_address);
    } catch (err) {
      console.error('Error fetching place details', err);
    }
  };

  const handleCurrentLocation = async () => {
    try {
      const servicesEnabled = await Location.hasServicesEnabledAsync();
      if (!servicesEnabled) {
        Alert.alert('Location services are disabled. Please enable them in settings.');
        return;
      }
  
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
  
      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const { latitude, longitude } = location.coords;

      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });

      const address = await getAddressFromCoordinates(latitude, longitude);
      setAddress(address);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not fetch location.');
    }
  };

  const getAddressFromCoordinates = async (latitude, longitude) => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_PLACES_API_KEY}`);
    const data = await response.json();
    return data.results.length > 0 ? data.results[0].formatted_address : 'Location not found';
  };

  const handleConfirmLocation = async () => {
    try {
      const locationToStore = {
        latitude: region.latitude,
        longitude: region.longitude,
      };
      await AsyncStorage.setItem('userLocation', JSON.stringify(locationToStore));
      Alert.alert('Success', 'Location confirmed and saved successfully!');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Failed to save location to AsyncStorage', error);
      Alert.alert('Error', 'Failed to save location.');
    }
  };

  return (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, gap: 10 }}>
      <View style={{ flex: 1 }}>
        <MapView provider={PROVIDER_GOOGLE} style={{ flex: 1 }} region={region}>
          <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
        </MapView>
        
        <View style={styles.inputContainer}>
          <TextInput
            value={address}
            onChangeText={handleAddressInputChange}
            placeholder="Enter location"
            style={styles.textInput}
          />
          {suggestions.length > 0 && (
            <FlatList
              data={suggestions}
              keyExtractor={(item) => item.place_id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSuggestionPress(item.place_id)}>
                  <Text style={styles.suggestionText}>{item.description}</Text>
                </TouchableOpacity>
              )}
              style={styles.suggestionsList}
            />
          )}
        </View>
      </View>

      <TouchableOpacity style={styles.currentLocationButton} onPress={handleCurrentLocation}>
        <MaterialIcons name="my-location" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmLocation}>
        <Text style={styles.buttonText}>Confirm Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: 'absolute',
    top: 30,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  suggestionsList: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  suggestionText: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  currentLocationButton: {
    position: 'absolute',
    bottom: '40%',
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: '#0A477F',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  confirmButton: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
    backgroundColor: '#0A477F',
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MapsScreen;
