import 'react-native-gesture-handler';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Assigment from './pages/Assigment';
import Frequency from './pages/Frequency';
import Grade from './pages/Grade';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Schedule from './pages/Schedule';
import Subject from './pages/Subject';
import Test from './pages/Test';
import UpdateProfile from './pages/UpdateProfile';
import NavBar from './pages/navbar/NavBar';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Failed prop type: Invalid prop `textStyle` of type `array` supplied to `Cell`, expected `object`'
]);

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Assigment" component={Assigment} />
        <Stack.Screen name="Frequency" component={Frequency} />
        <Stack.Screen name="Grade" component={Grade} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Schedule" component={Schedule} />
        <Stack.Screen name="Subject" component={Subject} />
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
        <Stack.Screen name="NavBar" component={NavBar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;