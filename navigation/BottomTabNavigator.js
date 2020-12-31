import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import { Icon } from 'react-native-elements'
import {  BackHandler, Alert } from "react-native"
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';
import { createStackNavigator } from '@react-navigation/stack';
import LearnScreen from '../screens/LearnScreen';
import AboutScreen from '../screens/AboutScreen';
import HomeScreen from '../screens/HomeScreen';
import ListScreen from '../screens/ListScreen';


const HomeStack = createStackNavigator();

function BookStackScreen() {
  return (
    <HomeStack.Navigator>
      {/* <HomeStack.Screen options={{headerShown: false}} name="Login" component={Login} /> */}
      <HomeStack.Screen options={{
        headerShown: false
      }} name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen options={{
        headerShown: false
      }} name="LearnScreen" component={LearnScreen} />
      <HomeStack.Screen options={{
        headerShown: false
      }} name="List" component={ListScreen} />
    </HomeStack.Navigator>
  );
}


const SettingsStack = createStackNavigator();

function AboutStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen options={{
        headerShown: false
      }} name="About" component={AboutScreen} />
    </SettingsStack.Navigator>
  );
}

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  if (routeName == "Home") {
    navigation.setOptions({
      headerMode: 'none',
      headerShown: false,
    }
    );
    BackHandler.addEventListener('hardwareBackPress', function() {
      Alert.alert(
        'Exit App',
        'Do you want to exit?',
        [
          {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Yes', onPress: () => BackHandler.exitApp()},
        ],
        { cancelable: false });
        return true;
    })
  }
  else {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  }

  return (
    <BottomTab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Books') {
          iconName = 'book';
        }
        else if (route.name === 'About') {
          iconName = 'info-circle';
        }

        // You can return any component that you like here!
        return <Icon name={iconName} type="font-awesome-5" size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
      initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeStackScreen}
      />
        <BottomTab.Screen name="Books" component={BookStackScreen}/>
        <BottomTab.Screen name="About" component={AboutStackScreen}/>

    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Search for People';
    case 'Links':
      return 'Time is Money so Sell Yours';
  }
}
