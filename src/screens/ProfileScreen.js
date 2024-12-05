// import React from 'react';
// import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Platform, StatusBar } from 'react-native';
// import { EvilIcons, FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';

// const ProfileScreen = ({ navigation }) => {
//   const isVolunteer = false; 
//   const stats = [
//     { label: 'Volunteered', value: '23' },
//     { label: 'Helped', value: '158' },
//     { label: 'Rating', value: '4.9' },
//   ];

//   const menuItems = [
//     {
//       icon: "user",
//       label: "Personal Information",
//       helpText: "Manage your profile details",
//       iconColor: "#4A90E2"
//     },
//     {
//       icon: "hand-paper-o",
//       label: "Volunteer Registration",
//       helpText: "Register as a volunteer",
//       iconColor: "#50C878"
//     },
//     {
//       icon: "phone-square",
//       label: "Emergency Contact",
//       helpText: "Manage emergency contacts",
//       iconColor: "#E74C3C"
//     },
//     {
//       icon: "shield",
//       label: "Safety Tips",
//       helpText: "View safety guidelines",
//       iconColor: "#F1C40F"
//     },
//     {
//       icon: "medkit",
//       label: "Disaster Preparedness",
//       helpText: "Access preparedness resources",
//       iconColor: "#8E44AD"
//     },
//     {
//       icon: "ambulance",
//       label: "Emergency Services",
//       helpText: "Find nearby emergency services",
//       iconColor: "#E67E22"
//     },
//   ];

//   const settingsItems = [
//     {
//       icon: "question-circle",
//       label: "Support & Help",
//       helpText: "Get assistance",
//       iconColor: "#3498DB"
//     },
//     {
//       icon: "cog",
//       label: "App Settings",
//       helpText: "Customize your experience",
//       iconColor: "#95A5A6"
//     },
//     {
//       icon: "lock",
//       label: "Privacy Policy",
//       helpText: "View our privacy policy",
//       iconColor: "#34495E"
//     },
//     {
//       icon: "info-circle",
//       label: "About the App",
//       helpText: "Learn more about us",
//       iconColor: "#16A085"
//     },
//   ];

//   return (
//     <ScrollView style={styles.container}>
//       <StatusBar barStyle="light-content" />
      
//       {/* Header */}
//       <View style={styles.headerContainer}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//             <Ionicons name="chevron-back" size={24} color="white" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.settingsButton}>
//             <EvilIcons name="pencil" size={24} color="white" />
//           </TouchableOpacity>
//         </View>

//         {/* Profile Info */}
//         <View style={styles.profileInfo}>
//           <Image
//             source={require('../../assets/user/user1.jpg')}
//             style={styles.avatar}
//           />
//           <Text style={styles.userName}>John Doe</Text>
//           {isVolunteer && <Text style={styles.userTag}>Volunteer Helper</Text>}
          
//           <View style={styles.contactInfo}>
//             <View style={styles.infoRow}>
//               <FontAwesome name="phone" size={16} color="white" />
//               <Text style={styles.infoText}>+1 234 567 890</Text>
//             </View>
//             <View style={styles.infoRow}>
//               <MaterialIcons name="location-on" size={16} color="white" />
//               <Text style={styles.infoText}>1234 Elm St, Cityville</Text>
//             </View>
//           </View>
//         </View>

//         {/* Stats */}
//         {isVolunteer && <View style={styles.statsContainer}>
//           {stats.map((stat, index) => (
//             <View key={index} style={styles.statItem}>
//               <Text style={styles.statValue}>{stat.value}</Text>
//               <Text style={styles.statLabel}>{stat.label}</Text>
//             </View>
//           ))}
//         </View>}
//       </View>

//       {/* Menu Options */}
//       <View style={styles.menuContainer}>
//         <Text style={styles.sectionTitle}>Main Menu</Text>
//         {menuItems.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             style={[styles.menuItem, index === menuItems.length - 1 && styles.lastMenuItem]}
//             onPress={() => alert(`${item.label} clicked!`)}
//           >
//             <View style={[styles.iconContainer, { backgroundColor: `${item.iconColor}15` }]}>
//               <FontAwesome name={item.icon} size={20} color={item.iconColor} />
//             </View>
//             <View style={styles.menuTextContainer}>
//               <Text style={styles.menuText}>{item.label}</Text>
//               <Text style={styles.menuHelpText}>{item.helpText}</Text>
//             </View>
//             <Ionicons name="chevron-forward" size={20} color="#CBD5E0" />
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Settings */}
//       <View style={[styles.menuContainer, styles.settingsContainer]}>
//         <Text style={styles.sectionTitle}>Settings & Support</Text>
//         {settingsItems.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             style={[styles.menuItem, index === settingsItems.length - 1 && styles.lastMenuItem]}
//             onPress={() => alert(`${item.label} clicked!`)}
//           >
//             <View style={[styles.iconContainer, { backgroundColor: `${item.iconColor}15` }]}>
//               <FontAwesome name={item.icon} size={20} color={item.iconColor} />
//             </View>
//             <View style={styles.menuTextContainer}>
//               <Text style={styles.menuText}>{item.label}</Text>
//               <Text style={styles.menuHelpText}>{item.helpText}</Text>
//             </View>
//             <Ionicons name="chevron-forward" size={20} color="#CBD5E0" />
//           </TouchableOpacity>
//         ))}
//       </View>

