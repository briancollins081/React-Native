import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import PlaceItem from "./PlaceItem";
const PlacesList = ({ places = [] }) => {

    if (places.length < 1) {
        return <View style={styles.fallbackContainer}>
            <Text style={styles.fallbackText}>No places added yet - start adding some!</Text>
        </View>
    }

    return <FlatList
        data={places}
        keyExtractor={item => item.id}
        renderItem={(itemData) => {
            return <PlaceItem place={itemData.item} />
        }}
    />
}

export default PlacesList;

const styles = StyleSheet.create({
    fallbackContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200,
    }
})