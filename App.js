import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as TracksProvider } from "./src/context/TracksContext";

import { navigationRef } from "./src/NavigationRef";

import { Ionicons } from "@expo/vector-icons";

import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import AccountScreen from "./src/screens/AccountScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthFlow = () => {
  return (
    <Stack.Navigator
      initialRouteName="ResolveAuthScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ResolveAuth" component={ResolveAuthScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

const TrackDetailFlow = () => {
  return (
    <Stack.Navigator initialRouteName="TrackList">
      <Stack.Screen
        name="TrackList"
        component={TrackListScreen}
        options={{ title: "Tracks" }}
      />
      <Stack.Screen name="TrackDetail" component={TrackDetailScreen} />
    </Stack.Navigator>
  );
};

const MainFlow = () => {
  return (
    <Tab.Navigator initialRouteName="TrackDetailFlow">
      <Tab.Screen
        name="TrackDetailFlow"
        component={TrackDetailFlow}
        options={{
          headerShown: false,
          title: "Tracks",
          tabBarIcon: () => <Ionicons name="rocket-outline" size={25} />,
        }}
      />
      <Tab.Screen
        name="TrackCreate"
        component={TrackCreateScreen}
        options={{
          headerShown: false,
          title: "Create",
          tabBarIcon: () => <Ionicons name="create-outline" size={25} />,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: () => <Ionicons name="person-outline" size={25} />,
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <TracksProvider>
      <LocationProvider>
        <AuthProvider>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
              initialRouteName="AuthFlow"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="AuthFlow" component={AuthFlow} />
              <Stack.Screen name="MainFlow" component={MainFlow} />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
      </LocationProvider>
    </TracksProvider>
  );
};

export default App;
