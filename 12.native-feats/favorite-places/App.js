import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';

import IconButton from './components/ui/IconButton';
import { Colors } from './constants/colors';
import AddPlace from './screens/AddPlace';
import AllPlaces from './screens/AllPlaces';
import PlaceDetails from './screens/PlaceDetails';
import Map from './screens/Map';
import { init } from './util/database';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [initDb, setInitDb] = useState(false)

  useEffect(() => {
    init()
      .then(() => {
        setInitDb(true)
      }).catch(error => {
        console.log(error);
      });
  }, [])

 
  const onLayoutRootView = useCallback(async () => {
    if (initDb) {
      await SplashScreen.hideAsync();
    }
  }, [initDb]);

  useLayoutEffect(() => { 
    onLayoutRootView()
  }, [initDb, onLayoutRootView])

  if (!initDb) {
    return null;
  }

  return <>
    <StatusBar style='dark' />
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.gray700 }
        }}
      >
        <Stack.Screen
          name='AllPlaces'
          component={AllPlaces}
          options={({ navigation }) => ({
            title: "Favorite Places",
            headerRight: ({ tintColor }) => <IconButton
              name="add"
              size={24}
              color={tintColor}
              onPress={() => navigation.navigate("AddPlace")}
            />
          })} />
        <Stack.Screen
          name='AddPlace'
          component={AddPlace}
          options={{
            title: "Add New Place(s)"
          }}
        />

        <Stack.Screen
          name='Map'
          component={Map}
        // options={{
        //   title: "Add New Place(s)"
        // }}
        />
        <Stack.Screen name="PlaceDetails" component={PlaceDetails} options={{
          title: "Loading place..."
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  </>
}

