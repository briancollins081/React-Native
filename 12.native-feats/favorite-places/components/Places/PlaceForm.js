import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { Colors } from "../../constants/colors";
import { Place } from "../../models/place";
import Button from "../ui/Button";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

const PlaceForm = ({ onCreatePlace }) => {
    const [enteredTitle, setEnteredTitle] = useState("");
    const [pickedLocation, setPickedLocation] = useState();
    const [selectedImage, setSelectedImage] = useState();

    const changeTitleHandler = (enteredText) => {
        setEnteredTitle(enteredText)
    }

    const savePlaceHandler = () => {
        onCreatePlace(new Place(enteredTitle, selectedImage, pickedLocation))
    }

    const takeImageHandler = (imageUri) => {
        setSelectedImage(imageUri)
    }

    const pickLocationHandler = useCallback((location) => {
        setPickedLocation(location)
    }, [])


    return <ScrollView style={styles.form}>
        <View>
            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}
                onChangeText={changeTitleHandler}
                value={enteredTitle}
            />
        </View>
        <ImagePicker onTakeImage={takeImageHandler} />
        <LocationPicker onPickLocation={pickLocationHandler} />
        <Button onPress={savePlaceHandler}>Add Place</Button>
        <View style={styles.separator}></View>
    </ScrollView>
}

export default PlaceForm;

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24,
    },
    label: {
        fontWeight: "bold",
        marginBottom: 4,
        color: Colors.primary500,
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 8,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100
    },
    separator: {
        flex: 1,
        paddingBottom: 32
    }
})
