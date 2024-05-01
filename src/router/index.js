import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Home, Add, Profile, Login, Register} from "../screens"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomNavigator from '../components/besar/BottomNavigator';
import EditNote from '../screens/EditNote';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Add" component={Add} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

const Router = () => {
    return (
        <Stack.Navigator initialRouteName="MainApp">
            {/* <Stack.Screen
                name="Splash"
                component={Splash}
                options={{ headerShown: false }}
            /> */}
            <Stack.Screen 
                name="MainApp" 
                component={MainApp} 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="Login" 
                component={Login} 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="Register" 
                component={Register} 
                options={{ headerShown: false }} 
            /> 
            <Stack.Screen 
                name="EditNote" 
                component={EditNote} 
                options={{ headerShown: false }} 
            /> 
        </Stack.Navigator>
    )
}

export default Router