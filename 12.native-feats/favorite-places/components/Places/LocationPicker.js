import { Image, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import { Colors } from "../../constants/colors";
import OutlineButton from "../ui/OutlineButton";
import { useEffect, useState } from "react";
import { getMapPreview } from "../../util/location";

const LocationPicker = () => {
    const [pickedLocation, setPickedLocation] = useState()

    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const route = useRoute();

    const [locationPermissionsInfo, requestLocationPermission] = useForegroundPermissions();



    useEffect(() => {
        if (isFocused && route.params) {
            const mapPickedLocation = { lat: route.params.pickedLat, lng: route.params.pickedLng }
            setPickedLocation(mapPickedLocation)
        }
    }, [route, isFocused])

    const verifyPermissions = async () => {
        if (locationPermissionsInfo.status === PermissionStatus.UNDETERMINED) {
            const permissionRes = await requestLocationPermission()

            return permissionRes.granted
        }

        if (locationPermissionsInfo.status === PermissionStatus.DENIED) {
            Alert.alert("Insufficient Permissions", "You need to grant location permissions in order to use this feature!")
            return false
        }
        return true;
    }

    const getLocationHandler = async () => {
        try {
            const hasPermission = await verifyPermissions();
            if (!hasPermission) return;

            const location = await getCurrentPositionAsync();
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })
        } catch (error) {
            console.log(error);
        }
    }

    const pickOnMapHandler = () => {
        navigation.navigate("Map")
    }

    let locationPreview = <Text>No location picked yet.</Text>
    if (pickedLocation) {
        locationPreview = <Image
            style={styles.image}
            source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}
        />
    }

    return <View style={styles.container}>
        <View style={styles.mapPreview}>
            {locationPreview}
        </View>
        <View style={styles.actions}>
            <OutlineButton
                icon="location"
                onPress={getLocationHandler}
            >Locate User</OutlineButton>
            <OutlineButton
                icon="map"
                onPress={pickOnMapHandler}
            >Pick on Map</OutlineButton>
        </View>
    </View>
}

export default LocationPicker;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 32
    },
    mapPreview: {
        width: "100%",
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 4,
    }
})