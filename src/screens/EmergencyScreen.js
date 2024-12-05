// import React, { useRef, useMemo, useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
// import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
// import { MaterialIcons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const GOOGLE_MAPS_API_KEY = 'AIzaSyAbsiiK3o8h33gL4kT-Tnn_gLL8aTr2ezw'; // Your API key

// const EmergencyScreen = () => {
//   const [mapRegion, setMapRegion] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [userLocation, setUserLocation] = useState(null);
//   const [places, setPlaces] = useState([]);
//   const [nearbyPlaces, setNearbyPlaces] = useState([]);
//   const [destination, setDestination] = useState(null);
//   const [routeCoordinates, setRouteCoordinates] = useState([]);
//   const [travelInfo, setTravelInfo] = useState(null);

//   const sheetRef = useRef(null);
//   const mapRef = useRef(null);
//   const snapPoints = useMemo(() => ['40%', '90%'], []);

//   useEffect(() => {
//     getUserLocation();
//     loadExampleNearbyPlaces(); // Load hardcoded nearby places
//   }, []);

  // const getUserLocation = async () => {
  //   try {
  //     const storedLocation = await AsyncStorage.getItem('userLocation');
  //     if (storedLocation) {
  //       const parsedLocation = JSON.parse(storedLocation);
  //       setMapRegion({
  //         latitude: parsedLocation.latitude,
  //         longitude: parsedLocation.longitude,
  //         latitudeDelta: 0.0922,
  //         longitudeDelta: 0.0421,
  //       });
  //       setUserLocation(parsedLocation);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user location:', error);
  //   }
  // };

  // const loadExampleNearbyPlaces = () => {
  //   // Hardcoded example nearby locations
  //   const examplePlaces = [
  //     {
  //       place_id: '1',
  //       name: 'Cafe Mocha',
  //       vicinity: 'Near HITEC City, Hyderabad',
  //       geometry: { location: { lat: 17.4297, lng: 78.5030 } },
  //     },
  //     {
  //       place_id: '2',
  //       name: 'Cyber Towers',
  //       vicinity: 'Madhapur, Hyderabad',
  //       geometry: { location: { lat: 17.450808, lng: 78.381298 } },
  //     },
  //     {
  //       place_id: '3',
  //       name: 'Inorbit Mall',
  //       vicinity: 'Madhapur, Hyderabad',
  //       geometry: { location: { lat: 17.4355, lng: 78.3855 } },
  //     },
  //     {
  //       place_id: '4',
  //       name: 'Shilparamam',
  //       vicinity: 'HITEC City, Hyderabad',
  //       geometry: { location: { lat: 17.4483, lng: 78.4039 } },
  //     },
  //     {
  //       place_id: '5',
  //       name: 'Durgam Cheruvu Lake',
  //       vicinity: 'Jubilee Hills, Hyderabad',
  //       geometry: { location: { lat: 17.4310, lng: 78.4070 } },
  //     },
  //   ];
  //   setNearbyPlaces(examplePlaces);
  // };

//   const calculateRoute = async (destination) => {
//     try {
//       const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
//         params: {
//           origin: `${userLocation.latitude},${userLocation.longitude}`,
//           destination: `${destination.latitude},${destination.longitude}`,
//           key: GOOGLE_MAPS_API_KEY
//         }
//       });
  
//       if (response.data.routes && response.data.routes.length > 0) {
//         const route = response.data.routes[0];
        
//         if (route.overview_polyline) {
//           const points = route.overview_polyline.points;
//           const decodedPoints = decodePolyline(points);
//           setRouteCoordinates(decodedPoints);
//           setTravelInfo(route.legs[0]); // Save travel time and distance if available
//         } else {
//           console.error('Route does not contain overview_polyline.');
//           alert('No route found to the selected location.');
//         }
//       } else {
//         console.error('No routes found in the response.');
//         alert('No route found to the selected location.');
//       }
//     } catch (error) {
//       console.error('Error calculating route:', error);
//     }
//   };
  

//   const decodePolyline = (encoded, precision = 5) => {
//     const coordinates = [];
//     let index = 0, lat = 0, lng = 0;
  
//     while (index < encoded.length) {
//       let b, shift = 0, result = 0;
  
