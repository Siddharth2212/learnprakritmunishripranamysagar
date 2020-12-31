import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import { Icon } from 'react-native-elements'
// import LibraryScreen from '../screens/screens/LibraryScreen';
// import MeditationScreen from '../screens/screens/MeditationScreen';
// import ListScreen from '../screens/screens/ListScreen';
// import VideoScreen from '../screens/screens/VideoScreen';
// import LibraryScreen from '../screens/screens/LibraryScreen';
// import ProfileScreen from '../screens/screens/ProfileScreen';
import { View, Text, BackHandler, Alert } from "react-native"
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';
import { createStackNavigator } from '@react-navigation/stack';
// import LibraryScreen from '../screens/LibraryScreen';
// import MeditationScreen from '../screens/MeditationScreen';
// import ListScreen from '../screens/ListScreen';
// import VideoScreen from '../screens/VideoScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import TimelineScreen from '../screens/TimelineScreen';
import NotificationScreen from '../screens/NotificationScreen';

function SettingsScreen(props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <Text>Welcome {props.user.phoneNumber}!</Text> */}
    </View>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen options={{
        headerShown: false
      }} name="Home" component={HomeScreen} />
      <HomeStack.Screen options={{
        headerShown: false
      }} name="Detail" component={DetailScreen} />
      <HomeStack.Screen options={{
        headerShown: false
      }} name="Timeline" component={TimelineScreen} />
    </HomeStack.Navigator>
  );
}

function NotificationStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen options={{
        headerShown: false
      }} name="Notifications" component={NotificationScreen} />
      <HomeStack.Screen options={{
        headerShown: false
      }} name="Detail" component={DetailScreen} />
      <HomeStack.Screen options={{
        headerShown: false
      }} name="Timeline" component={TimelineScreen} />
    </HomeStack.Navigator>
  );
}


const SettingsStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen options={{
        headerShown: false
      }} name="Profile" component={ProfileScreen} />
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
    tabBarOptions={{
      activeTintColor: '#8c52ff',
    }}
      initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <Icon
          type='font-awesome-5'
          name='home' />,
        }}
      />
        <BottomTab.Screen name="Knowledge Bytes" component={NotificationStackScreen}
        options={{
          title: 'Notifications',
          tabBarIcon: ({ focused }) => <Icon
          type='font-awesome-5'
          name='bell' />,
        }} />
        <BottomTab.Screen name="Profile" component={ProfileStackScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <Icon
          type='font-awesome-5'
          name='user' />,
        }} />

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
