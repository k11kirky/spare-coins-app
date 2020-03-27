import React from "react";
import { NavigationContainer, useLinking } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../theme";
import { Ionicons } from "@expo/vector-icons";

import Dashboard from "../pages/Dashboard";
import Settings from "../pages/Settings";
import Accounts from "../pages/Accounts";

const Tab = createBottomTabNavigator();

const StackNav = () => {
  const ref = React.useRef();

  const { getInitialState } = useLinking(ref, {
    prefixes: ["sparecoins://"]
  });

  console.log("here")

  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    Promise.race([
      getInitialState(),
      new Promise(resolve =>
        // Timeout in 150ms if `getInitialState` doesn't resolve
        // Workaround for https://github.com/facebook/react-native/issues/25675
        setTimeout(resolve, 150)
      )
    ])
      .catch(e => {
        console.error(e);
      })
      .then(state => {
        console.log("state", state);
        if (state !== undefined) {
          setInitialState(state);
        }

        setIsReady(true);
      });
  }, [getInitialState]);

  if (!isReady) {
    return null;
  }
  return (
    <NavigationContainer initialState={initialState} ref={ref}>
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
        }}
      >
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Accounts" component={Accounts}/>
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default StackNav;