//       do {
//         b = encoded.charCodeAt(index++) - 63;
//         result |= (b & 0x1f) << shift;
//         shift += 5;
//       } while (b >= 0x20);
  
//       const deltaLat = ((result & 1) ? ~(result >> 1) : (result >> 1));
//       lat += deltaLat;
  
//       shift = 0;
//       result = 0;
  
//       do {
//         b = encoded.charCodeAt(index++) - 63;
//         result |= (b & 0x1f) << shift;
//         shift += 5;
//       } while (b >= 0x20);
  
//       const deltaLng = ((result & 1) ? ~(result >> 1) : (result >> 1));
//       lng += deltaLng;
  
//       coordinates.push({
//         latitude: lat / Math.pow(10, precision),
//         longitude: lng / Math.pow(10, precision)
//       });
//     }
  
//     return coordinates;
//   };
  

//   const renderContent = () => (
//     <View style={styles.bottomSheetContent}>
//       <View style={styles.searchContainer}>
//         <MaterialIcons name="search" size={24} color="#666" style={styles.searchIcon} />
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search destination"
//           value={searchQuery}
//           onChangeText={(text) => setSearchQuery(text)}
//         />
//       </View>

//       <BottomSheetScrollView>
//         <Text style={styles.sectionTitle}>Nearby Places</Text>
//         {nearbyPlaces.map((place) => (
//           <TouchableOpacity 
//             key={place.place_id}
//             style={styles.placeItem}
//             onPress={() => {
//               setDestination({
//                 latitude: place.geometry.location.lat,
//                 longitude: place.geometry.location.lng
//               });
//               calculateRoute({
//                 latitude: place.geometry.location.lat,
//                 longitude: place.geometry.location.lng
//               });
//             }}
//           >
//             <MaterialIcons name="place" size={20} color="#666" />
//             <View style={styles.placeDetails}>
//               <Text style={styles.placeName}>{place.name}</Text>
//               <Text style={styles.placeAddress} numberOfLines={1}>
//                 {place.vicinity}
//               </Text>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </BottomSheetScrollView>
//     </View>
//   );

//   if (!mapRegion) return <Text>Loading map...</Text>;

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <MapView
//         ref={mapRef}
//         style={styles.map}
//         provider={PROVIDER_GOOGLE}
//         showsUserLocation={true}
//         region={mapRegion}
//       >
//         {userLocation && (
//           <Marker
//             coordinate={userLocation}
//             title="Your Location"
//           />
//         )}
        
//         {destination && (
//           <Marker
//             coordinate={destination}
//             title="Destination"
//             pinColor="blue"
//           />
//         )}

//         {routeCoordinates.length > 0 && (
//           <Polyline
//             coordinates={routeCoordinates}
//             strokeWidth={4}
//             strokeColor="#2196F3"
//           />
//         )}
//       </MapView>

//       <BottomSheet
//         ref={sheetRef}
//         snapPoints={snapPoints}
//         index={0}
//         enablePanDownToClose={false}
//         handleIndicatorStyle={{ backgroundColor: '#999' }}
//         backgroundStyle={{ backgroundColor: 'white' }}
//       >
//         {renderContent()}
//       </BottomSheet>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'relative',
//   },
//   map: {
//     width: '100%',
//     height: '100%',
//   },
//   bottomSheetContent: {
//     flex: 1,
//     padding: 16,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f2f2f2',
//     borderRadius: 8,
//     padding: 8,
//     marginBottom: 16,
//   },
//   searchIcon: {
//     marginRight: 8,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 12,
//     color: '#333',
//   },
//   placeItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   placeDetails: {
//     marginLeft: 12,
//     flex: 1,
//   },
//   placeName: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#333',
//   },
//   placeAddress: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 2,
//   },
// });

// export default EmergencyScreen;

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Animated, Alert } from 'react-native';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width, height } = Dimensions.get('window');
const BOTTOM_SHEET_HEIGHT = height * 0.4;

const GOOGLE_MAPS_API_KEY = 'AIzaSyAbsiiK3o8h33gL4kT-Tnn_gLL8aTr2ezw'; // Your API key


