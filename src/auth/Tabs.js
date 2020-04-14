import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

// import { Ionicons } from '@expo/vector-icons';
import { colors } from "../theme";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "SignIn") {
              iconName = "md-person";
                
            } else if (route.name === "SignUp") {
              iconName = "md-person-add";
            }
            return;
            // You can return any component that you like here!
            // return <Ionicons name={iconName} size={size} color={color} />;
          }
        })}
        tabBarOptions={{
          activeTintColor: colors.primary,
          inactiveTintColor: colors.secondary
        }}
      >
        <Tab.Screen name="SignIn" component={SignIn} />
        <Tab.Screen name="SignUp" component={SignUp} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
