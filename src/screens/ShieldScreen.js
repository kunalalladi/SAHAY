import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AntDesign, EvilIcons, Ionicons } from '@expo/vector-icons'; // Importing icons
import { useNavigation } from '@react-navigation/native';

const updatesData = [
  {
    id: '1',
    title: 'Flood Update',
    date: '2024-10-01',
    issuedBy: 'Admin',
    message: 'Severe floods have affected multiple regions, leading to significant disruptions in daily life. Many communities are currently experiencing rising water levels, which have caused road closures and limited access to essential services. Local authorities are working around the clock to assess the situation and provide assistance where needed. As the floodwaters continue to rise, it is crucial for residents to stay informed and prepared for any emergency situations that may arise. Emergency services are actively conducting rescues and providing shelter to those displaced. Evacuation centers have been set up in various locations, and officials encourage residents to utilize these resources if their homes become unsafe. Please ensure that you have a plan in place for your family and pets, including a designated meeting point and an emergency kit stocked with supplies such as food, water, and first-aid items. Stay tuned for ongoing updates regarding evacuation protocols and safety instructions. Authorities will provide guidance on when and where to evacuate, as well as any roadblocks that may hinder travel. It is essential to listen to local news broadcasts and follow official social media accounts for real-time updates, as conditions can change rapidly. We also urge residents to avoid non-essential travel in affected areas. The safety of our community is the top priority, and minimizing unnecessary movement will allow emergency personnel to focus on rescue operations and restoring order. If you must travel, please exercise extreme caution and be aware of your surroundings. Lastly, we emphasize the importance of community support during this challenging time. If you are in a position to help neighbors or those in need, please reach out and offer assistance. Together, we can navigate through this crisis and ensure that everyone has the resources they need to stay safe and secure.',
    image: require('../../assets/images/update_img.jpg'),
    disasterType: 'Flood',
    location: { latitude: 37.7749, longitude: -122.4194 },
  },
  {
    id: '2',
    title: 'Hurricane Alert',
    date: '2024-10-02',
    issuedBy: 'Weather Department',
    message: 'A powerful hurricane, classified as a category 4, is expected to make landfall shortly. The approaching storm poses a serious threat to residents in its path, with high winds and heavy rainfall anticipated. Authorities are urging everyone to take this warning seriously and to make necessary preparations as soon as possible. Residents are strongly advised to stay indoors and avoid any unnecessary travel. This hurricane could bring life-threatening conditions, including storm surges and flooding. It’s crucial to secure your property by bringing in outdoor furniture and securing windows and doors. Ensure that you have sufficient supplies, including food, water, batteries, and medications, to last through the storm. In addition to preparing your home, it’s vital to have a communication plan in place with family and friends. Make sure everyone knows how to reach one another in case of emergencies. Designate a safe location where you can meet if separated. If you live in an area prone to flooding or high winds, consider evacuating to a safer location ahead of the storm. Stay tuned for updates from local authorities regarding evacuation orders and safety measures. They will provide detailed information on shelter locations and emergency services available during the hurricane. Follow local news outlets and official social media channels for real-time updates and instructions. As we face this significant weather event, let’s come together as a community. Check on your neighbors, especially those who may need extra help, such as the elderly or those with disabilities. Supporting one another can make a tremendous difference in how we cope with this storm and its aftermath.',
    image: require('../../assets/images/update_img.jpg'),
    disasterType: 'Hurricane',
    location: { latitude: 29.7604, longitude: -95.3698 },
  },
  {
    id: '3',
    title: 'Earthquake Aftershock',
    date: '2024-10-03',
    issuedBy: 'Local Authorities',
    message: 'Following the major earthquake earlier this week, aftershocks have been recorded in the region. These tremors can be unsettling and pose additional risks to buildings and infrastructure that may have already been weakened. Residents are urged to remain vigilant and prioritize safety as they navigate their daily activities. Local authorities recommend that individuals exercise caution, especially in areas that were heavily impacted by the initial quake. If you live in a damaged structure, it may be wise to seek temporary shelter until a thorough inspection can be completed. Pay attention to local news for updates on building safety assessments and follow the guidance provided by emergency services. It’s important to refresh your knowledge of earthquake safety protocols. This includes “Drop, Cover, and Hold On” techniques during tremors and having a preparedness plan for future incidents. Make sure that your emergency kit is stocked with necessary supplies, including food, water, flashlights, and first-aid materials. Stay informed about aftershock patterns and related safety measures through reliable news sources. Emergency services will continue to monitor seismic activity and provide timely updates. Residents should also familiarize themselves with the locations of emergency shelters should they need to evacuate. In this time of uncertainty, community support is crucial. Check in on neighbors and family members, especially those who may be feeling anxious or overwhelmed. By looking out for one another, we can help foster a sense of security and resilience in the face of these challenges.',
    image: require('../../assets/images/update_img.jpg'),
    disasterType: 'Earthquake',
    location: { latitude: 34.0522, longitude: -118.2437 },
  },
];


