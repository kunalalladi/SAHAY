import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Animated,
  PanResponder
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import YoutubeIframe from 'react-native-youtube-iframe'
import preparedness from '../data/preparedness.json'
import dosAndDonts from '../data/dos_and_donts.json'

const imageMapping = {
  flood_image: require('../../assets/images/floods_s.jpg'),
  earthquake_image: require('../../assets/images/earthquake_s.jpg'),

  tsunami_image: require('../../assets/images/tsunami_s.jpg'),

  heatwave_image: require('../../assets/images/heatwave_s.jpg'),
  landslide_image: require('../../assets/images/landslide_s.jpg'),

  thunderstorm_image: require('../../assets/images/Thunderstrom_s.jpg')
}

const DisasterDetails = ({ route, navigation }) => {
  const { disasterType, imageSource } = route.params
  const [selectedTab, setSelectedTab] = useState('Guide')
  const [activeVideoId, setActiveVideoId] = useState(null)

  const disasterData = preparedness.disasters.find(
    d => d.type.toLowerCase() === disasterType.toLowerCase()
  )
  const dosAndDontData = dosAndDonts.disasters.find(
    d => d.type.toLowerCase() === disasterType.toLowerCase()
  )

  const handleVideoPlay = videoId => {
    setActiveVideoId(videoId)
  }

  // PanResponder for swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
        Math.abs(gestureState.dx) > 20,
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < 0) {
          setSelectedTab("Do's and Don'ts")
        } else if (gestureState.dx > 0) {
          setSelectedTab('Guide')
        }
      }
    })
  ).current

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.circleButton}>
        <Ionicons name="chevron-back" size={20} color="white" />
      </TouchableOpacity>
      <View style={styles.header}>
        <Image source={imageSource} style={styles.image} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{disasterType}</Text>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setSelectedTab('Guide')}
          style={selectedTab === 'Guide' ? styles.activeTab : styles.tab}
        >
          <Text style={styles.tabText}>Guide</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("Do's and Don'ts")}
          style={
            selectedTab === "Do's and Don'ts" ? styles.activeTab : styles.tab
          }
        >
          <Text style={styles.tabText}>Do's and Don'ts</Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'Guide' && disasterData && disasterData.resources ? (
        <FlatList
          data={disasterData.resources}
          keyExtractor={item => item.link}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const videoId = item.link.split('=')[1]
            return (
              <View style={styles.videoContainer}>
                <YoutubeIframe
                  height={200}
                  play={activeVideoId === videoId}
                  videoId={videoId}
                  onReady={() => console.log('Video ready')}
                  onError={error => console.log('Video error', error)}
                  onChangeState={event => {
                    if (event === 'playing') {
                      handleVideoPlay(videoId)
                    }
                  }}
                />
                <Text style={styles.videoTitle}>{item.title}</Text>
              </View>
            )
          }}
        />
      ) : selectedTab === "Do's and Don'ts" && dosAndDontData ? (
        <View style={styles.dosAndDontsContainer}>
          <FlatList
            data={[
              { title: "Do's", data: dosAndDontData.dos },
              { title: "Don'ts", data: dosAndDontData.donts }
            ]}
            showsVerticalScrollIndicator={false}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            removeClippedSubviews={true}
            keyExtractor={(item, index) => `section-${index}`}
            renderItem={({ item }) => (
              <>
                <View style={styles.sectionTitleContainer}>
                  <Text style={styles.sectionTitle}>{item.title}</Text>
                </View>
                {item.data.map((subItem, index) => (
                  <View key={`${item.title}-${index}`} style={styles.dosItem}>
                    <Image
                      source={imageMapping[subItem.image]}
                      style={styles.dosImage}
                    />
                    <Text style={styles.dosText}>{subItem.advice}</Text>
                  </View>
                ))}
              </>
            )}
          />
        </View>
      ) : (
        <Text style={styles.errorMessage}>
          No data available for this disaster type.
        </Text>
      )}
    </View>
  )
}

export default DisasterDetails
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#FAFAFA' }, // Light, warm background
    circleButton: {
      position: 'absolute',
      top: 20,
      left: 20, 
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#0A477F', // Circle button color (same as header background or contrasting color)
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:30,
      marginBottom: 20,
    },
    image: { width: 100, height: 100, borderRadius: 50, marginRight: -30 },
    titleContainer: {
      backgroundColor: '#0A477F', // Main dark blue
      borderRadius: 30,
      paddingLeft: 40,
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginLeft: -5,
      zIndex: -1,
    },
    title: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' }, // White text for contrast
    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#EAF6FF', // Light, soft blue for tab container
      borderRadius: 20,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      marginBottom: 20,
      paddingVertical: 10,
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 10,
      borderRadius: 20,
      backgroundColor: '#A1C9F1', // Medium, gentle blue for inactive tabs
      marginHorizontal: 5,
    },
    activeTab: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 10,
      borderRadius: 20,
      backgroundColor: '#0A477F', // Main dark blue for active tab
      marginHorizontal: 5,
    },
    tabText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFFFFF', // White text for tabs
    },
    videoContainer: {
      marginBottom: 20,
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: '#F4F8FA', // Very light, neutral blue-gray for video background
      paddingHorizontal: 10,
    },
    videoTitle: { textAlign: 'center', fontSize: 16, marginTop: 5, color: '#334E68' }, // Darker gray-blue for video titles
    dosAndDontsContainer: { paddingHorizontal: 5 },
    sectionTitleContainer: {
      backgroundColor: '#0A477F', // Main dark blue for section title background
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginBottom: 20,
      alignSelf: 'flex-start',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#FFFFFF', // White text for contrast
    },
    dosItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        marginLeft: 20,
        backgroundColor: '#D9ECF2',
        padding: 10,
        borderRadius: 10,
        maxWidth: '90%', // Set a max width to control the item width
      },
      
      dosImage: { 
        width: 50, 
        height: 50, 
        borderRadius: 5, 
        marginRight: 10 
      },
      
      dosText: { 
        fontSize: 16, 
        color: '#334E68', 
        flex: 1, // Allow text to take up remaining space
        flexWrap: 'wrap', // Enable text wrapping
      },
      
    errorMessage: {
      textAlign: 'center',
      fontSize: 16,
      color: '#D9534F', 
      marginTop: 20,
    },
  });
  