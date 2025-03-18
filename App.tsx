import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./src/screens/SplashScreen";
import ProfileSetup from "./src/screens/ProfileSetup";
import HomeScreen from "./src/screens/HomeScreen";
import SubjectScreen from "./src/screens/SubjectScreen";
import CalendarScreen from "./src/screens/CalendarScreen";
import TimetableScreen from "./src/screens/TimetableScreen";



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetup} options={{ title: "Setup Profile" }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
        <Stack.Screen name="SubjectScreen" component={SubjectScreen} options={{ title: "SubjectScreen" }} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="Timetable" component={TimetableScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