//       <TouchableOpacity style={styles.logoutButton}>
//           <LinearGradient
//             colors={['#FF6B6B', '#E53E3E']}
//             style={styles.logoutGradient}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 0 }}
//           >
//             <FontAwesome name="sign-out" size={20} color="white" />
//             <Text style={styles.logoutText}>Logout</Text>
//           </LinearGradient>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F7FAFC',
//   },
//   headerContainer: {
//     backgroundColor: '#0A477F',
//     paddingTop: Platform.OS === 'ios' ? 60 : 40,
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//     paddingBottom: 30,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     marginBottom: 20,
//   },
//   backButton: {
//     padding: 8,
//     borderRadius: 12,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//   },
//   settingsButton: {
//     padding: 8,
//     borderRadius: 12,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//   },
//   profileInfo: {
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     borderWidth: 4,
//     borderColor: 'white',
//   },
//   userName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//     marginTop: 12,
//   },
//   userTag: {
//     fontSize: 16,
//     color: 'rgba(255, 255, 255, 0.8)',
//     marginTop: 4,
//   },
//   contactInfo: {
//     marginTop: 16,
//     alignItems: 'center',
//   },
//   infoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 4,
//   },
//   infoText: {
//     color: 'white',
//     marginLeft: 8,
//     fontSize: 14,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     marginHorizontal: 20,
//     marginTop: 20,
//     padding: 15,
//     borderRadius: 15,
//   },
//   statItem: {
//     alignItems: 'center',
//   },
//   statValue: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   statLabel: {
//     fontSize: 12,
//     color: 'rgba(255, 255, 255, 0.8)',
//     marginTop: 4,
//   },
//   menuContainer: {
//     backgroundColor: 'white',
//     marginHorizontal: 20,
//     marginTop: 20,
//     borderRadius: 20,
//     padding: 20,
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 4,
//       },
//     }),
//   },
//   settingsContainer: {
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#2D3748',
//     marginBottom: 15,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#EDF2F7',
//   },
//   lastMenuItem: {
//     borderBottomWidth: 0,
//   },
//   iconContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 15,
//   },
//   menuTextContainer: {
//     flex: 1,
//   },
//   menuText: {
//     fontSize: 16,
//     color: '#2D3748',
//     fontWeight: '500',
//   },
//   menuHelpText: {
//     fontSize: 13,
//     color: '#718096',
//     marginTop: 2,
//   },
//   logoutButton: {
//     marginBottom: 30,
//     marginHorizontal: 15,
//     borderRadius: 15,
//     overflow: 'hidden',
//   },
//   logoutGradient: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 16,
//   },
//   logoutText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//     marginLeft: 8,
//   },
// });

// export default ProfileScreen;




// import React from 'react';
// import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Platform, StatusBar, Animated } from 'react-native';
// import { EvilIcons, FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';

// const ProfileScreen = ({ navigation }) => {
//   const isVolunteer = false;
//   const stats = [
//     { label: 'Volunteered', value: '23', icon: 'hand-peace-o' },
//     { label: 'Helped', value: '158', icon: 'heart' },
//     { label: 'Rating', value: '4.9', icon: 'star' },
//   ];

