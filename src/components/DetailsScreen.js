import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Share, Dimensions, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const DetailsScreen = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();

  const shareMessage = `Check out this disaster update: ${item.title}\nDetails: ${item.message}`;

  const onShare = async () => {
    try {
      await Share.share({
        message: shareMessage,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} />
          <View style={styles.overlay} />
          <Text style={styles.imageTitle}>{item.title}</Text>
          
          {/* Back Button */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons name="chevron-left" size={32} color="#FFF" />
          </TouchableOpacity>

          {/* Share Button on Image */}
          <TouchableOpacity 
            style={styles.imageShareButton}
            onPress={onShare}
          >
            <MaterialCommunityIcons name="share-variant" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
        <View style={styles.headerInfo}>
          <View style={styles.headerCard}>
            <View style={styles.dateContainer}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="calendar-clock" size={24} color="#007AFF" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.labelText}>Date</Text>
                <Text style={styles.valueText}>{item.date}</Text>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.issuedByContainer}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="shield-check" size={24} color="#007AFF" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.labelText}>Issued By</Text>
                <Text style={styles.valueText}>{item.issuedBy}</Text>
              </View>
            </View>
          </View>
        </View>


          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="alert-circle-outline" size={24} color="#007AFF" />
              <Text style={styles.cardHeaderText}>Details</Text>
            </View>
            <Text style={styles.message}>{item.message}</Text>
          </View>

          <View style={styles.mapCard}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="map-marker-radius" size={24} color="#007AFF" />
              <Text style={styles.cardHeaderText}>Location</Text>
            </View>
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: item.location.latitude,
                  longitude: item.location.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: item.location.latitude,
                    longitude: item.location.longitude,
                  }}
                  title={item.title}
                  description={item.message}
                />
              </MapView>
            </View>
          </View>

          <TouchableOpacity style={styles.actionButton} onPress={onShare}>
            <MaterialCommunityIcons name="share-variant" size={24} color="white" />
            <Text style={styles.actionButtonText}>Share Update</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    height: 350,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    backgroundGradient: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7))',
  },
  backButton: {
    position: 'absolute',
    top: 44,
    left: 20,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageShareButton: {
    position: 'absolute',
    top: 44,
    right: 20,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  imageTitle: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    color: 'white',
    fontSize: 32,
    fontFamily: 'System',
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  contentContainer: {
    padding: 20,
    marginTop: -30,
    backgroundColor: '#f8f9fa',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  headerInfo: {
    marginVertical: 20,
    paddingHorizontal: 2,
  },
  headerCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dateContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  issuedByContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  labelText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
    fontFamily: 'System',
    fontWeight: '500',
  },
  valueText: {
    fontSize: 15,
    color: '#2c3e50',
    fontFamily: 'System',
    fontWeight: '600',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 15,
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardHeaderText: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
    color: '#2c3e50',
    fontFamily: 'System',
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2c3e50',
    fontFamily: 'System',
  },
  mapCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mapContainer: {
    height: 250,
    borderRadius: 15,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 15,
    marginTop: 10,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    fontFamily: 'System',
  },
});

export default DetailsScreen;