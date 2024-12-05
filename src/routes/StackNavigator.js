import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { Ionicons, MaterialIcons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import CustomSwitch from '../components/CustomSwitch';
import { BlurView } from 'expo-blur';


// Import screens
import EmergencyContactScreen from '../components/EmergencyContact.js';
import TabNavigator from './TabNavigation';
import Login from '../authentication/Login';
import OTPPage from '../authentication/OTPPage';
import WelcomeScreen from '../authentication/Welcome';
import OnboardingScreen from '../authentication/OnBoardingScreen';
import SplashScreen from '../authentication/SplashScreen';
import MapsScreen from '../authentication/MapsScreen';
import EmergencyScreen from '../screens/EmergencyScreen';
import UpdatesScreen from '../screens/ShieldScreen';
import RegisterScreen from '../screens/RegisterScreen';
import EditProfileScreen from '../components/EditProfile';

import VolunteerRegistrationScreen from '../components/VolunteerReg';
import PersonalInfoScreen from '../components/PersonalInfo';
import SafeTipsScreen from '../components/SafetyTips';
import DisasterPreparedness from '../components/DisasterPrep';
import SOSScreen from '../screens/SOSScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationsScreen from '../components/Notification'
import DetailsScreen from '../components/DetailsScreen';
import DisasterDetails from '../components/DisasterDetails';
import WeatherInfo from '../components/WeatherInfo';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const { width } = Dimensions.get('window');

const DrawerHeader = ({ onEditPress }) => (
  <LinearGradient
    colors={['#1a237e', '#0A477F']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.headerGradient}
  >
    <View style={styles.headerContent}>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Image
            source={require('../../assets/user/user1.jpg')}
            style={styles.profileImage}
          />
          <View style={styles.statusIndicator} />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileDetails}>Emergency Responder</Text>
          <View style={styles.badgeContainer}>
            <FontAwesome5 name="medal" size={12} color="#FFD700" />
            <Text style={styles.badgeText}>Certified Responder</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
          <MaterialIcons name="edit" size={22} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  </LinearGradient>
);

const DrawerItem = ({ label, icon, onPress, isActive, badgeCount, isAlert }) => (
  <TouchableOpacity
    style={[
      styles.drawerItem,
      isActive && styles.activeDrawerItem,
      isAlert && styles.alertDrawerItem
    ]}
    onPress={onPress}
  >
    <View style={styles.drawerItemContent}>
      <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
        <FontAwesome5 
          name={icon} 
          size={18} 
          color={isActive ? '#0A477F' : isAlert ? '#FF5252' : '#666'} 
        />
      </View>
      <Text style={[
        styles.drawerItemLabel,
        isActive && styles.activeDrawerItemLabel,
        isAlert && styles.alertDrawerItemLabel
      ]}>
        {label}
      </Text>
    </View>
    {badgeCount && (
      <View style={styles.badgeCount}>
        <Text style={styles.badgeCountText}>{badgeCount}</Text>
      </View>
    )}
  </TouchableOpacity>
);

const SectionTitle = ({ title }) => (
  <View style={styles.sectionTitleContainer}>
    <Text style={styles.sectionTitleText}>{title}</Text>
    <View style={styles.sectionTitleLine} />
  </View>
);


const CustomDrawerContent = (props) => {
  const [activeItem, setActiveItem] = useState('Home');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const navigateAndSetActive = (screenName, itemName) => {
    setActiveItem(itemName);
    props.navigation.navigate(screenName);
  };

  return (
    <View style={styles.drawerContainer}>
      <DrawerHeader 
        onEditPress={() => props.navigation.navigate('EditProfile')} 
      />
      
      <DrawerContentScrollView 
        {...props} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.drawerContent}>
          <SectionTitle title="MAIN MENU" />
          <DrawerItem
            label="Dashboard"
            icon="home"
            isActive={activeItem === 'Home'}
            onPress={() => navigateAndSetActive('HomeMain', 'Home')}
          />
          <DrawerItem
            label="SOS Emergency"
            icon="exclamation-circle"
            isActive={activeItem === 'SOS'}
            isAlert={true}
            onPress={() => navigateAndSetActive('SOS', 'SOS')}
          />
          <DrawerItem
            label="Disaster Alerts"
            icon="bell"
            isActive={activeItem === 'Alerts'}
            badgeCount="3"
            onPress={() => navigateAndSetActive('Notifications', 'Notifications')}
          />

          <SectionTitle title="DISASTER MANAGEMENT" />
          <DrawerItem
            label="Emergency Contacts"
            icon="phone-alt"
            isActive={activeItem === 'Emergency'}
            onPress={() => navigateAndSetActive('Contacts', 'Contacts')}
          />
          <DrawerItem
            label="Safety Guidelines"
            icon="shield-alt"
            isActive={activeItem === 'Safety'}
            onPress={() => navigateAndSetActive('SafeTips', 'Safety')}
          />
          <DrawerItem
            label="Weather Alerts"
            icon="cloud"
            isActive={activeItem === 'Weather'}
            onPress={() => navigateAndSetActive('Weather', 'Weather')}
          />
          <DrawerItem
            label="Evacuation Routes"
            icon="route"
            isActive={activeItem === 'Routes'}
            onPress={() => navigateAndSetActive('Routes', 'Routes')}
          />
          <DrawerItem
            label="Resource Centers"
            icon="hospital"
            isActive={activeItem === 'Resources'}
            onPress={() => navigateAndSetActive('Resources', 'Resources')}
          />

          <SectionTitle title="COMMUNITY" />
          <DrawerItem
            label="Volunteer Registration"
            icon="hands-helping"
            isActive={activeItem === 'Volunteer'}
            onPress={() => navigateAndSetActive('VolunteerReg', 'Volunteer')}
          />
          <DrawerItem
            label="Community Forums"
            icon="users"
            isActive={activeItem === 'Forums'}
            onPress={() => navigateAndSetActive('Forums', 'Forums')}
          />
          <DrawerItem
            label="Report Incident"
            icon="flag"
            isActive={activeItem === 'Report'}
            onPress={() => navigateAndSetActive('Report', 'Report')}
          />

          <SectionTitle title="SETTINGS" />
          <View style={styles.settingsSection}>
            <View style={styles.notificationContainer}>
              <View style={styles.notificationLeft}>
                <FontAwesome5 name="bell" size={18} color="#666" />
                <Text style={styles.notificationLabel}>SMS Notifications</Text>
              </View>
              <CustomSwitch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                activeColor="#0A477F"
                inActiveColor="#E0E0E0"
              />
            </View>
          </View>
          
          <DrawerItem
            label="Language Settings"
            icon="language"
            isActive={activeItem === 'Language'}
            onPress={() => navigateAndSetActive('Language', 'Language')}
          />
          <DrawerItem
            label="Privacy Policy"
            icon="lock"
            isActive={activeItem === 'Privacy'}
            onPress={() => navigateAndSetActive('Privacy', 'Privacy')}
          />
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <FontAwesome5 name="sign-out-alt" size={20} color="#FF5252" />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
      
      <View style={styles.bottomContainer}>
        <View style={styles.versionContainer}>
          <FontAwesome5 name="info-circle" size={14} color="#999" />
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </View>
    </View>
  );
};


