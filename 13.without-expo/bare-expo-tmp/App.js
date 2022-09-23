import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';

export default function App() {

  const handleGetLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      // setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    // setLocation(location);
    console.info(location);
  }

  return (
    <View style={styles.container}>
      <Button title="Get Location" onPress={handleGetLocation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
