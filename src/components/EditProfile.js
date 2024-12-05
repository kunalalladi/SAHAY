import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  Modal, 
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import local images
const avatar1 = require('../../assets/user/user1.jpg');
const avatar2 = require('../../assets/user/user2.jpg');
const avatar3 = require('../../assets/user/user3.jpg');
const avatar4 = require('../../assets/user/user4.jpg');

const avatars = [avatar1, avatar2, avatar3, avatar4];

// Input Field Component
const InputField = ({ label, value, onChangeText, placeholder, keyboardType, multiline }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={[
        styles.input,
        multiline && { height: 100, textAlignVertical: 'top' }
      ]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#6B7280"
      keyboardType={keyboardType}
      multiline={multiline}
    />
  </View>
);

const EditProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [isAvatarModalVisible, setAvatarModalVisible] = useState(false);

  const handleSave = () => {
    // Add save logic here
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <TouchableOpacity 
            onPress={() => setAvatarModalVisible(true)}
            style={styles.avatarContainer}
          >
            <Image source={selectedAvatar} style={styles.avatar} />
            <View style={styles.avatarEditButton}>
              <Ionicons name="camera" size={20} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
          <Text style={styles.avatarHint}>Tap to change profile photo</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <InputField
            label="Full Name"
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
          />
          
          <InputField
            label="Date of Birth"
            value={dob}
            onChangeText={setDob}
            placeholder="DD/MM/YYYY"
          />
          
          <InputField
            label="Mobile Number"
            value={mobile}
            onChangeText={setMobile}
            placeholder="Enter your mobile number"
            keyboardType="phone-pad"
          />
          
          <InputField
            label="Emergency Contact"
            value={emergencyContact}
            onChangeText={setEmergencyContact}
            placeholder="Enter emergency contact number"
            keyboardType="phone-pad"
          />
          
          <InputField
            label="Blood Group"
            value={bloodGroup}
            onChangeText={setBloodGroup}
            placeholder="Enter your blood group"
          />
          
          <InputField
            label="Address"
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your full address"
            multiline
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Avatar Selection Modal */}
      <Modal
        visible={isAvatarModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setAvatarModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose Profile Photo</Text>
              <TouchableOpacity 
                onPress={() => setAvatarModalVisible(false)}
                style={styles.modalCloseButton}
              >
                <Ionicons name="close" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={avatars}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  onPress={() => {
                    setSelectedAvatar(item);
                    setAvatarModalVisible(false);
                  }}
                  style={styles.avatarOption}
                >
                  <Image source={item} style={styles.avatarOptionImage} />
                </TouchableOpacity>
              )}
              numColumns={3}
              keyExtractor={(_, index) => index.toString()}
              contentContainerStyle={styles.avatarGrid}
            />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A477F', // Deep blue background
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 4,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  avatarEditButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0A477F',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  avatarHint: {
    marginTop: 12,
    color: '#64748B',
    fontSize: 14,
  },
  formSection: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0A477F',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  saveButton: {
    backgroundColor: '#0A477F',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  modalCloseButton: {
    padding: 8,
  },
  avatarGrid: {
    paddingVertical: 10,
  },
  avatarOption: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
  },
  avatarOptionImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
});

export default EditProfileScreen;