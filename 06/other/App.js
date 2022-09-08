/* import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons"
import WelcomeScreen from "./screens/WelcomeScreen";
import UserScreen from "./screens/UserScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  return <NavigationContainer>
    <Drawer.Navigator
      screenOptions={
        {
          drawerActiveBackgroundColor: "#f0e1ff",
          drawerActiveTintColor: "#3c086b",
          // drawerStyle: {
          //   backgroundColor: "#ccc"
          // },
          headerStyle: {
            backgroundColor: "#3c086b"
          },
          headerTintColor: "white",
        }
      }
      initialRouteName="Welcome"
    >
      <Drawer.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          drawerLabel: "Welcome Screen",
          drawerIcon: ({ color, size, focused }) => <Ionicons name="home" color={color} size={size} />
        }}
      />
      <Drawer.Screen name="User" component={UserScreen}
        options={{
          drawerIcon: ({ color, size, focused }) => <Ionicons name="person" color={color} size={size} />
        }}
      />
    </Drawer.Navigator>
  </NavigationContainer>;
}
 */

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"
import WelcomeScreen from "./screens/WelcomeScreen";
import UserScreen from "./screens/UserScreen";

const BottomTab = createBottomTabNavigator();

export default function App() {
  return <NavigationContainer>
    <BottomTab.Navigator
      screenOptions={
        {
          headerStyle: {
            backgroundColor: "#3c086b"
          },
          headerTintColor: "white",
          tabBarActiveTintColor: "#3c086b",
          
        }
      }
      initialRouteName="Welcome"
    >
      <BottomTab.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          // tabBarLabel: "Welcome Screen",
          tabBarIcon: ({ color, size, focused }) => <Ionicons name="home" color={color} size={size} />
        }}
      />
      <BottomTab.Screen name="User" component={UserScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => <Ionicons name="person" color={color} size={size} />
        }}
      />
    </BottomTab.Navigator>
  </NavigationContainer>;
}
