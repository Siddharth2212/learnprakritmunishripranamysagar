import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import BottomTabNavigator from '../navigation/BottomTabNavigator';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();


function MainScreen(props) {
  return(
    <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer>
        <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
    </Stack.Navigator>
        </NavigationContainer>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default MainScreen;
