import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Animated } from 'react-native';
import { AntDesign, EvilIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const notificationsData = [
  {
    id: '1',
    icon: "bell",
    title: "Flash Flood Warning",
    description: "Flash flood warning issued for your area. Please stay alert and avoid low-lying areas. Emergency services are on standby. Follow local authority instructions and keep emergency contacts handy.",
    time: "2 hours ago",
    notificationType: "floods",
    gradient: ['#4A90E2', '#357ABD'],
    priority: "High"
  },
  {
    id: '2',
    icon: "warning",
    title: "Extreme Heat Advisory",
    description: "Heat wave expected to continue for the next 3 days. Stay hydrated and avoid outdoor activities during peak hours. Check on elderly neighbors and keep pets indoors.",
    time: "5 hours ago",
    notificationType: "heatwave",
    gradient: ['#E74C3C', '#C0392B'],
    priority: "Medium"
  },
  {
    id: '3',
    icon: "info-circle",
    title: "Weather Update",
    description: "Clear skies expected for the next 24 hours. Perfect conditions for outdoor emergency preparation and safety checks.",
    time: "1 day ago",
    notificationType: "general",
    gradient: ['#50C878', '#3DA75E'],
    priority: "Low"
  },
  {
    id: '4',
    icon: "info-circle",
    title: "Weather Update",
    description: "Clear skies expected for the next 24 hours. Perfect conditions for outdoor emergency preparation and safety checks.",
    time: "1 day ago",
    notificationType: "general",
    gradient: ['#50C878', '#3DA75E'],
    priority: "Low"
  },{
    id: '5',
    icon: "info-circle",
    title: "Weather Update",
    description: "Clear skies expected for the next 24 hours. Perfect conditions for outdoor emergency preparation and safety checks.",
    time: "1 day ago",
    notificationType: "general",
    gradient: ['#50C878', '#3DA75E'],
    priority: "Low"
  },{
    id: '6',
    icon: "info-circle",
    title: "Weather Update",
    description: "Clear skies expected for the next 24 hours. Perfect conditions for outdoor emergency preparation and safety checks.",
    time: "1 day ago",
    notificationType: "general",
    gradient: ['#50C878', '#3DA75E'],
    priority: "Low"
  },{
    id: '7',
    icon: "info-circle",
    title: "Weather Update",
    description: "Clear skies expected for the next 24 hours. Perfect conditions for outdoor emergency preparation and safety checks.",
    time: "1 day ago",
    notificationType: "general",
    gradient: ['#50C878', '#3DA75E'],
    priority: "Low"
  },{
    id: '8',
    icon: "info-circle",
    title: "Weather Update",
    description: "Clear skies expected for the next 24 hours. Perfect conditions for outdoor emergency preparation and safety checks.",
    time: "1 day ago",
    notificationType: "general",
    gradient: ['#50C878', '#3DA75E'],
    priority: "Low"
  },{
    id: '9',
    icon: "info-circle",
    title: "Weather Update",
    description: "Clear skies expected for the next 24 hours. Perfect conditions for outdoor emergency preparation and safety checks.",
    time: "1 day ago",
    notificationType: "general",
    gradient: ['#50C878', '#3DA75E'],
    priority: "Low"
  },{
    id: '10',
    icon: "info-circle",
    title: "Weather Update",
    description: "Clear skies expected for the next 24 hours. Perfect conditions for outdoor emergency preparation and safety checks.",
    time: "1 day ago",
    notificationType: "general",
    gradient: ['#50C878', '#3DA75E'],
    priority: "Low"
  },
];

const NotificationItem = ({ item, isExpanded, onToggle }) => {
  const [heightAnim] = useState(new Animated.Value(0));
  const [rotateAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(heightAnim, {
        toValue: isExpanded ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(rotateAnim, {
        toValue: isExpanded ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  }, [isExpanded]);

  const rotateZ = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onToggle}
      style={[
        styles.notificationItem,
        isExpanded && styles.notificationItemExpanded
      ]}
    >
      <LinearGradient
        colors={item.gradient}
        style={styles.iconContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <FontAwesome name={item.icon} size={20} color="white" />
      </LinearGradient>
      
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
          <View style={styles.priorityContainer}>
            <Text style={[
              styles.priorityText,
              { color: item.priority === 'High' ? '#E74C3C' : item.priority === 'Medium' ? '#F39C12' : '#2ECC71' }
            ]}>
              {item.priority}
            </Text>
          </View>
        </View>

        <Animated.View style={[
          styles.descriptionContainer,
          {
            maxHeight: heightAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 500]
            }),
          }
        ]}>
          <Text style={styles.description}>{item.description}</Text>
        </Animated.View>

        <Animated.View style={[styles.arrowContainer, { transform: [{ rotateZ }] }]}>
          <Ionicons name="chevron-down" size={20} color="#CBD5E0" />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const NotificationsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const navigation = useNavigation();
  const [sortOrder, setSortOrder] = useState('latest');

  const filteredNotifications = notificationsData.filter(notification =>
    notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notification.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleNotification = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#0A477F" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <EvilIcons name="search" size={24} color="#718096" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search notifications..."
            placeholderTextColor="#718096"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setOptionsVisible(!optionsVisible)}
        >
          <AntDesign name="filter" size={20} color="white" />
        </TouchableOpacity>

        {optionsVisible && (
          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={styles.optionButton}
              onPress={() => {
                setSortOrder('latest');
                setOptionsVisible(false);
              }}
            >
              <Text style={styles.optionText}>Latest First</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.optionButton}
              onPress={() => {
                setSortOrder('earliest');
                setOptionsVisible(false);
              }}
            >
              <Text style={styles.optionText}>Earliest First</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <FlatList
        data={filteredNotifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationItem
            item={item}
            isExpanded={expandedId === item.id}
            onToggle={() => toggleNotification(item.id)}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    elevation: 2,
   
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
    color: '#1A365D',
    textAlign: 'center',
    marginRight: 40,
  },
  searchSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    zIndex:1,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 44,
    marginLeft: 8,
    color: '#2D3748',
    fontSize: 16,
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: '#0A477F',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    top: 70,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    elevation: 4,
    zIndex: 1000, 
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: 16,
    color: '#2D3748',
  },
  listContainer: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  notificationItemExpanded: {
    backgroundColor: '#FFFFFF',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A365D',
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    color: '#718096',
  },
  priorityContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  descriptionContainer: {
    marginTop: 12,
    overflow: 'hidden',
  },
  description: {
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
    paddingRight: 24,
  },
  arrowContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NotificationsScreen;