// Stack Navigator containing the rest of your screens
function MainStack() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Login');

  useEffect(() => {
    checkInitialRoute();
  }, []);

  

  const checkInitialRoute = async () => {
    try {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      const userToken = await AsyncStorage.getItem('userToken');

      if (hasLaunched === null) {
        await AsyncStorage.setItem('hasLaunched', 'true');
        setInitialRoute('Welcome');
      } else if (userToken) {
        setInitialRoute('HomeMain');
      } else {
        setInitialRoute('Maps');
      }
    } catch (error) {
      console.error('Error checking initial route:', error);
      setInitialRoute('Login');
    } finally {
      setIsLoading(false);
    }
  };



  if (isLoading) {
    return <SplashScreen />;
  }


//   <Stack.Navigator
//   initialRouteName={initialRoute}
//   screenOptions={({ navigation }) => ({
//     header: () => <CustomHeader navigation={navigation} title="Sahay" />,
//   })}
// >

// options={({ navigation }) => ({
//   header: () => <HomeHeader navigation={navigation} />,
// })}
  return (
    <Stack.Navigator initialRouteName="Welcome">
    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    <Stack.Screen name="OTPPage" component={OTPPage} options={{ headerShown: false }} />
    <Stack.Screen
      name="HomeMain"
      component={TabNavigator}
      options={{ headerShown: false }}
      
    />
    <Stack.Screen name="Emergency" component={EmergencyScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Shield" component={UpdatesScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Contacts" component={EmergencyContactScreen} options={{ headerShown: false }} />
    <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SafeTips" component={SafeTipsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="VolunteerReg" component={VolunteerRegistrationScreen} options={{ headerShown: false }} />
    <Stack.Screen name="DisasterPrep" component={DisasterPreparedness} options={{ headerShown: false }} />
    <Stack.Screen name="Weather" component={WeatherInfo} options={{ headerShown: false }} />
    <Stack.Screen name="SOS" component={SOSScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Maps" component={MapsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="DisasterDetails" component={DisasterDetails} options={{ headerShown: false }} />

  </Stack.Navigator>
  );
}
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: width * 0.85,
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <Drawer.Screen name="Main" component={MainStack} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerGradient: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
  },
  headerContent: {
    marginTop: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 15,
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileDetails: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.9,
    marginTop: 2,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginLeft: 5,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    top:-50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingVertical: 10,
  },
  drawerContent: {
    flex: 1,
    paddingHorizontal: 15,
  },
  sectionTitleContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitleText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0A477F',
    letterSpacing: 1,
    marginBottom: 5,
  },
  sectionTitleLine: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginTop: 5,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
    marginVertical: 2,
  },
  drawerItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIconContainer: {
    backgroundColor: '#E3F2FD',
  },
  activeDrawerItem: {
    backgroundColor: '#E3F2FD',
  },
  alertDrawerItem: {
    backgroundColor: '#FFF3F3',
  },
  drawerItemLabel: {
    marginLeft: 12,
    fontSize: 15,
    color: '#424242',
    fontWeight: '500',
  },
  activeDrawerItemLabel: {
    color: '#0A477F',
    fontWeight: '600',
  },
  alertDrawerItemLabel: {
    color: '#FF5252',
    fontWeight: '600',
  },
  badgeCount: {
    backgroundColor: '#FF5252',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeCountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  settingsSection: {
    marginVertical: 5,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  notificationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationLabel: {
    fontSize: 15,
    color: '#424242',
    marginLeft: 12,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginTop: 10,
    backgroundColor: '#FFF3F3',
    borderRadius: 12,
  },
  logoutText: {
    color: '#FF5252',
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '600',
  },
  bottomContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  versionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  versionText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 5,
  },
});

export default DrawerNavigator;