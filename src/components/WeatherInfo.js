// import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
// import React, { useState } from 'react'
// import { Image } from 'react-native'
// import { ScrollView, TextInput } from 'react-native-gesture-handler'
// import { LinearGradient } from 'expo-linear-gradient'
// import { Entypo, EvilIcons, Fontisto, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

// const { width } = Dimensions.get('window');

// const WeatherInfo = () => {
//   const [showSearch, toggleSearch] = useState(false);
//   const [locations, setLocations] = useState([1, 2, 3]);

//   const handleLocation = (loc) => {
//     console.log("location: ", loc);
//   };

//   const renderHourlyForecast = () => {
//     const hours = [
//       { time: 'Now', temp: '22°', icon: 'partly-cloudy' },
//       { time: '2 PM', temp: '24°', icon: 'sunny' },
//       { time: '3 PM', temp: '23°', icon: 'partly-cloudy' },
//       { time: '4 PM', temp: '21°', icon: 'cloudy' },
//       { time: '5 PM', temp: '20°', icon: 'rainy' },
//     ];

//     return (
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.hourlyForecastContainer}
//       >
//         {hours.map((hour, index) => (
//           <View key={index} style={styles.hourlyCard}>
//             <Text style={styles.hourlyTime}>{hour.time}</Text>
//             <MaterialCommunityIcons
//               name="weather-partly-cloudy"
//               size={24}
//               color="white"
//               style={styles.hourlyIcon}
//             />
//             <Text style={styles.hourlyTemp}>{hour.temp}</Text>
//           </View>
//         ))}
//       </ScrollView>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <LinearGradient
//         colors={['#0A477F', '#1D68B2', '#4CB2DA']}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={styles.gradient}
//       />
      
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={styles.searchWrapper}>
//           <View style={[styles.searchBar, showSearch && { backgroundColor: "rgba(255, 255, 255, 0.15)" }]}>
//             {showSearch && (
//               <TextInput 
//                 placeholder="Search city" 
//                 placeholderTextColor="rgba(255, 255, 255, 0.6)" 
//                 style={styles.searchInput}
//               />
//             )}
//             <TouchableOpacity 
//               onPress={() => toggleSearch(!showSearch)} 
//               style={styles.searchIconWrapper}
//             >
//               <EvilIcons name="search" size={28} color="white" />
//             </TouchableOpacity>
//           </View>

//           {locations.length > 0 && showSearch && (
//             <View style={styles.locationsDropdown}>
//               {locations.map((loc, index) => (
//                 <TouchableOpacity 
//                   onPress={() => handleLocation(loc)} 
//                   key={index} 
//                   style={[styles.locationItem, index + 1 !== locations.length && styles.locationItemBorder]}
//                 >
//                   <Entypo name="location-pin" size={24} color="#4C6FDB" />
//                   <Text style={styles.locationText}>London, United Kingdom</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           )}
//         </View>

//         <View style={styles.weatherInfo}>
//           <View style={styles.locationHeader}>
//             <Entypo name="location-pin" size={24} color="white" />
//             <Text style={styles.cityText}>
//               London, <Text style={styles.countryText}>United Kingdom</Text>
//             </Text>
//           </View>

//           <View style={styles.mainWeather}>
//             <Image 
//               source={require('../../assets/weatherIcons/chancerain.png')} 
//               style={styles.weatherIcon} 
//             />
//             <View style={styles.tempWrapper}>
//               <Text style={styles.temperature}>22°c</Text>
//               <Text style={styles.weatherDescription}>Partly cloudy</Text>
//             </View>
//           </View>

//           <View style={styles.detailsCard}>
//             <View style={styles.detailItem}>
//               <Feather name="wind" size={22} color="white" />
//               <Text style={styles.detailLabel}>Wind</Text>
//               <Text style={styles.detailText}>12 km/h</Text>
//             </View>
//             <View style={styles.detailDivider} />
//             <View style={styles.detailItem}>
//               <MaterialCommunityIcons name="water-percent" size={22} color="white" />
//               <Text style={styles.detailLabel}>Humidity</Text>
//               <Text style={styles.detailText}>23%</Text>
//             </View>
//             <View style={styles.detailDivider} />
//             <View style={styles.detailItem}>
//               <Feather name="sunrise" size={22} color="white" />
//               <Text style={styles.detailLabel}>Sunrise</Text>
//               <Text style={styles.detailText}>6:05 AM</Text>
//             </View>
//           </View>

//           <View style={styles.hourlyForecastSection}>
//             <Text style={styles.sectionTitle}>Hourly Forecast</Text>
//             {renderHourlyForecast()}
//           </View>

