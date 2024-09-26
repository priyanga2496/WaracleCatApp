
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../components/screens/homeScreen';
import UploadCatScreen from '../components/screens/uploadCatScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={UploadCatScreen} />
    </HomeStack.Navigator>
  );
}

const UploadStack = createNativeStackNavigator();

function UploadStackScreen() {
  return (
    <UploadStack.Navigator>
      <UploadStack.Screen name="Upload Details" component={UploadCatScreen} />
      <UploadStack.Screen name="Home" component={HomeScreen} />
    </UploadStack.Navigator>
  );
}

const FavouriteStack = createNativeStackNavigator();


const Tab = createBottomTabNavigator();
function AppNavigator() {
  return (
    <NavigationContainer>
    <Tab.Navigator
      screenOptions={{ headerShown: false ,
        tabBarActiveTintColor: '#7A57D1', 
        tabBarInactiveTintColor: '#8E8E93',
        tabBarLabelStyle :{ fontWeight :'bold'}
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/images/home_icon.png')} 
              style={{ width: 24, height: 24, tintColor: focused ? '#7A57D1' : '#8E8E93' }} // Optional tinting based on focus
            />
          ),
          tabBarLabel: 'Home', 
        }}
      />
      <Tab.Screen
        name="Upload"
        component={UploadStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/images/tab_upload.png')} 
              style={{ width: 24, height: 24, tintColor: focused ? '#7A57D1' : '#8E8E93' }}
            />
          ),
          tabBarLabel: 'Upload', 
        }}
      />
    </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;