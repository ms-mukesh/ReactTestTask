import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screen/component/HomeScreen';
import AddDataScreen from '../screen/component/AddDataScreen';
import 'react-native-gesture-handler';
import EditData from "../screen/component/EditDataScreen";
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AddDataScreen" component={AddDataScreen} />
        <Stack.Screen name="EditDataScreen" component={EditData} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
