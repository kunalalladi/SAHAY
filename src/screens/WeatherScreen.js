import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

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
    tstorms: require('../../assets/weatherIcons/tstorms.png'),
  };
  
  const getWeatherIcon = (weather) => {
    if (!weather || weather.length === 0) return null;
  
    const mainWeather = weather[0].main.toLowerCase();
    const weatherDescription = weather[0].description.toLowerCase();
  
    if (mainWeather.includes('clear')) {
      return icons.sunny;
    } else if (mainWeather.includes('cloud')) {
      return icons.cloudy;
    } else if (mainWeather.includes('rain')) {
      return icons.rain;
    } else if (mainWeather.includes('drizzle') || weatherDescription.includes('rain')) {
      return icons.chancerain;
    } else if (mainWeather.includes('snow') || weatherDescription.includes('flurries')) {
      return icons.flurries;
    } else if (mainWeather.includes('thunderstorm')) {
      return icons.tstorms;
    } else if (mainWeather.includes('haze') || weatherDescription.includes('mist')) {
      return icons.hazy;
    } else if (mainWeather.includes('partly cloudy')) {
      return icons.partlycloudy;
    } else if (mainWeather.includes('mostly cloudy')) {
      return icons.mostlycloudy;
    } else if (mainWeather.includes('sleet')) {
      return icons.sleet;
    } else {
      return icons.cloudy; // Default icon
    }
  };


export default function WeatherScreen({ route }) {
  const { weatherData } = route.params;
  const [forecast, setForecast] = useState([]);

  const apiKey = '73501b408356505b4cc980efbb974f73'; // Your API Key

  const fetchForecast = async () => {
    if (weatherData.coord) {
      const { lat, lon } = weatherData.coord;

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`
        );
        const forecastData = await response.json();
        setForecast(forecastData.daily);
      } catch (error) {
        console.error('Error fetching forecast:', error);
      }
    }
  };

  useEffect(() => {
    fetchForecast();
  }, [weatherData]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>7-Day Forecast for {weatherData.name}</Text>
      {forecast.map((day, index) => (
        <View key={index} style={styles.forecastItem}>
          <Text>{new Date(day.dt * 1000).toLocaleDateString()}</Text>
          <Image source={getWeatherIcon(day.weather[0].main)} style={styles.icon} />
          <Text>{day.temp.day.toFixed()}°C</Text>
          <Text>{day.weather[0].description}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  forecastItem: {
    backgroundColor: '#00bfff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
  },
});
