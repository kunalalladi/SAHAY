import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Dimensions,
  Platform,
  StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, EvilIcons, Fontisto, MaterialIcons, AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const { width: windowWidth } = Dimensions.get('window');

const alertsData = [
  {
    title: "Heavy Flood Alert",
    issuedBy: "Issued by Assam Government",
    highestIntensity: "Highest Intensity",
    location: "Guwahati",
    date: "27 Aug. 12:30",
    message: "Due to the ongoing increase in the water level of the Brahmaputra River in Guwahati District, Assam, it is strongly recommended that citizens avoid proximity to the river. To ensure your safety, kindly adhere to guidelines in the 'do's and don'ts' section."
  },
  {
    title: "Severe Thunderstorm Warning",
    issuedBy: "Issued by Assam Government",
    highestIntensity: "Severe",
    location: "Dibrugarh",
    date: "27 Aug. 14:00",
    message: "A severe thunderstorm warning is in effect. Please stay indoors and avoid traveling during the storm."
  },
  // Add more alert objects as needed
];

const recentUpdateData =[
  {
    title: "Heavy Flood Alert",
    issuedBy: "Issued by Assam Government",
    
    date: "27 Aug. 12:30",
    message: "Due to the ongoing increase in the water level of the Brahmaputra River in Guwahati District, Assam, it is strongly recommended that citizens avoid proximity to the river. To ensure your safety, kindly adhere to guidelines in the 'do's and don'ts' section."
  },
  {
    title: "Severe Thunderstorm Warning",
    issuedBy: "Issued by Assam Government",
    
    date: "27 Aug. 14:00",
    message: "A severe thunderstorm warning is in effect. Please stay indoors and avoid traveling during the storm."
  },
];

const icons = {
  chancerain: require('../../assets/weatherIcons/chancerain.png'),
  chancesleet: require('../../assets/weatherIcons/chancesleet.png'),
  cloudy: require('../../assets/weatherIcons/cloudy.png'),
  flurries: require('../../assets/weatherIcons/flurries.png'),
  hazy: require('../../assets/weatherIcons/hazy.png'),
  mostlycloudy: require('../../assets/weatherIcons/mostlycloudy.png'),
  nightclear: require('../../assets/weatherIcons/nt_clear.png'),
  nightmostlycloudy: require('../../assets/weatherIcons/nt_mostlycloudy.png'),
  nightpartlycloudy: require('../../assets/weatherIcons/nt_partlycloudy.png'),
  partlycloudy: require('../../assets/weatherIcons/partlycloudy.png'),
  rain: require('../../assets/weatherIcons/rain.png'),
  sleet: require('../../assets/weatherIcons/sleet.png'),
  sunny: require('../../assets/weatherIcons/sunny.png'),
  tstorms: require('../../assets/weatherIcons/tstorms.png')
}

const getWeatherIcon = weather => {
  if (!weather || weather.length === 0) return null

  const mainWeather = weather[0].main.toLowerCase()
  const weatherDescription = weather[0].description.toLowerCase()

  if (mainWeather.includes('clear')) {
    return icons.sunny
  } else if (mainWeather.includes('cloud')) {
    return icons.cloudy
  } else if (mainWeather.includes('rain')) {
    return icons.rain
  } else if (
    mainWeather.includes('drizzle') ||
    weatherDescription.includes('rain')
  ) {
    return icons.chancerain
  } else if (
    mainWeather.includes('snow') ||
    weatherDescription.includes('flurries')
  ) {
    return icons.flurries
  } else if (mainWeather.includes('thunderstorm')) {
    return icons.tstorms
  } else if (
    mainWeather.includes('haze') ||
    weatherDescription.includes('mist')
  ) {
    return icons.hazy
  } else if (mainWeather.includes('partly cloudy')) {
    return icons.partlycloudy
  } else if (mainWeather.includes('mostly cloudy')) {
    return icons.mostlycloudy
  } else if (mainWeather.includes('sleet')) {
    return icons.sleet
  } else {
    return icons.cloudy // Default icon
  }
}