//           <View style={styles.forecastWrapper}>
//             <View style={styles.dailyForecastHeader}>
//               <Fontisto name="date" size={22} color="white" />
//               <Text style={styles.sectionTitle}>Weekly Forecast</Text>
//             </View>

//             {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
//               <View key={index} style={styles.forecastCard}>
//                 <Text style={styles.forecastDay}>{day}</Text>
//                 <View style={styles.forecastMiddle}>
//                   <Image 
//                     source={require('../../assets/weatherIcons/chancerain.png')} 
//                     style={styles.forecastIcon} 
//                   />
//                   <Text style={styles.forecastDesc}>Partly cloudy</Text>
//                 </View>
//                 <View style={styles.forecastTemps}>
//                   <Text style={styles.forecastHighTemp}>25°</Text>
//                   <Text style={styles.forecastLowTemp}>18°</Text>
//                 </View>
//               </View>
//             ))}
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default WeatherInfo;




import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Image, TextInput, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo, EvilIcons, Fontisto, Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'

const { width } = Dimensions.get('window');

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
  
    if (mainWeather.includes('clear')||
      weatherDescription.includes('clear sky')) {
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

const apiKey = "73501b408356505b4cc980efbb974f73";

const WeatherInfo = () => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [locations, setLocations] = useState([1, 2, 3]);
    const [hourlyForecast, setHourlyForecast] = useState(null);
    const [weeklyForecast, setWeeklyForecast] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showSearch, toggleSearch] = useState(false);

    const navigation = useNavigation()
  
    const formatTime = (timestamp) => {
      return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    };
  
    const fetchWeatherData = async () => {
      setIsLoading(true);
      try {
        const storedLocation = await AsyncStorage.getItem('userLocation');
        const userLocation = storedLocation ? JSON.parse(storedLocation) : null;
  
        if (userLocation) {
          const { latitude, longitude } = userLocation;
          
          // Fetch current weather
          const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
          );
          const currentData = await currentResponse.json();
          
          // Check if the response is valid
          if (currentData.cod === 200) {
            setCurrentWeather(currentData);
          } else {
            throw new Error(currentData.message);
          }
  
          // Fetch hourly and weekly forecast
          const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
          );
          const forecastData = await forecastResponse.json();
          
          if (forecastData.cod === "200") {
            setHourlyForecast(forecastData);
            setWeeklyForecast(forecastData);
          } else {
            throw new Error(forecastData.message);
          }
  
          setError('');
        } else {
          setError("Location not found");
        }
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      fetchWeatherData();
      const intervalId = setInterval(fetchWeatherData, 1800000);
      return () => clearInterval(intervalId);
    }, []);
  
    const processHourlyForecast = () => {
      if (!hourlyForecast?.list) return [];
      
      return hourlyForecast.list
        .slice(0, 8) // Show next 8 hours
        .map(item => ({
          time: new Date(item.dt * 1000).getHours(),
          temp: Math.round(item.main.temp),
          weather: item.weather,
          description: item.weather[0].description
        }));
    };
  
    const processWeeklyForecast = () => {
      if (!weeklyForecast?.list) return [];
      
      const dailyForecasts = {};
      weeklyForecast.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!dailyForecasts[date]) {
          dailyForecasts[date] = {
            temps: [],
            weather: [],
            date: new Date(item.dt * 1000),
          };
        }
        dailyForecasts[date].temps.push(item.main.temp);
        dailyForecasts[date].weather.push(item.weather[0]);
      });
  
      return Object.values(dailyForecasts)
        .slice(0, 7) // Show only next 7 days
        .map(day => ({
          date: day.date,
          temp_max: Math.round(Math.max(...day.temps)),
          temp_min: Math.round(Math.min(...day.temps)),
          weather: day.weather[Math.floor(day.weather.length / 2)], // Take middle of day weather
        }));
    };
  
    const renderHourlyForecast = () => {
      const hourlyData = processHourlyForecast();
      return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hourlyForecastContainer}>
          {hourlyData.map((hour, index) => (
            <View key={index} style={styles.hourlyCard}>
              <Text style={styles.hourlyTime}>{hour.time}:00</Text>
              <Image source={getWeatherIcon(hour.weather)} style={[styles.weatherIcon, styles.hourlyIcon]} />
              <Text style={styles.hourlyTemp}>{hour.temp}°C</Text>
              <Text style={styles.hourlyDesc} numberOfLines={1}>{hour.description}</Text>
            </View>
          ))}
        </ScrollView>
      );
    };
  
    const renderWeeklyForecast = () => {
      const weeklyData = processWeeklyForecast();
      return (
        <View style={styles.forecastWrapper}>
          {weeklyData.map((day, index) => (
            <View key={index} style={styles.forecastCard}>
              <Text style={styles.forecastDay}>
                {day.date.toLocaleDateString('en-US', { weekday: 'short' })}
              </Text>
              <View style={styles.forecastMiddle}>
                <Image source={getWeatherIcon([day.weather])} style={[styles.weatherIcon, styles.forecastIcon]} />
                <Text style={styles.forecastDesc} numberOfLines={1}>{day.weather.description}</Text>
              </View>
              <View style={styles.forecastTemps}>
                <Text style={styles.forecastHighTemp}>{day.temp_max}°</Text>
                <Text style={styles.forecastLowTemp}>{day.temp_min}°</Text>
              </View>
            </View>
          ))}
        </View>
      );
    };
  
    if (isLoading && !currentWeather) {
      return (
        <View style={[styles.container, styles.centerContent]}>
          <LinearGradient
            colors={['#0A477F', '#1D68B2', '#4CB2DA']}
            style={StyleSheet.absoluteFill}
          />
          <ActivityIndicator size="large" color="white" />
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#0A477F', '#1D68B2', '#4CB2DA']}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.headerContainer}>
            {/* Left Circular Button */}
            <TouchableOpacity style={styles.circleButton} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={20} color="white" />
            </TouchableOpacity>

            {/* Centered Header Text */}
            <Text style={styles.headerText}>Weather Info</Text>
        </View>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.searchWrapper}>
            <View style={[styles.searchBar, showSearch && styles.searchBarActive]}>
              {showSearch && (
                <TextInput 
                  placeholder="Search city" 
                  placeholderTextColor="rgba(255, 255, 255, 0.6)" 
                  style={styles.searchInput}
                />
              )}
              <TouchableOpacity 
                onPress={() => toggleSearch(!showSearch)} 
                style={styles.searchIconWrapper}
              >
                <EvilIcons name="search" size={28} color="white" />
              </TouchableOpacity>
            </View>
  
            {locations.length > 0 && showSearch && (
            <View style={styles.locationsDropdown}>
                {locations.map((loc, index) => (
                <TouchableOpacity
                    onPress={() => handleLocation(loc)}
                    key={index}
                    style={[styles.locationItem, index + 1 !== locations.length && styles.locationItemBorder]}
                >
                    <Entypo name="location-pin" size={24} color="#4C6FDB" />
                    <Text style={styles.locationText}>{`${loc.city}, ${loc.country}`}</Text>
                </TouchableOpacity>
                ))}
            </View>
            )}
          </View>
  
          {currentWeather && (
            <View style={styles.weatherInfo}>
              <View style={styles.locationHeader}>
                <Entypo name="location-pin" size={24} color="white" />
                <Text style={styles.cityText}>
                  {currentWeather.name}, <Text style={styles.countryText}>{currentWeather.sys.country}</Text>
                </Text>
              </View>
  
              <View style={styles.mainWeather}>
                <Image 
                  source={getWeatherIcon(currentWeather.weather)} 
                  style={[styles.weatherIcon, styles.mainWeatherIcon]} 
                />
                <View style={styles.tempWrapper}>
                  <Text style={styles.temperature}>{currentWeather.main ? `${Math.round((currentWeather.main.temp - 32) * 5/9)}°C` : 'Loading...'}</Text>
                  <Text style={styles.weatherDescription}>
                    {currentWeather.weather[0].description}
                  </Text>
                </View>
              </View>
  
              <View style={styles.detailsCard}>
                <View style={styles.detailItem}>
                  <Feather name="wind" size={22} color="white" />
                  <Text style={styles.detailLabel}>Wind</Text>
                  <Text style={styles.detailText}>
                    {Math.round(currentWeather.wind.speed)} km/h
                  </Text>
                </View>
                <View style={styles.detailDivider} />
                <View style={styles.detailItem}>
                  <MaterialCommunityIcons name="water-percent" size={22} color="white" />
                  <Text style={styles.detailLabel}>Humidity</Text>
                  <Text style={styles.detailText}>
                    {currentWeather.main.humidity}%
                  </Text>
                </View>
                <View style={styles.detailDivider} />
                <View style={styles.detailItem}>
                  <Feather name="sunrise" size={22} color="white" />
                  <Text style={styles.detailLabel}>Sunrise</Text>
                  <Text style={styles.detailText}>
                    {formatTime(currentWeather.sys.sunrise)}
                  </Text>
                </View>
              </View>
  
              <View style={styles.hourlyForecastSection}>
                <Text style={styles.sectionTitle}>Hourly Forecast</Text>
                {renderHourlyForecast()}
              </View>
  
              <View style={styles.forecastWrapper}>
                <View style={styles.dailyForecastHeader}>
                  <Fontisto name="date" size={22} color="white" />
                  <Text style={styles.sectionTitle}>Weekly Forecast</Text>
                </View>
                {renderWeeklyForecast()}
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    );
  };
  

export default WeatherInfo;


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        marginTop: 10,
        position: 'relative', 
       
      },
      circleButton: {
        position: 'absolute',
        left: 20, // Position button towards the left side
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#1D68B2', // Circle button color (same as header background or contrasting color)
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4
      },
      headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
      },

    centerContent: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchWrapper: {
      marginHorizontal: 20,
      marginTop: 20,
      zIndex: 50,
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 30,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
      elevation: 2,
    },
    searchBarActive: {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
    },
    searchInput: {
      paddingHorizontal: 20,
      height: 50,
      flex: 1,
      fontSize: 16,
      color: 'white',
    },
    searchIconWrapper: {
      padding: 12,
      borderRadius: 25,
    },
    locationsDropdown: {
      marginTop: 8,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5,
    },
    locationItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
    },
    locationItemBorder: {
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },
    locationText: {
      color: '#333',
      fontSize: 16,
      marginLeft: 12,
    },
    weatherInfo: {
      marginHorizontal: 20,
      marginTop: 20,
    },
    locationHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cityText: {
      color: 'white',
      fontSize: 24,
      fontWeight: '600',
      marginLeft: 8,
    },
    countryText: {
      fontSize: 24,
      fontWeight: '400',
      color: 'rgba(255, 255, 255, 0.8)',
    },
    mainWeather: {
      alignItems: 'center',
      marginTop: 20,
    },
    weatherIcon: {
      width: 120,
      height: 120,
    },
    mainWeatherIcon: {
      width: 160,
      height: 160,
    },
    hourlyIcon: {
      width: 50,
      height: 50,
    },
    forecastIcon: {
      width: 30,
      height: 30,
    },
    tempWrapper: {
      alignItems: 'center',
      marginTop: 10,
    },
    temperature: {
      fontSize: 72,
      fontWeight: 'bold',
      color: 'white',
      includeFontPadding: false,
      textShadowColor: 'rgba(0, 0, 0, 0.1)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 10,
    },
    weatherDescription: {
      fontSize: 20,
      color: 'rgba(255, 255, 255, 0.8)',
      fontWeight: '500',
      marginTop: -5,
      textTransform: 'capitalize',
    },

    detailsCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 20,
        marginTop: 30,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        
      },

 
      detailItem: {
        alignItems: 'center',
        flex: 1,
        paddingVertical: 8,
      },
      detailDivider: {
        width: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginHorizontal: 10,
      },
      detailLabel: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 14,
            marginTop: 8,
            fontWeight: '500',
          },
      detailText: {
            color: 'white',
            fontSize: 16,
            fontWeight: '600',
            marginTop: 4,
            textShadowColor: 'rgba(0, 0, 0, 0.1)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 2,
          },
        hourlyForecastSection: {
            marginTop: 30,
        },
        sectionTitle: {
            color: 'white',
            fontSize: 20,
            fontWeight: '600',
            marginLeft: 8,
            textShadowColor: 'rgba(0, 0, 0, 0.1)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 2,
          },
          hourlyForecastContainer: {
            paddingVertical: 20,
          },
          hourlyCard: {
            alignItems: 'center',
            marginRight: 16,
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            borderRadius: 15,
            padding: 12,
            width: 90,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.2)',
            
          },
          hourlyTime: {
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: 14,
            fontWeight: '500',
            marginBottom: 8,
          },
          hourlyTemp: {
            color: 'white',
            fontSize: 18,
            fontWeight: '600',
            marginTop: 8,
            textShadowColor: 'rgba(0, 0, 0, 0.1)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 2,
          },
          hourlyDesc: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 12,
            textAlign: 'center',
            marginTop: 4,
            textTransform: 'capitalize',
          },

          forecastWrapper: {
            marginTop: 30,
            marginBottom: 30,
          },
          dailyForecastHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
          },
          forecastCard: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            borderRadius: 20,
            marginBottom: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.2)',
            
          },
          forecastDay: {
            color: 'white',
            fontSize: 16,
            fontWeight: '600',
            width: 60,
            textShadowColor: 'rgba(0, 0, 0, 0.1)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 2,
          },
          forecastMiddle: {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            marginLeft: 10,
          },
          forecastDesc: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 14,
            marginLeft: 8,
            flex: 1,
            textTransform: 'capitalize',
          },
          forecastTemps: {
            flexDirection: 'row',
            alignItems: 'center',
            width: 80,
            justifyContent: 'flex-end',
          },
          forecastHighTemp: {
            color: 'white',
            fontSize: 16,
            fontWeight: '600',
            textShadowColor: 'rgba(0, 0, 0, 0.1)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 2,
          },
          forecastLowTemp: {
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: 16,
            marginLeft: 8,
          },
});




