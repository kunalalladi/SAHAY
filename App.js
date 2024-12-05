import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useRef } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppRegistry } from 'react-native';
import DrawerNavigator from './src/routes/StackNavigator';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

export default function App() {
  const navigationRef = useRef();

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <NavigationContainer ref={navigationRef}>
        <DrawerNavigator />
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
}
