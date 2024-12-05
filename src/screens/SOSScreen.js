import React, { useRef, useEffect, useState } from 'react';
import { View, Animated, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Voice from '@react-native-voice/voice';
import {GoogleGenerativeAI} from '@google/generative-ai';

import { useNavigation } from '@react-navigation/native'
const { width } = Dimensions.get('window');
const buttonSize = width * 0.5;


const API_KEY = 'AIzaSyAHbtlYKmRnlvqZ9A7-VHbyiR-moPX5ubM';
const genAI = new GoogleGenerativeAI(API_KEY);

const SOSButton = () => {
	const [recording, setRecording] = useState(false);
	const [timer, setTimer] = useState(0);
	const [transcription, setTranscription] = useState('');
	const [partialResults, setPartialResults] = useState('');
	const timerRef = useRef(null);
	const recordingRef = useRef(false);
	const transcriptionArray = useRef([]);
	const inputTextRef = useRef('');
	const previousTextToPrependRef = useRef('');
	const lastResultRef = useRef('');

	const navigation = useNavigation()

	const bounceAnim = useRef(new Animated.Value(1)).current;
	const waveAnims = Array(3).fill(0).map(() => useRef(new Animated.Value(0)).current);
	const rotateAnim = useRef(new Animated.Value(0)).current;

	const model = genAI.getGenerativeModel({model: 'gemini-pro'});

	useEffect(() => {
		// Use Voice's internal event listener methods if available
		const finalTranscription = "I'm trapped in a collapsed building on Main Street, near the old oak tree. I'm injured and need immediate medical attention. Please send help as soon as possible.";
		//classifyAlertLevel(finalTranscription);
		Voice.onSpeechStart = () => {
			console.log('Speech started');
		};
	
		Voice.onSpeechEnd = () => {
			console.log('Speech ended');
			// Save partial results to transcription array if available
			if (partialResults) {
				transcriptionArray.current.push(partialResults);
				setTranscription(transcriptionArray.current.join(' '));
				setPartialResults('');
			}
			// Reinitialize Voice recognition if still recording
			if (recordingRef.current) {
				setTimeout(restartVoiceRecognition, 500); // Adding a short delay can help
			}
		};
	
		Voice.onSpeechPartialResults = (event) => {
			if (event.value && event.value[0]) {
				if (!event.value[0].startsWith(lastResultRef.current)) {
					previousTextToPrependRef.current = inputTextRef.current;
				}
				inputTextRef.current = previousTextToPrependRef.current + event.value[0];
				setPartialResults(event.value[0]);
				lastResultRef.current = event.value[0];
				console.log('Partial result:', event.value[0]);
			}
		};
	
		Voice.onSpeechResults = (event) => {
			if (event.value && event.value[0]) {
				const finalResult = event.value[0];
				transcriptionArray.current.push(finalResult);
				setTranscription(transcriptionArray.current.join(' '));
				setPartialResults('');
				console.log('Final result:', finalResult);
			}
		};
	
		return () => {
			Voice.onSpeechStart = null;
			Voice.onSpeechEnd = null;
			Voice.onSpeechPartialResults = null;
			Voice.onSpeechResults = null;
	
			Voice.destroy().then(() => console.log('Voice destroyed'));
		};
	}, []);

	const restartVoiceRecognition = async () => {
		if (recordingRef.current) {
			try {
				await Voice.start('en-US');
			} catch (error) {
				console.error('Error restarting voice recognition:', error);
			}
		}
	};

	const startRecording = async () => {
		setRecording(true);
		recordingRef.current = true;
		setTimer(0);
		transcriptionArray.current = [];
		setTranscription('');
		setPartialResults('');
		timerRef.current = setInterval(() => setTimer((prev) => prev + 1), 1000);

		try {
			await Voice.start('en-US');
		} catch (error) {
			console.error('Error starting voice recognition:', error);
		}
	};

	const stopRecording = async () => {
		setRecording(false);
		recordingRef.current = false;
		clearInterval(timerRef.current);

		try {
			await Voice.stop();
			// Include any partial results in the final transcription
			if (partialResults) {
				transcriptionArray.current.push(partialResults);
				setTranscription(transcriptionArray.current.join(' '));
				setPartialResults('');
			}
			const finalTranscription = "I'm trapped in a collapsed building on Main Street, near the old oak tree. I'm injured and need immediate medical attention. Please send help as soon as possible.";
			console.log('Final transcription:', finalTranscription);
			classifyAlertLevel(finalTranscription);
		} catch (error) {
			console.error('Error stopping voice recognition:', error);
		}
	};

	const classifyAlertLevel = async (text) => {
		try {
			// const response = await model.generateContent({
			// 	prompt: `Classify the following text as low, medium, high, or critical: ${text}`,
			// 	temperature: 0.7,
			// });

			const prompt = `Classify the following text as low, medium, high, or critical: ${text}`;

			const response  = await model.generateContent(prompt);


			console.log('Alert Level:', response.response.text());

			
		} catch (error) {
			console.error('Error classifying alert level:', error);
		}
	};

	useEffect(() => {
		// Bounce and wave animations
		Animated.loop(
			Animated.sequence([
				Animated.timing(bounceAnim, { toValue: 1.05, duration: 1000, useNativeDriver: true }),
				Animated.timing(bounceAnim, { toValue: 1, duration: 1000, useNativeDriver: true })
			])
		).start();

		Animated.loop(
			Animated.timing(rotateAnim, { toValue: 1, duration: 8000, useNativeDriver: true })
		).start();

		waveAnims.forEach((waveAnim, index) => {
			Animated.loop(
				Animated.sequence([
					Animated.timing(waveAnim, { toValue: 1, duration: 3000, delay: index * 500, useNativeDriver: true }),
					Animated.timing(waveAnim, { toValue: 0, duration: 0, useNativeDriver: true })
				])
			).start();
		});
	}, []);

	const formatTimer = (time) => {
		const minutes = String(Math.floor(time / 60)).padStart(2, '0');
		const seconds = String(time % 60).padStart(2, '0');
		return `${minutes}:${seconds}`;
	};

	const spin = rotateAnim.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg']
	});

	return (
		<LinearGradient colors={['#f9f9f9', '#ffcccc']} style={styles.background}>
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
						<Ionicons name="chevron-back" size={24} color="#fff" />
					</TouchableOpacity>
					<Text style={styles.headerOneText}> </Text>
				</View>
				<Text style={styles.headerText}>Are you in an emergency?</Text>
				<Text style={styles.infoText}>
					Hold the SOS button to send your location and voice message to emergency services.
				</Text>
				<Text style={styles.subInfoText}>
					Your personal details will be shared for a faster response.
				</Text>

				{/* Enhanced wave effects */}
				{waveAnims.map((waveAnim, index) => (
          			<Animated.View
						key={index}
						style={[
						styles.wave,
						{
							transform: [
							{
								scale: waveAnim.interpolate({
								inputRange: [0, 1],
								outputRange: [1, 2.5 + index * 0.5], // Increased size for better visibility
								})
							},
							{ rotate: spin }
							],
							opacity: waveAnim.interpolate({
							inputRange: [0, 1],
							outputRange: [0.7 - index * 0.1, 0], // Less transparency for better visibility
							}),
							borderWidth: 2,
							borderColor: `rgba(255, ${120 + index * 20}, ${120 + index * 20}, ${0.5 - index * 0.05})`,
							backgroundColor: `rgba(255, ${180 - index * 30}, ${180 - index * 30}, ${0.4 - index * 0.03})`, // Adjusted for better visibility
						},
						]}
					/>
					))}

				{/* SOS Button */}
				<Animated.View style={styles.sosButtonContainer}>
					<Animated.View style={[styles.sosButton, { transform: [{ scale: bounceAnim }] }]}>
						<TouchableOpacity
							style={styles.button}
							onPressIn={startRecording}
							onPressOut={stopRecording}
						>
							<LinearGradient colors={['#FF3B30', '#DC1C13', '#B80000']} style={styles.gradient}>
								<View style={styles.innerCircle}>
									<Text style={styles.buttonText}>SOS</Text>
								</View>
							</LinearGradient>
						</TouchableOpacity>
					</Animated.View>
				</Animated.View>

				{/* Timer and Microphone Icon */}
				{recording && (
					<View style={styles.recordingContainer}>
						<FontAwesome name="microphone" size={30} color="#FF3B30" />
						<Text style={styles.timerText}>{formatTimer(timer)}</Text>
					</View>
				)}

				{/* Address Box */}
				<View style={styles.addressBox}>
					<Ionicons name="person-circle" size={60} color="#333" style={styles.profileIcon} />
					<View>
						<Text style={styles.addressText}>Your current address</Text>
						<Text style={styles.addressDetails}>123 Main St, Springfield, USA</Text>
					</View>
				</View>
			</View>
		</LinearGradient>
	);
};