const UpdatesScreen = () => {
  const [sortOrder, setSortOrder] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDisaster, setSelectedDisaster] = useState(null);
  const [optionsVisible, setOptionsVisible] = useState(false); // State to manage options visibility
  const navigation = useNavigation();

  const filteredUpdates = updatesData
    .filter(update =>
      (searchQuery === '' || update.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedDisaster === null || update.disasterType === selectedDisaster)
    )
    .sort((a, b) => {
      return sortOrder === 'earliest'
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    });

  const renderUpdates = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', { item })}
      style={styles.updateCard}
    >
      <Image source={item.image} style={styles.updateImage} />
      <View style={styles.textContent}>
        <View style={styles.updateHeader}>
          <Text style={styles.updateTitle} numberOfLines={1} ellipsizeMode="tail">
            {item.title}
          </Text>
          <Text style={styles.updateDate}>{item.date}</Text>
        </View>
        <Text style={styles.updateIssued}>Issued by: {item.issuedBy}</Text>
        <Text style={styles.updateMessage} numberOfLines={3} ellipsizeMode="tail">{item.message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

    <View style={styles.headerContainer}>
      {/* Left Circular Button */}
      
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.circleButton}>
        <Ionicons name="chevron-back" size={20} color="#0A477F" />
      </TouchableOpacity>

      {/* Centered Header Text */}
      <Text style={styles.headerText}>Shield</Text>
    </View>
      


      <ScrollView
        horizontal
        style={styles.emergencyContainer}
        contentContainerStyle={styles.emergencyContentContainer}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.emergencyColumn}>
          <View style={styles.emergencyRow}>
            <TouchableOpacity
              style={styles.emergencyAllItem}
              onPress={() => setSelectedDisaster('All')}
            >
              <Text style={styles.emergencyText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.emergencyBeginItem}
              onPress={() => setSelectedDisaster('Landslide')}
            >
              <Image
                source={require('../../assets/images/landslide_s.jpg')}
                style={styles.emergencyIcon}
              />
              <Text style={styles.emergencyText}>Landslide</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.emergencyItem}
              onPress={() => setSelectedDisaster('Earthquake')}
            >
              <Image
                source={require('../../assets/images/earthquake_s.jpg')}
                style={styles.emergencyIcon}
              />
              <Text style={styles.emergencyText}>Earthquake</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.emergencyItem}
              onPress={() => setSelectedDisaster('Heatwave')}
            >
              <Image
                source={require('../../assets/images/heatwave_s.jpg')}
                style={styles.emergencyIcon}
              />
              <Text style={styles.emergencyText}>Heatwave</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.emergencyBeginItem}>
              <Image
                source={require('../../assets/images/Thunderstrom_s.jpg')}
                style={styles.emergencyIcon}
              />
              <Text style={styles.emergencyText}>Thunderstorm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.emergencyItem}>
              <Image
                source={require('../../assets/images/floods_s.jpg')}
                style={styles.emergencyIcon_f}
              />
              <Text style={styles.emergencyText}>Flood</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.emergencyItem}>
              <Image
                source={require('../../assets/images/tsunami_s.jpg')}
                style={styles.emergencyIcon}
              />
              <Text style={styles.emergencyText}>Tsunami</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Search and Filter Row */}
      <View style={styles.filterContainer}>
        <View style={styles.searchContainer}>
          <EvilIcons name="search" size={24} color="black" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for updates..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Single Filter Button */}
        <TouchableOpacity 
          style={styles.filterButton} 
          onPress={() => setOptionsVisible(prev => !prev)} // Toggle options visibility
        >
          <AntDesign name="filter" size={20} color="white" />
        </TouchableOpacity>

        {/* Conditional rendering of sort options */}
        {optionsVisible && (
          <View style={styles.optionsContainer}>
            <TouchableOpacity onPress={() => { setSortOrder('latest'); setOptionsVisible(false); }} style={styles.optionButton}>
              <Text style={styles.optionText}>Latest</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setSortOrder('earliest'); setOptionsVisible(false); }} style={styles.optionButton}>
              <Text style={styles.optionText}>Earliest</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Updates List */}
      <FlatList
        data={filteredUpdates}
        keyExtractor={(item) => item.id}
        renderItem={renderUpdates}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9', paddingTop: 20 , marginBottom:65},

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F9F9F9', 
    position: 'relative', 
   
  },
  circleButton: {
    position: 'absolute',
    left: 20, // Position button towards the left side
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff', // Circle button color (same as header background or contrasting color)
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
    color: '#333',
  },
  
  
  emergencyContainer: {
    paddingVertical: 10,
    marginHorizontal: 16

  },
  emergencyContentContainer: {
    justifyContent: 'center',
    alignItems: 'center', 
  },

  emergencyColumn: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  emergencyRow: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center', 
   
    paddingVertical: 18,
    
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
    marginHorizontal: 5,
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
  
  emergencyAllItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 60,
    padding: 14,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 5,
    alignContent: 'center',
    justifyContent: 'center', 
  },
  
  filterContainer: { 

    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    
   
  },
  searchContainer: {
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
  
    marginHorizontal: 10,
   

   
  },
  searchInput: {
    flex: 1,
    height: 30,
    marginLeft: 10,
  },
  filterButton: {

    marginRight: 8,
    backgroundColor: '#0A477F',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',

    
  },
  optionsContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    padding: 10,
    top: 60, 
    right: 10,
    borderRadius: 8,
    elevation: 3,
    zIndex: 10,
  },
  optionButton: {
    padding: 10,
  },
  optionText: {
    color: '#333',
  },
  listContainer: { 
    marginHorizontal: 2, 
    marginBottom: 40 
  },
  updateCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    marginVertical: 10,
    overflow: 'hidden',
    alignSelf: 'center',
    width: '92%',
  },
  updateImage: { width: '100%', height: 150, resizeMode: 'cover' },
  textContent: { padding: 15 },
  updateHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  updateTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', flex: 1 },
  updateDate: { fontSize: 14, color: '#888' },
  updateIssued: { fontSize: 12, color: '#555', marginBottom: 5 },
  updateMessage: { fontSize: 14, color: '#666', lineHeight: 20 },
});

export default UpdatesScreen;