//   const menuItems = [
//     {
//       icon: "user",
//       label: "Personal Information",
//       helpText: "Manage your profile details",
//       iconColor: "#4A90E2",
//       gradient: ['#4A90E2', '#357ABD']
//     },
//     {
//       icon: "hand-paper-o",
//       label: "Volunteer Registration",
//       helpText: "Register as a volunteer",
//       iconColor: "#50C878",
//       gradient: ['#50C878', '#3DA75E']
//     },
//     {
//       icon: "phone-square",
//       label: "Emergency Contact",
//       helpText: "Manage emergency contacts",
//       iconColor: "#E74C3C",
//       gradient: ['#E74C3C', '#C0392B']
//     },
//     {
//       icon: "shield",
//       label: "Safety Tips",
//       helpText: "View safety guidelines",
//       iconColor: "#F1C40F",
//       gradient: ['#F1C40F', '#D4AC0D']
//     },
//     {
//       icon: "medkit",
//       label: "Disaster Preparedness",
//       helpText: "Access preparedness resources",
//       iconColor: "#8E44AD",
//       gradient: ['#8E44AD', '#732D91']
//     },
//     {
//       icon: "ambulance",
//       label: "Emergency Services",
//       helpText: "Find nearby emergency services",
//       iconColor: "#E67E22",
//       gradient: ['#E67E22', '#CC6A1D']
//     },
//   ];

//   const settingsItems = [
//     {
//       icon: "question-circle",
//       label: "Support & Help",
//       helpText: "Get assistance",
//       gradient: ['#3498DB', '#2980B9']
//     },
//     {
//       icon: "cog",
//       label: "App Settings",
//       helpText: "Customize your experience",
//       gradient: ['#95A5A6', '#7F8C8D']
//     },
//     {
//       icon: "lock",
//       label: "Privacy Policy",
//       helpText: "View our privacy policy",
//       gradient: ['#34495E', '#2C3E50']
//     },
//     {
//       icon: "info-circle",
//       label: "About the App",
//       helpText: "Learn more about us",
//       gradient: ['#16A085', '#138D75']
//     },
//   ];

//   const MenuItem = ({ item, isSettings }) => (
//     <TouchableOpacity
//       style={styles.menuItem}
//       onPress={() => alert(`${item.label} clicked!`)}
//     >
//       <LinearGradient
//         colors={item.gradient}
//         style={styles.iconContainer}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//         <FontAwesome name={item.icon} size={20} color="white" />
//       </LinearGradient>
//       <View style={styles.menuTextContainer}>
//         <Text style={styles.menuText}>{item.label}</Text>
//         <Text style={styles.menuHelpText}>{item.helpText}</Text>
//       </View>
//       <View style={styles.arrowContainer}>
//         <Ionicons name="chevron-forward" size={20} color="#CBD5E0" />
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <ScrollView style={styles.container}>
//       <StatusBar barStyle="light-content" />
      
//       <LinearGradient
//         colors={['#1A5F7A', '#0A477F']}
//         style={styles.headerContainer}
//       >
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
//             <Ionicons name="chevron-back" size={24} color="white" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.headerButton}>
//             <EvilIcons name="pencil" size={24} color="white" />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.profileInfo}>
//           <View style={styles.avatarContainer}>
//             <Image
//               source={require('../../assets/user/user1.jpg')}
//               style={styles.avatar}
//             />
//             {isVolunteer && (
//               <View style={styles.badgeContainer}>
//                 <FontAwesome name="check-circle" size={24} color="#4CAF50" />
//               </View>
//             )}
//           </View>
//           <Text style={styles.userName}>John Doe</Text>
//           {isVolunteer && <Text style={styles.userTag}>Verified Volunteer</Text>}
          
//           <View style={styles.contactInfo}>
//             <View style={styles.infoRow}>
//               <FontAwesome name="phone" size={16} color="white" />
//               <Text style={styles.infoText}>+1 234 567 890</Text>
//             </View>
//             <View style={styles.infoRow}>
//               <MaterialIcons name="location-on" size={16} color="white" />
//               <Text style={styles.infoText}>1234 Elm St, Cityville</Text>
//             </View>
//           </View>
//         </View>

//         {isVolunteer && (
//           <View style={styles.statsContainer}>
//             {stats.map((stat, index) => (
//               <View key={index} style={styles.statItem}>
//                 <FontAwesome name={stat.icon} size={20} color="white" style={styles.statIcon} />
//                 <Text style={styles.statValue}>{stat.value}</Text>
//                 <Text style={styles.statLabel}>{stat.label}</Text>
//               </View>
//             ))}
//           </View>
//         )}
//       </LinearGradient>

//       <View style={styles.contentContainer}>
//         <View style={styles.menuContainer}>
//           <Text style={styles.sectionTitle}>Quick Actions</Text>
//           {menuItems.map((item, index) => (
//             <MenuItem key={index} item={item} />
//           ))}
//         </View>

//         <View style={[styles.menuContainer, styles.settingsContainer]}>
//           <Text style={styles.sectionTitle}>Settings & Support</Text>
//           {settingsItems.map((item, index) => (
//             <MenuItem key={index} item={item} isSettings />
//           ))}
//         </View>