const styles = StyleSheet.create({
	background: {
	  flex: 1,
	 },
	 container:{
	   flex :1 ,
	   alignItems :'center' ,
	   justifyContent :'center' ,
	   paddingHorizontal :20 ,
	   position:'relative',
	   paddingBottom:'20%',
	 },
	 headerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 20,
		
	   
	  },
	  backButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: 'rgba(30, 30, 30, 0.95)',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight:20
	  },
	  headerOneText: {
		flex: 1,
		fontSize: 24,
		fontWeight: '700',
		color: '#333',
		textAlign: 'center',
		marginRight: 40,
	  },
	 headerText:{
  
	   textAlign:'center',
	   color:'#B80000',
	   fontSize :26 ,
	   fontWeight :'700' ,
	   marginVertical :10 ,
	  
	   
	 },
	 infoText:{
	   textAlign:'center',
	   color:'#333',
	   fontSize :15 ,
	   marginBottom :10 ,
	   paddingHorizontal :15 ,
	   lineHeight :20 ,
	 },
	 subInfoText:{
	   textAlign:'center',
	   color:'#666',
	   fontSize :13 ,
	   marginBottom :40 ,
	   paddingHorizontal :15 ,
	   lineHeight :18 ,
	 },
	 sosButtonContainer:{
	   position:'absolute', // Positioning it absolutely so it can be centered properly
	   alignItems:'center',
	   justifyContent:'center',
	   bottom:'42%', 
	 },
	 sosButton:{
	   width :buttonSize ,
	   height :buttonSize ,
	   borderRadius :buttonSize /2 ,
	   alignItems :'center' ,
	   justifyContent :'center' ,
	   elevation :10 ,
	   shadowColor :'#FF0000' ,
	   shadowOffset :{width :0,height :0} ,
	   shadowOpacity :0.5 ,
	   shadowRadius :20 ,
	   zIndex :2 ,
	 },
	 button:{
	   width :'100%' ,
	   height :'100%' ,
	   borderRadius :buttonSize /2 ,
	   overflow :'hidden' ,
	 },
	 gradient:{
	   width :'100%' ,
	   height :'100%' ,
	   alignItems:'center',
	   justifyContent:'center',
	   padding :4 ,
	 },
	 innerCircle:{
	   width :'92%' ,
	   height :'92%' ,
	   borderRadius :(buttonSize* .92)/2 ,
	   backgroundColor :'rgba(255 ,255 ,255 , .1)',
	   alignItems :'center',
	   justifyContent :'center',
	   borderWidth :2 ,
	   borderColor :'rgba(255 ,255 ,255 , .2)',
	 },
	 buttonText:{
		 color:'#FFFFFF' ,
		 fontSize :buttonSize *.2 ,
		 fontWeight :'900' ,
		 letterSpacing :3 ,
		 textShadowColor :'rgba(0 ,0 ,0 ,.5)',
		 textShadowOffset :{width :0,height :2},
		 textShadowRadius :4 
	 },
	 wave:{
	   position:'absolute',
	   width :buttonSize *1.4 , 
	   height :buttonSize *1.4 , 
	   borderRadius:(buttonSize*1.4)/2 , 
	   
	   
	 },
	 recordingContainer:{
	   flexDirection:'row',
	   alignItems:'center',
	   marginTop:20,
	   },
	   timerText:{
	   fontSize:18,
	   color:'#FF3B30',
	   marginLeft:10,
	   },
	  addressBox:{
		flexDirection:'row',
		alignItems:'center',
		marginTop:'auto', // Push to bottom of screen
		paddingVertical:'8%',
		paddingHorizontal:'5%',
		borderRadius:10,
		backgroundColor:'#FFF5F5',
		width:'90%',
		shadowColor:'#000',
		shadowOffset:{width:0,height:1},
		shadowOpacity:.2,
		shadowRadius:.5,
		zIndex:2,
	  },
	  profileIcon:{
		marginRight:15,
	  },
	  addressText:{
		color:'#333',
		fontWeight:'600',
		fontSize:16,
	  },
	  addressDetails:{
		color:'#555',
		fontSize:14,
		marginTop:3,
	  }
  });
  
  export default SOSButton;
  