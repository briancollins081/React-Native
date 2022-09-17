import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/ui/IconButton";
const Map = ({ navigation }) => {
    const [selectedLocation, setSelectedLoaction] = useState();
    const initialRegion = {
        latitude: -1.38111,
        longitude: 36.767577,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    const selectLocationHandler = (event) => {
        const lat = event.nativeEvent.coordinate.latitude
        const lng = event.nativeEvent.coordinate.longitude

        setSelectedLoaction({ lat, lng })
    }

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert("No location picked!", "You have to pick a location (by tapping on the map) first")
            return
        }
        navigation.navigate("AddPlace", { pickedLat: selectedLocation.lat, pickedLng: selectedLocation.lng })
    }, [navigation, selectedLocation])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({ tintColor }) => <IconButton
                name="save"
                color={tintColor}
                size={24}
                onPress={savePickedLocationHandler}
            />
        })
    }, [navigation, savePickedLocationHandler])

    return <MapView style={styles.map} initialRegion={initialRegion} onPress={selectLocationHandler}>
        {!!selectedLocation && <Marker
            title="Picked Location"
            coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }}
        />}
    </MapView>
}

export default Map;

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})
