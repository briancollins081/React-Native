import { useEffect, useState } from "react"
import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import OutlineButton from "../components/ui/OutlineButton"
import { Colors } from "../constants/colors"
import { fetchPlaceDetails } from "../util/database"

const PlaceDetails = ({ route, navigation }) => {
    const [place, setPlace] = useState();

    const selectedPlaceId = route.params.placeId;

    useEffect(() => {
        const loadPlaceDetails = async () => {
            const place = await fetchPlaceDetails(selectedPlaceId)
            setPlace(place)
            navigation.setOptions({
                title: place.title,
            })
        }
        loadPlaceDetails()
    }, [selectedPlaceId])

    const showOnMapHandler = () => {
        navigation.navigate("Map", { initialLat: place.location.lat, initialLng: place.location.lng })
    }

    if (!place) return <View style={styles.fallback}>
        <Text>Loading place data...</Text>
    </View>

    return <ScrollView>
        <Image style={styles.image} source={{ uri: place.imageUri }} />
        <View style={styles.locationContainer}>
            <View style={styles.addressContainer}>
                <Text style={styles.address}>{place.location.address}</Text>
            </View>
        </View>
        <OutlineButton icon="map" onPress={showOnMapHandler}>View on Map</OutlineButton>
    </ScrollView>
}

export default PlaceDetails

const styles = StyleSheet.create({
    fallback: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        height: "35%",
        width: "100%",
        minHeight: 300,
    },
    locationContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    addressContainer: {
        padding: 20
    },
    address: {
        color: Colors.primary500,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,

    }
})