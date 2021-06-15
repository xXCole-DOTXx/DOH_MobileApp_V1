import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons} from 'react-native-vector-icons'; //Here is a list of the icons: https://oblador.github.io/react-native-vector-icons/
import 'react-native-gesture-handler';
import HomeScreen from './src/Screens/Home/Home';
import FormsScreen from './src/Screens/Complaint_Forms/FormsScreen';
import FormSubmit from './src/Screens/Submit_Form/FormSubmit';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

createBottomTabs = () => 
<Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} options={{tabBarIcon : ({color}) => (
        <MaterialCommunityIcons name="home" color={color} size={26} />
      ),
          }} />
    <Tab.Screen name="Submit a Complaint" component={FormSubmit} options={{tabBarIcon : ({color}) => (
        <MaterialCommunityIcons name="clipboard-text-outline" color={color} size={26} />
      ),
          }}/>
    <Tab.Screen name="Complaint Forms" component={FormsScreen} options={{tabBarIcon : ({color}) => (
        <MaterialCommunityIcons name="clipboard-text-multiple-outline" color={color} size={26} />
      ),
          }}/>
</Tab.Navigator>

export default function App() {
  return (
      <NavigationContainer>
      <Stack.Navigator screenOptions={{
          headerShown: false
      }}>
        <Stack.Screen name="WV DOT" component={HomeScreen, createBottomTabs} />
        <Stack.Screen name="Complaint Forms" component={FormsScreen} />
        <Stack.Screen name="Form Submit" component={FormSubmit} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
