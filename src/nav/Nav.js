import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../theme";
import { Ionicons } from '@expo/vector-icons';

import Dashboard from "../pages/Dashboard";
import Settings from "../pages/Settings";
import Accounts from "../pages/Accounts";

const Tab = createBottomTabNavigator();

class StackNav extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator 
        initialRouteName="Dashboard" 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Dashboard") {
              iconName = "md-home";
            } else if (route.name === "Accounts") {
              iconName = "md-wallet";
            } else if (route.name === "Settings") {
              iconName = "md-cog";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        })}
        tabBarOptions={{
          activeTintColor: colors.primary,
          inactiveTintColor: colors.secondary
        }}>
          <Tab.Screen name="Dashboard" component={Dashboard} />
          <Tab.Screen name="Accounts" component={Accounts} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default StackNav;
