import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { navigationRef } from "./src/navigationRef";
// Screeens
import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";

import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as TrackProvider } from "./src/context/TrackContext";

import { FontAwesome } from "@expo/vector-icons";

const AuthStack = createStackNavigator();
const authStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="ResolveAuth"
      component={ResolveAuthScreen}
      options={{
        headerShown: false
      }}
    />
    <AuthStack.Screen
      name="Signup"
      component={SignupScreen}
      options={{
        title: "Sign Up",
        headerShown: false
      }}
    />
    <AuthStack.Screen
      name="Signin"
      component={SigninScreen}
      options={{
        title: "Sign In",
        headerShown: false
      }}
    />
  </AuthStack.Navigator>
);

const TrackStack = createStackNavigator();
const TrackScreens = () => (
  <TrackStack.Navigator>
    <TrackStack.Screen
      name="TrackList"
      component={TrackListScreen}
      options={{
        title: "Tracks"
      }}
    />
    <TrackStack.Screen
      name="TrackDetail"
      component={TrackDetailScreen}
      options={{
        title: "Track Detail"
      }}
    />
  </TrackStack.Navigator>
);

const TabStack = createBottomTabNavigator();
const tabStackScreen = () => (
  <TabStack.Navigator
    tabBarOptions={{
      activeTintColor: "#6C1D7C",
      inactiveTintColor: "#000"
    }}
  >
    <TabStack.Screen
      name="TrackList"
      component={TrackScreens}
      options={{
        title: "Tracks",
        tabBarIcon: () => <FontAwesome name="th-list" size={20} />
      }}
    />
    <TabStack.Screen
      name="TrackCreate"
      component={TrackCreateScreen}
      options={{
        title: "Create",
        tabBarIcon: () => <FontAwesome name="plus" size={20} />
      }}
    />
    <TabStack.Screen
      name="Account"
      component={AccountScreen}
      options={{
        title: "Account",
        tabBarIcon: () => <FontAwesome name="gear" size={20} />
      }}
    />
  </TabStack.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = () => (
  <RootStack.Navigator>
    <RootStack.Screen
      name="Auth"
      component={authStackScreen}
      options={{
        headerShown: false
      }}
    />
    <RootStack.Screen
      name="Tab"
      component={tabStackScreen}
      options={{
        headerShown: false
      }}
    />
  </RootStack.Navigator>
);

export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <NavigationContainer ref={navigationRef}>
            <RootStackScreen />
          </NavigationContainer>
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};