//         <TouchableOpacity style={styles.logoutButton}>
//           <LinearGradient
//             colors={['#FF6B6B', '#E53E3E']}
//             style={styles.logoutGradient}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 0 }}
//           >
//             <FontAwesome name="sign-out" size={20} color="white" />
//             <Text style={styles.logoutText}>Logout</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F7FAFC',
//     marginBottom: 60,
//   },
//   headerContainer: {
//     paddingTop: Platform.OS === 'ios' ? 60 : 40,
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//     paddingBottom: 30,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     marginBottom: 20,
//   },
//   headerButton: {
//     padding: 12,
//     borderRadius: 15,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//   },
//   profileInfo: {
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   avatarContainer: {
//     position: 'relative',
//     marginBottom: 15,
//   },
//   avatar: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     borderWidth: 4,
//     borderColor: 'white',
//   },
//   badgeContainer: {
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 4,
//   },
//   userName: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: 'white',
//     marginTop: 12,
//   },
//   userTag: {
//     fontSize: 16,
//     color: '#4CAF50',
//     marginTop: 4,
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//     borderRadius: 12,
//     overflow: 'hidden',
//   },
//   contactInfo: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   infoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 4,
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     borderRadius: 20,
//   },
//   infoText: {
//     color: 'white',
//     marginLeft: 8,
//     fontSize: 14,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     marginHorizontal: 20,
//     marginTop: 25,
//     padding: 20,
//     borderRadius: 20,
//   },
//   statItem: {
//     alignItems: 'center',
//   },
//   statIcon: {
//     marginBottom: 8,
//   },
//   statValue: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   statLabel: {
//     fontSize: 12,
//     color: 'rgba(255, 255, 255, 0.8)',
//     marginTop: 4,
//   },
//   contentContainer: {
//     padding: 20,
//   },
//   menuContainer: {
//     backgroundColor: 'white',
//     borderRadius: 25,
//     padding: 20,
//     marginBottom: 20,
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 12,
//       },
//       android: {
//         elevation: 5,
//       },
//     }),
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#2D3748',
//     marginBottom: 20,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//     marginBottom: 12,
//     backgroundColor: '#F8FAFC',
//     borderRadius: 15,
//   },
//   iconContainer: {
//     width: 45,
//     height: 45,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 15,
//   },
//   menuTextContainer: {
//     flex: 1,
//   },
//   menuText: {
//     fontSize: 16,
//     color: '#2D3748',
//     fontWeight: '600',
//   },
//   menuHelpText: {
//     fontSize: 13,
//     color: '#718096',
//     marginTop: 4,
//   },
//   arrowContainer: {
//     backgroundColor: '#F1F5F9',
//     padding: 8,
//     borderRadius: 10,
//   },
//   logoutButton: {
//     marginBottom: 30,
//     borderRadius: 15,
//     overflow: 'hidden',
//   },
//   logoutGradient: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 16,
//   },
//   logoutText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//     marginLeft: 8,
//   },
// });

// export default ProfileScreen;



import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Platform, StatusBar, Animated } from 'react-native';
import { EvilIcons, FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';


const ProfileScreen = ({ navigation }) => {
  const isVolunteer = false;
  
  const stats = [
    { label: 'Volunteered', value: '23', icon: 'hand-peace-o' },
    { label: 'Helped', value: '158', icon: 'heart' },
    { label: 'Rating', value: '4.9', icon: 'star' },
  ];

  const menuItems = [
    {
      icon: "user",
      label: "Personal Information",
      helpText: "Manage your profile details",
      route: 'PersonalInfo',
      gradient: ['#4A90E2', '#357ABD']
    },
    {
      icon: "hand-paper-o",
      label: "Volunteer Registration",
      helpText: "Register as a volunteer",
      route: 'VolunteerReg',
      gradient: ['#50C878', '#3DA75E']
    },
    {
      icon: "phone-square",
      label: "Emergency Contact",
      helpText: "Manage emergency contacts",
      route: 'Contacts',
      gradient: ['#E74C3C', '#C0392B']
    },
    {
      icon: "shield",
      label: "Safety Tips",
      helpText: "View safety guidelines",
      route: 'SafeTips',
      gradient: ['#F1C40F', '#D4AC0D']
    },
    {
      icon: "medkit",
      label: "Disaster Preparedness",
      helpText: "Access preparedness resources",
      route: 'DisasterPrep',
      gradient: ['#8E44AD', '#732D91']
    },
    {
      icon: "ambulance",
      label: "Emergency Services",
      helpText: "Find nearby emergency services",
      route: 'Emergency',
      gradient: ['#E67E22', '#CC6A1D']
    },
  ];

  const settingsItems = [
    {
      icon: "question-circle",
      label: "Support & Help",
      helpText: "Get assistance",
      gradient: ['#3498DB', '#2980B9']
    },
    {
      icon: "cog",
      label: "App Settings",
      helpText: "Customize your experience",
      gradient: ['#95A5A6', '#7F8C8D']
    },
    {
      icon: "lock",
      label: "Privacy Policy",
      helpText: "View our privacy policy",
      gradient: ['#34495E', '#2C3E50']
    },
    {
      icon: "info-circle",
      label: "About the App",
      helpText: "Learn more about us",
      gradient: ['#16A085', '#138D75']
    },
  ];

  const MenuItem = ({ item, isLast }) => (
    <TouchableOpacity
      style={[styles.menuItem, isLast && styles.lastMenuItem]}
      onPress={() => navigation.navigate(item.route)}
    >
      <LinearGradient
        colors={item.gradient}
        style={styles.iconContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <FontAwesome name={item.icon} size={18} color="white" />
      </LinearGradient>
      <View style={styles.menuTextContainer}>
        <Text style={styles.menuText}>{item.label}</Text>
        <Text style={styles.menuHelpText}>{item.helpText}</Text>
      </View>
      <View style={styles.arrowContainer}>
        <Ionicons name="chevron-forward" size={18} color="#CBD5E0" />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <LinearGradient
        colors={['#1e3c72', '#2a5298']}
        style={styles.headerContainer}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
            <Ionicons name="chevron-back" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={styles.headerButton}>
            <EvilIcons name="pencil" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('../../assets/user/user1.jpg')}
              style={styles.avatar}
            />
            {isVolunteer && (
              <View style={styles.badgeContainer}>
                <FontAwesome name="check-circle" size={18} color="#4CAF50" />
              </View>
            )}
          </View>
          <Text style={styles.userName}>John Doe</Text>
          {isVolunteer && (
            <View style={styles.tagContainer}>
              <Text style={styles.userTag}>Verified Volunteer</Text>
            </View>
          )}
          
          <View style={styles.contactInfo}>
            <View style={styles.infoRow}>
              <FontAwesome name="phone" size={14} color="white" />
              <Text style={styles.infoText}>+1 234 567 890</Text>
            </View>
            <View style={styles.infoRow}>
              <MaterialIcons name="location-on" size={14} color="white" />
              <Text style={styles.infoText}>1234 Elm St, Cityville</Text>
            </View>
          </View>
        </View>

        {isVolunteer && (
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <FontAwesome name={stat.icon} size={16} color="white" style={styles.statIcon} />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        )}
      </LinearGradient>

      <View style={styles.contentContainer}>
        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          {menuItems.map((item, index) => (
            <MenuItem 
              key={index} 
              item={item} 
              isLast={index === menuItems.length - 1}
            />
          ))}
        </View>

        <View style={[styles.menuContainer, styles.settingsContainer]}>
          <Text style={styles.sectionTitle}>Settings & Support</Text>
          {settingsItems.map((item, index) => (
            <MenuItem 
              key={index} 
              item={item} 
              isLast={index === settingsItems.length - 1}
            />
          ))}
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#FF6B6B', '#E53E3E']}
            style={styles.logoutGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <FontAwesome name="sign-out" size={16} color="white" />
            <Text style={styles.logoutText}>Logout</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    marginBottom: 70,
  },
  headerContainer: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingBottom: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  headerButton: {
    padding: 10,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  profileInfo: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: 'white',
  },
  badgeContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginTop: 8,
  },
  tagContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 4,
  },
  userTag: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
  },
  contactInfo: {
    marginTop: 16,
    alignItems: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  infoText: {
    color: 'white',
    marginLeft: 6,
    fontSize: 13,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 16,
    marginTop: 20,
    padding: 16,
    borderRadius: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    marginBottom: 6,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  contentContainer: {
    padding: 16,
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A202C',
    marginBottom: 16,
    marginLeft: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EDF2F7',
  },
  lastMenuItem: {
    marginBottom: 0,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuText: {
    fontSize: 15,
    color: '#2D3748',
    fontWeight: '500',
  },
  menuHelpText: {
    fontSize: 12,
    color: '#718096',
    marginTop: 4,
  },
  arrowContainer: {
    backgroundColor: '#F1F5F9',
    padding: 6,
    borderRadius: 8,
  },
  logoutButton: {
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  logoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
  },
  logoutText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 6,
  },
});

export default ProfileScreen;