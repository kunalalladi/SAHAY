import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import React, {useEffect} from 'react';

const Splash = ({navigation}) => {

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar hidden />
      <Image
        style={{height: 250, width: '80%', resizeMode: 'contain'}}
        source={require('../../assets/logo.jpg')}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});