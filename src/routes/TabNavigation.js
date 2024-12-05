import { StyleSheet, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Entypo, FontAwesome5, Foundation, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import HomeScreen from '../screens/HomeScreen';
import EmergencyScreen from '../screens/EmergencyScreen';
import ShieldScreen from '../screens/ShieldScreen';
import VolunteerRegistration from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';





const Tab = createBottomTabNavigator();

function TabNavigator() {
    const navigation = useNavigation();
  
    return (
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              switch (route.name) {
                case 'Home':
                  return <Entypo name="home" size={24} color={focused ? '#0A477F' : 'grey'} />;
                case 'Emergency':
                  return <FontAwesome5 name="map-marker-alt" size={22} color={focused ? '#0A477F' : 'grey'} />;
                case 'Shield':
                  return <Foundation name="shield" size={26} color={focused ? '#0A477F' : 'grey'} />;
                case 'Profile':
                  return <FontAwesome name="user-circle-o" size={24} color={focused ? '#0A477F' : 'grey'} />;
                default:
                  return null;
              }
            },
            tabBarLabel: ({ focused }) => (
              <Text style={[styles.tabLabel, { color: focused ? '#0A477F' : 'grey' }]}>
                {route.name === 'Home' ? 'Home' : route.name}
              </Text>
            ),
            tabBarStyle: {
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              elevation: 20,
              height: 70,
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
            },
            tabBarItemStyle: route.name === 'Emergency' ? { marginRight: 30 } :
                            route.name === 'Shield' ? { marginLeft: 30 } : {},
            tabBarIconStyle: {
              marginTop: 10,
            },
          })}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerShown: false }}
          />
          <Tab.Screen 
            name="Emergency" 
            component={EmergencyScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen 
            name="Shield"
            component={ShieldScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen 
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
  
        <TouchableOpacity 
          style={styles.sosButton} 
          onPress={() => navigation.navigate('SOS')}
        >
          <View style={styles.sosButtonContainer}>
            <MaterialIcons name="sos" size={40} color="#FFF" />
          </View>
        </TouchableOpacity>
      </View>
    );
}


  
const styles = StyleSheet.create({
    tabLabel: {
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 15,
    },
    sosButton: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        zIndex: 10,
      },
      sosButtonContainer: {
        backgroundColor: '#e63946',
        borderRadius: 35,
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
      },
});

export default TabNavigator;