const EmergencyScreen = () => {
  const [mapRegion, setMapRegion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [destination, setDestination] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [routeInfo, setRouteInfo] = useState(null);
  const [isRouteSelected, setIsRouteSelected] = useState(false);

  const sheetRef = useRef(null);
  const mapRef = useRef(null);
  const routeCardAnimation = useRef(new Animated.Value(0)).current;
  const snapPoints = useMemo(() => ['40%', '90%'], []);


  useEffect(() => {
    getUserLocation();
    loadExampleNearbyPlaces();
  }, []);

  const getUserLocation = async () => {
    try {
      const storedLocation = await AsyncStorage.getItem('userLocation');
      if (storedLocation) {
        const parsedLocation = JSON.parse(storedLocation);
        setMapRegion({
          latitude: parsedLocation.latitude,
          longitude: parsedLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setUserLocation(parsedLocation);
      }
    } catch (error) {
      console.error('Error fetching user location:', error);
    }
  };

  const loadExampleNearbyPlaces = () => {
    // Hardcoded example nearby locations
    const examplePlaces = [
      {
        place_id: '1',
        name: 'Cafe Mocha',
        vicinity: 'Near HITEC City, Hyderabad',
        geometry: { location: { lat: 17.4297, lng: 78.5030 } },
      },
      {
        place_id: '2',
        name: 'Cyber Towers',
        vicinity: 'Madhapur, Hyderabad',
        geometry: { location: { lat: 17.450808, lng: 78.381298 } },
      },
      {
        place_id: '3',
        name: 'Inorbit Mall',
        vicinity: 'Madhapur, Hyderabad',
        geometry: { location: { lat: 17.4355, lng: 78.3855 } },
      },
      {
        place_id: '4',
        name: 'Shilparamam',
        vicinity: 'HITEC City, Hyderabad',
        geometry: { location: { lat: 17.4483, lng: 78.4039 } },
      },
      {
        place_id: '5',
        name: 'Durgam Cheruvu Lake',
        vicinity: 'Jubilee Hills, Hyderabad',
        geometry: { location: { lat: 17.4310, lng: 78.4070 } },
      },
    ];
    setNearbyPlaces(examplePlaces);
  };

  const decodePolyline = (encoded, precision = 5) => {
    const coordinates = [];
    let index = 0, lat = 0, lng = 0;
  
    while (index < encoded.length) {
      let b, shift = 0, result = 0;
  
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
  
      const deltaLat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += deltaLat;
  
      shift = 0;
      result = 0;
  
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
  
      const deltaLng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += deltaLng;
  
      coordinates.push({
        latitude: lat / Math.pow(10, precision),
        longitude: lng / Math.pow(10, precision)
      });
    }
  
    return coordinates;
  };


  const calculateRoutes = async (destination) => {
    try {
      if (!userLocation) {
        console.error('User location not available');
        return;
      }
  
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json`,
        {
          params: {
            origin: `${userLocation.latitude},${userLocation.longitude}`,
            destination: `${destination.latitude},${destination.longitude}`,
            mode: 'driving',
            alternatives: true,
            departure_time: 'now',
            traffic_model: 'best_guess',
            key: GOOGLE_MAPS_API_KEY,
          },
        }
      );
  
      if (response.data.status === 'OK' && response.data.routes && response.data.routes.length > 0) {
        const processedRoutes = response.data.routes.map((route, index) => {
          const leg = route.legs[0];
          const decodedPolyline = decodePolyline(route.overview_polyline.points);
  
          if (!decodedPolyline.length) {
            console.warn('Decoded polyline is empty for route:', index);
          }
  
          return {
            polyline: decodedPolyline,
            duration: leg.duration_in_traffic ? leg.duration_in_traffic.text : leg.duration.text,
            distance: leg.distance.text,
            description: `Route ${index + 1}`,
            color: index === 0 ? '#E53935' : '#43A047',
          };
        });
  
        setRoutes(processedRoutes);
        setRouteInfo(processedRoutes[0]);
        setSelectedRouteIndex(0);
        setIsRouteSelected(true);
  
        Animated.spring(routeCardAnimation, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
  
        if (processedRoutes[0]?.polyline.length > 0) {
          const coordinates = [
            userLocation,
            destination,
            ...processedRoutes[0].polyline,
          ];
  
          console.log('Fitting to coordinates:', coordinates);
          mapRef.current?.fitToCoordinates(coordinates, {
            edgePadding: { top: 50, right: 50, bottom: 200, left: 50 },
            animated: true,
          });
        }
      } else {
        console.error('API Response Error:', response.data);
        Alert.alert('Route Calculation Error', 'Unable to calculate routes.');
      }
    } catch (error) {
      console.error('Error calculating routes:', error);
      Alert.alert(
        'Route Calculation Error',
        'Unable to calculate routes. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };
  

  const selectRoute = (index) => {
    if (index >= 0 && index < routes.length) {
      setSelectedRouteIndex(index);
      setRouteInfo(routes[index]);

      // Fit map to show the selected route
      if (routes[index].polyline.length > 0) {
        const coordinates = [
          userLocation,
          destination,
          ...routes[index].polyline
        ];
        
        mapRef.current?.fitToCoordinates(coordinates, {
          edgePadding: { top: 50, right: 50, bottom: 200, left: 50 },
          animated: true,
        });
      }
    }
  };

  const startNavigation = () => {
    // Navigate to turn-by-turn navigation screen
    // You can implement this in the next task
    console.log('Starting navigation with route:', selectedRouteIndex);
  };

  const CustomMarker = ({ type }) => (
    <View style={styles.markerContainer}>
      <View style={[
        styles.marker,
        type === 'user' ? styles.userMarker : styles.destinationMarker
      ]}>
        <MaterialIcons 
          name={type === 'user' ? 'person-pin-circle' : 'local-hospital'} // Changed to hospital icon for emergency context
          size={28} 
          color={type === 'user' ? '#1976D2' : '#0A477F'} 
        />
      </View>
      <View style={[
        styles.markerPulse,
        type === 'user' ? styles.userPulse : styles.destinationPulse
      ]} />
    </View>
  );
  
  const renderSelectedDestination = () => (
    <View style={styles.selectedDestinationContainer}>
      <View style={styles.destinationHeader}>
        <MaterialIcons name="location-on" size={24} color="#0A477F" />
        <View style={styles.destinationTextContainer}>
          <Text style={styles.destinationTitle}>Destination</Text>
          <Text style={styles.destinationAddress}>
            {nearbyPlaces.find(place => 
              place.geometry.location.lat === destination?.latitude && 
              place.geometry.location.lng === destination?.longitude
            )?.name || 'Selected Location'}
          </Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.changeDestinationButton}
        onPress={() => {
          setDestination(null);
          setRoutes([]);
          setIsRouteSelected(false);
        }}
      >
        <Text style={styles.changeDestinationText}>Change</Text>
      </TouchableOpacity>
    </View>
  );

  
  const renderBottomSheetContent = () => {
    if (destination && isRouteSelected) {
      return (
        <BottomSheetScrollView 
          contentContainerStyle={styles.bottomSheetScrollContent}
          showsVerticalScrollIndicator={false}
        >
          {renderSelectedDestination()}
          
          <View style={styles.routesContainer}>
            <Text style={styles.routesTitle}>Available Routes</Text>
            
            {/* Replace BottomSheetScrollView with ScrollView for horizontal routes */}
            <ScrollView 
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.routeCardsWrapper}
              decelerationRate="fast"
            
              snapToAlignment="end"
              pagingEnabled={false}
              scrollEventThrottle={16}
              style={styles.horizontalScrollView}
              directionalLockEnabled={true}
            >
              {routes.map((route, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.routeCard,
                    selectedRouteIndex === index && styles.selectedRouteCard,
                  ]}
                  onPress={() => selectRoute(index)}
                  activeOpacity={0.7}
                >
                  <View style={styles.routeBadge}>
                    <Text style={styles.routeBadgeText}>
                      {index === 0 ? 'Fastest' : `Route ${index + 1}`}
                    </Text>
                  </View>
          
                  <View style={styles.routeMainInfo}>
                    <Text style={styles.routeDuration}>{route.duration}</Text>
                    <Text style={styles.routeDistance}>{route.distance}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <TouchableOpacity 
              style={styles.startButton} 
              onPress={startNavigation}
            >
              <MaterialIcons name="navigation" size={24} color="white" />
              <Text style={styles.startButtonText}>Start Navigation</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetScrollView>
      );
    }

    return (
      <View style={styles.bottomSheetContent}>
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color="#0A477F" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search emergency facilities nearby"
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <Text style={styles.sectionTitle}>Nearby Emergency Facilities</Text>
        
        <BottomSheetScrollView contentContainerStyle={styles.facilitiesList}>
          {nearbyPlaces.map((place) => (
            <TouchableOpacity 
              key={place.place_id}
              style={styles.facilityCard}
              onPress={() => {
                const newDestination = {
                  latitude: place.geometry.location.lat,
                  longitude: place.geometry.location.lng
                };
                setDestination(newDestination);
                calculateRoutes(newDestination);
                sheetRef.current?.snapToIndex(0);
              }}
            >
              <View style={styles.facilityIconContainer}>
                <MaterialIcons name="local-hospital" size={24} color="#0A477F" />
              </View>
              
              <View style={styles.facilityInfo}>
                <Text style={styles.facilityName}>{place.name}</Text>
                <Text style={styles.facilityAddress}>{place.vicinity}</Text>
              </View>

              <TouchableOpacity style={styles.facilityNavigateButton}>
                <MaterialIcons name="directions" size={20} color="#0A477F" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </BottomSheetScrollView>
      </View>
    );
  };

  if (!mapRegion) return <Text>Loading map...</Text>;

  return (
    <GestureHandlerRootView style={styles.container}>
    <MapView
      ref={mapRef}
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={false}
      region={mapRegion}
    >
      {userLocation && (
        <Marker coordinate={userLocation}>
          <CustomMarker type="user" />
        </Marker>
      )}
      
      {destination && (
        <Marker coordinate={destination}>
          <CustomMarker type="destination" />
        </Marker>
      )}

      {routes.map((route, index) => (
        <Polyline
          key={index}
          coordinates={route.polyline}
          strokeWidth={4}
          strokeColor={index === selectedRouteIndex ? route.color : `${route.color}80`}
          zIndex={index === selectedRouteIndex ? 2 : 1}
          lineDashPattern={[0]}
          geodesic={true}
        />
      ))}
    </MapView>

    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      index={0}
      enablePanDownToClose={false}
      handleIndicatorStyle={styles.bottomSheetIndicator}
      backgroundStyle={styles.bottomSheetBackground}
    >
      {renderBottomSheetContent()}
    </BottomSheet>
  </GestureHandlerRootView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  navigationContainer: {
    position: 'absolute',
    bottom: BOTTOM_SHEET_HEIGHT,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  bottomSheetScrollContent: {
    padding: 16,
  },
  routesContainer: {
    paddingBottom: 20,
  },

  horizontalScrollView: {
    flexGrow: 0,
    height: 140,
    marginHorizontal: -16, // Compensate for parent padding
  },
  routeCardsWrapper: {
    paddingHorizontal: 16, // Move padding from parent to wrapper
    paddingVertical: 8,
    paddingRight: 32, // Add extra padding at the end for better UX
  },
  routeCard: {
    width: width * 0.4,
    height: 120,
    marginRight: 14,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  routeMainInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  routeBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  routeBadgeText: {
    color: '#0A477F',
    fontSize: 12,
    fontWeight: '600',
  },
  routeDuration: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  routeDistance: {
    fontSize: 14,
    color: '#666',
  },
  selectedRouteCard: {
    borderColor: '#0A477F',
    borderWidth: 2,
    backgroundColor: '#F5F9FF',
  },

  bottomSheetContent: {
    flex: 1,
    padding: 16,
  },
 



  
  routesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },


  startButton: {
    backgroundColor: '#0A477F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginTop: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  facilitiesList: {
    paddingBottom: 24,
  },
  facilityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  facilityIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  facilityInfo: {
    flex: 1,
  },
  facilityName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  facilityAddress: {
    fontSize: 14,
    color: '#666',
  },
  facilityNavigateButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  bottomSheetIndicator: {
    backgroundColor: '#0A477F',
    width: 40,
    opacity: 0.7,
  },
  bottomSheetBackground: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  selectedDestinationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F9FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  destinationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  destinationTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  destinationTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  destinationAddress: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  changeDestinationButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
  },
  changeDestinationText: {
    color: '#0A477F',
    fontSize: 14,
    fontWeight: '600',
  },
 
 
});

export default EmergencyScreen;