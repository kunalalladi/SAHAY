import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const disasters = [
  { id: '1', name: 'Flood', icon: '🌊', guides: 12, disasterType: 'Flood', imageSource: require('../../assets/images/floods_s.jpg')},
  { id: '2', name: 'Earthquake', icon: '🏚️', guides: 8, disasterType: 'Earthquake', imageSource: require('../../assets/images/earthquake_s.jpg') },
  { id: '3', name: 'Thunderstorm', icon: '⛈️', guides: 15, disasterType: 'Thunderstrom', imageSource: require('../../assets/images/Thunderstrom_s.jpg') },
  { id: '4', name: 'Tsunami', icon: '🌊', guides: 10, disasterType: 'Tsunami', imageSource: require('../../assets/images/tsunami_s.jpg') },
  { id: '5', name: 'Heatwave', icon: '🌡️', guides: 6, disasterType: 'Heatwave', imageSource: require('../../assets/images/heatwave_s.jpg') },
  { id: '6', name: 'Landslide', icon: '⛰️', guides: 9 , disasterType: 'Landslide', imageSource: require('../../assets/images/landslide_s.jpg') },
];

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const DisasterPreparedness = ({ navigation }) => {
  const renderCard = ({ item, index }) => {
    const scaleAnimation = new Animated.Value(1);

    const onPressIn = () => {
      Animated.spring(scaleAnimation, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const onPressOut = () => {
      Animated.spring(scaleAnimation, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={() => navigation.navigate('DisasterDetails', { 
            disasterType: item.disasterType, imageSource: item.imageSource
        })}
      >
        <Animated.View
          style={[
            styles.card,
            {
              transform: [{ scale: scaleAnimation }],
            },
          ]}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>{item.icon}</Text>
          </View>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <View style={styles.guideContainer}>
            <View style={styles.statusDot} />
            <Text style={styles.guideText}>{item.guides} guides available</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#1a365d" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Disaster Preparedness</Text>
      </View>

      <FlatList
        data={disasters}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: Platform.OS === 'ios' ? 60 : 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f7fafc',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a365d',
  },
  grid: {
    padding: 12,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 6,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ebf8ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 28,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a365d',
    marginBottom: 8,
  },
  guideContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#48bb78',
    marginRight: 6,
  },
  guideText: {
    fontSize: 12,
    color: '#4a5568',
  },
});

export default DisasterPreparedness;