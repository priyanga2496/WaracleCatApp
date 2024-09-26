// In App.js in a new project

import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './src/navigation/appNavigator';


const Stack = createNativeStackNavigator();
console.warn = () => {};
console.error = () => {};
function App() {
  return (
   
       <AppNavigator/>
   
  );
}

export default App;