export default function HomeScreen () {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const apiKey = '73501b408356505b4cc980efbb974f73' // Your API Key
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  

  const navigation = useNavigation()

  

  const renderAlerts = ({ item }) => (
    <View style={styles.alertCard}>
      <Text style={styles.alertTitle}>{item.title}</Text>
      <Text style={styles.alertIssued}>{item.issuedBy}</Text>
      <View style={styles.separator} />
        <View style={styles.alertDetailsContainer}>
          <View style={styles.speedometerContainer}>
            <MaterialCommunityIcons name="speedometer" size={24} color="white" />
          <Text style={styles.alertSectionLeft}>{item.highestIntensity}</Text>
        </View>
        <View style={styles.verticalSeparator} />
          <View style={styles.alertSectionRight}>
            <View style={styles.locationContainer}>
              <EvilIcons name="location" size={20} color="white" />
              <Text style={styles.location}>{item.location}</Text>
            </View>
            <View style={styles.dateContainer}>
              <Fontisto name="date" size={16} color="white" />
              <Text style={styles.alertDate}>{item.date}</Text>
            </View>
          </View>
        </View>
      <View style={styles.separator} />
      <Text style={styles.alertMessage} numberOfLines={6} ellipsizeMode="tail">{item.message}</Text>
    </View>
  );

  const renderUpdates = ({ item }) => (
    <View style={styles.updateCard}>
      <View style={styles.updateHeader}>
        <Text style={styles.updateTitle} numberOfLines={1} ellipsizeMode="tail">
          {item.title}
        </Text>
        <Text style={styles.updateDate}>{item.date}</Text>
      </View>
      <Text style={styles.updateIssued}>{item.issuedBy}</Text>
      <View style={styles.separator} />
      <Text style={styles.updateMessage} numberOfLines={4} ellipsizeMode="tail">{item.message}</Text>
      <Image
        source={require('../../assets/images/update_img.jpg')}
        style={styles.updateImage}
      />
    </View>
  );


  const fetchWeatherData = async () => {
    setIsLoading(true) // Set loading state to true before fetch
    try {
      // Try to retrieve user location from AsyncStorage
      const storedLocation = await AsyncStorage.getItem('userLocation')
      const userLocation = storedLocation ? JSON.parse(storedLocation) : null

      console.log('This is User Location ', userLocation)

      if (userLocation) {
        const { latitude, longitude } = userLocation
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
        )
        const weatherData = await weatherResponse.json()

        

        console.log('This is Weather Data ', weatherData)

        setData(weatherData)
        setError('')
      } else {
        // User location not found in AsyncStorage, fallback to manual input
        setLocation('') // Clear location state
      }
    } catch (error) {
      console.error('Error fetching weather data:', error)
      setError('Failed to fetch data')
    } finally {
      setIsLoading(false) // Set loading state to false after fetch
    }
  }

  useEffect(() => {
    fetchWeatherData() // Initial fetch
    const intervalId = setInterval(fetchWeatherData, 3600000) // 1 hour update

    return () => clearInterval(intervalId)
  }, []) // Empty dependency array ensures useEffect runs only once

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken') // Remove userToken
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }]
    })
  }

  return (
    
    <ScrollView contentContainerStyle={styles.container}showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>

      {/* Header box */}
      <View style={styles.headerContainer}>
        {/* Left Section: Location Text and Icon */}
        <View style={styles.leftContainer}>
          <Text style={styles.locationHeaderTitle}>Location</Text>
          <View style={styles.locationDetails}>
            <Entypo name="location-pin" size={24} color="#0A477F" />
            <Text style={styles.locationHeaderText}>Hyderabad, Telangana</Text>
            <EvilIcons name="chevron-down" style={styles.arrowDown} size={24} color="black" />
          </View>
        </View>

        {/* Right Section: Notification Button */}
        <TouchableOpacity style={styles.notificationButton} onPress={() => navigation.navigate('Notifications')}>
          <MaterialIcons name="notifications" size={24} color="white" />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationButton} onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Search Bar and Filter Button */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <EvilIcons name="search" size={24} color="black" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#888"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <AntDesign name="filter" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Box 1: Normal Day */}
      <View style={[styles.infoBox, styles.normalDayBox]}>
        <View style={styles.textContainer}>
          <Text style={styles.normalDayText}>Everything looks normal.</Text>
          <Text style={styles.normalDayText}>Have a great day!</Text>
        </View>
        <Image
          source={require('../../assets/images/home1.png')}
          style={styles.image}
        />
      </View>
      {/* What's Emergency Section */}
      <Text style={styles.emergencyTitle}>What's Emergency?</Text>
      <ScrollView
        horizontal
        style={styles.emergencyContainer}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.emergencyColumn}>
          {/* Row 1 */}
          <View style={styles.emergencyRow}>
            <TouchableOpacity style={styles.emergencyBeginItem} onPress={() => navigation.navigate('DisasterDetails', { 
                  disasterType: 'Landslide', 
                  imageSource: require('../../assets/images/landslide_s.jpg') 
              })}>
              <Image
                source={require('../../assets/images/landslide_s.jpg')}
                style={styles.emergencyIcon}
              />
              <Text style={styles.emergencyText}>Landslide</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.emergencyItem} onPress={() => navigation.navigate('DisasterDetails', { 
                  disasterType: 'Earthquake', 
                  imageSource: require('../../assets/images/earthquake_s.jpg') 
              })}>

              <Image
                source={require('../../assets/images/earthquake_s.jpg')}
                style={styles.emergencyIcon}
              />
              <Text style={styles.emergencyText}>Earthquake</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.emergencyItem} onPress={() => navigation.navigate('DisasterDetails', { 
                  disasterType: 'Heatwave', 
                  imageSource: require('../../assets/images/heatwave_s.jpg') 
              })}>
              <Image
                source={require('../../assets/images/heatwave_s.jpg')}
                style={styles.emergencyIcon}
              />
              <Text style={styles.emergencyText}>Heatwave</Text>
            </TouchableOpacity>
          </View>

          {/* Row 2 */}
          <View style={styles.emergencyRow}>
            <TouchableOpacity style={styles.emergencyBeginItem} onPress={() => navigation.navigate('DisasterDetails', { 
                  disasterType: 'Thunderstorm', 
                  imageSource: require('../../assets/images/Thunderstrom_s.jpg') 
              })}>
              <Image
                source={require('../../assets/images/Thunderstrom_s.jpg')}
                style={styles.emergencyIcon}
              />
              <Text style={styles.emergencyText}>Thunderstorm</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.emergencyItem} onPress={() => navigation.navigate('DisasterDetails', { 
                  disasterType: 'Flood', 
                  imageSource: require('../../assets/images/floods_s.jpg') 
              })}>
              <Image
                source={require('../../assets/images/floods_s.jpg')}
                style={styles.emergencyIcon_f}
              />
              <Text style={styles.emergencyText}>Flood</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.emergencyItem} onPress={() => navigation.navigate('DisasterDetails', { 
                  disasterType: 'Tsunami', 
                  imageSource: require('../../assets/images/tsunami_s.jpg') 
              })}>
              <Image
                source={require('../../assets/images/tsunami_s.jpg')}
                style={styles.emergencyIcon}
              />
              <Text style={styles.emergencyText}>Tsunami</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </ScrollView>
     
      {/* Active Alerts Section */}
      <View style={styles.headerTitleContainer}>
        <Text style={styles.activeAlertsTitle}>Active Alerts</Text>
        <View style={styles.seeAllContainer}>
        <Text 
          style={styles.seeAllText} 
          onPress={() => navigation.navigate('YourTargetScreen')} // Replace with your target screen
        >
          See All
        </Text>
        <EvilIcons name="chevron-right" style={{marginLeft: 2}} size={24} color="#0A477F" />
        </View>
      </View>
      <Carousel
        width={windowWidth}
        height={320} 
        data={alertsData}
        renderItem={renderAlerts}
        onSnapToItem={(index) => setActiveIndex(index)}
        loop={false} // Disable looping
        itemWidth={windowWidth*0.9} 
        />
      <View style={styles.dotsContainer}>
        {alertsData.map((_, index) => (
          <Text
            key={index}
            style={[styles.dot, activeIndex === index ? styles.activeDot : styles.inactiveDot]}
          >
            ●
          </Text>
        ))}
      </View>




      {/* Box 3: Weather Info */}
      <View style={styles.headerTitleContainer}>
        <Text style={styles.emergencyTitle}>Weather Info</Text>
        <View style={styles.seeAllContainer}>
        <Text 
          style={styles.seeAllText} 
          onPress={() => navigation.navigate('Weather')} 
        >
          See All
        </Text>
        <EvilIcons name="chevron-right" style={{marginLeft: 2}} size={24} color="#0A477F" />
        </View>
      </View>
      
      {data.weather ? (
        <TouchableOpacity style={[styles.infoBox, styles.weatherBox]} onPress={() => navigation.navigate('Weather')}>
          <LinearGradient 
            colors={['#0A477F', '#4AB8D1']} 
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          />
          <View style={styles.weatherInfoContainer}>
            <Image source={getWeatherIcon(data.weather)} style={styles.weatherIcon} />
            <View style={styles.weatherDetails}>
              <View style={styles.textDetails}>
                <Text style={styles.locationText}>{data.name}</Text>
                <Text style={styles.descriptionText}>{data.weather[0].description}</Text>
              </View>
              <Text style={styles.temperatureText}>
                {data.main ? `${Math.round((data.main.temp - 32) * 5/9)}°C` : 'Loading...'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
      <Text style={styles.loadingText}>Loading weather data...</Text> 
      )}

      {/* Box 4: Recent Updates */}
      <View style={styles.headerTitleContainer}>
        <Text style={styles.activeAlertsTitle}>Recent Updates</Text>
        <View style={styles.seeAllContainer}>
        <Text 
          style={styles.seeAllText} 
          onPress={() => navigation.navigate('Shield')} 
        >
          See All
        </Text>
        <EvilIcons name="chevron-right" style={{marginLeft: 2}} size={24} color="#0A477F" />
        </View>
      </View>

      
      <Carousel
        width={windowWidth}
        height={300} 
        data={recentUpdateData}
        renderItem={renderUpdates}
        onSnapToItem={(index) => setActiveIndex(index)}
        loop={false} // Disable looping
        itemWidth={windowWidth*0.9} 
        />
         <ImageBackground
        source={require('../../assets/base-e1.png')} // Replace with your image URL
        style={styles.bottomImage}
        imageStyle={{ opacity: 0.4 }} 
      >
        
       
    </ImageBackground>
      

      
    </ScrollView>
    


  )
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: '#F9F9F9',
    paddingBottom: 450,

  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 8,
  },
  leftContainer: {
    flexDirection: 'column',
  },
  locationHeaderTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  locationDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationHeaderText: {
    fontSize: 16,
    color: 'black',
    marginTop: 8,
    margin: 4,
  },
  arrowDown: {
    marginLeft: 4,
  },
  notificationButton: {
    padding: 10,
    backgroundColor: '#0A477F',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 15,
    right: 12,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'red',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderRadius: 8,
    padding: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  filterButton: {
    marginLeft: 12,
    backgroundColor: '#0A477F',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10
  },
  normalDayBox: {
    backgroundColor: '#FFE9CA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10
  },
  normalDayText: {
    fontSize: 16,
    color: '#333'
  },
  image: {
    width: 100, // Reduce width to fit box better
    height: 60, 
    resizeMode: 'cover',
    marginRight: 10
  },
  headerTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAllContainer: {
    flexDirection: 'row',
    alignItems: 'center'

  },
  seeAllText: {
    color: '#0A477F', // Link color
    fontSize: 14, 
    fontWeight: '600', 
    
    padding: 2, 
    
    borderRadius: 4, 
    
  },
  activeAlertsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333',
    
  },
  alertCard: {
    backgroundColor: '#d62828',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 5,
    width: '90%', 

  },
  alertTitle: {
    fontSize: 18, // Increased font size for better visibility
    fontWeight: 'bold',
    color: '#fff', // Changed text color to white
  },
  alertIssued: {
    fontSize: 14,
    color: '#f0f0f0', // Lighten issuedBy text color
  },
  alertDetailsContainer: {
    flexDirection: 'row',
    
    justifyContent: 'center', 
    alignItems: 'center',
    marginVertical: 7,
  },
  speedometerContainer: {
    alignItems: 'center', // Center items horizontally
  },
  alertSectionLeft: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal:20,
    paddingVertical:10,

    color: '#FFFFFF', // Highlight highestIntensity with a different color
  },
  alertSectionRight: {
    flexDirection: 'column', // Stack items vertically
    paddingHorizontal:30,
    justifyContent: 'flex-start',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically centered
    marginBottom: 15,
  },
  location: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5, // Space between icon and text
    color: '#FFFFFF',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically centered
  },
  
  alertDate: {
    fontSize: 12,
    color: '#f0f0f0',
    marginLeft: 8, 
   
  },
  separator: {
    height: 1,
    backgroundColor: 'lightgray',
    marginVertical: 10,
  },
  verticalSeparator: {
    width: 1,
    height: '100%',
    backgroundColor: 'lightgray',
    
    marginHorizontal: 10,
  },
  alertMessage: {
    fontSize: 14,
    color: '#fff', // Change text color for better readability
    lineHeight: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  dot: {
    fontSize: 20,
    marginHorizontal: 5,
  },
  activeDot: {
    color: '#0A477F',
  },
  inactiveDot: {
    color: 'lightgray',
  },

  weatherBox: {
    backgroundColor: '#fff',
    overflow: 'hidden',
    position: 'relative', 
  },
  gradient: {
    position: 'absolute', 
    left: 0,             
    right: 0,            
    top: 0,              
    bottom: 0,           
    borderRadius: 10,
  },
  weatherInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    position: 'relative',
    zIndex: 1
  },
  weatherIcon: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  weatherDetails: {
    flexDirection: 'row',    // Align location/description with temperature
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between'
  },
  textDetails: {
    flexDirection: 'column'
  },
  locationText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 14,
    color: '#FFF',
  },
  temperatureText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,  // Optional, for spacing
  },

  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333',
  },
  emergencyContainer: {
    paddingVertical: 10,
   
  },
  emergencyColumn: {
    flexDirection: 'column',
  },
  emergencyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    marginBottom: 14,
  },
  emergencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    
    padding: 8,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 5,
  },
  emergencyBeginItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    
    padding: 8,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginRight: 5,
  },

  emergencyIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  emergencyIcon_f: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 12,
  },
  emergencyText: {
    fontSize: 14,
    color: '#333',
    flexShrink: 1,
  },
  

  updateCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 8,
    marginLeft:2,
    width: '90%',
    height: 'auto', 
    maxHeight: 400,
   
  },
  

  updateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  updateTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  updateDate: {
    fontSize: 14,
    color: '#888',
  },
  updateIssued: {
    fontSize: 12,
    color: '#555',
   
    left: 0,
  },
  updateMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
  },
  updateImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
    marginTop: 5,
    alignSelf: 'center'
  },
  bottomImage: {
   
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 380, // Adjust height as desired
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 70
    
  },

})
