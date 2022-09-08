import { useLayoutEffect } from "react";
import { Text, View, Image, StyleSheet, ScrollView, Button } from "react-native";
import IconButton from "../components/IconButton";
import List from "../components/MealDetail/List";
import Subtitle from "../components/MealDetail/Subtitle";
import MealDetails from "../components/MealDetails";
import { MEALS } from "../data/dummy-data"

const MealDetailsScreen = ({ route, navigation }) => {
    const mealId = route.params.mealId
    const selectedMeal = MEALS.find(m => m.id === mealId)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconButton icon="star" color="white" size={24} onPress={handleButtonPress} />
        })
    }, [navigation, handleButtonPress])

    const handleButtonPress = () => {
        console.info("Button pressed");
    }
    return <ScrollView style={styles.rootContainer}>
        <Image
            style={styles.image}
            source={{ uri: selectedMeal.imageUrl }}
        />
        <Text style={styles.title}>{selectedMeal.title}</Text>
        <MealDetails
            duration={selectedMeal.duration}
            complexity={selectedMeal.complexity}
            affordability={selectedMeal.affordability}
            textStyle={styles.detailText}
        />
        <View style={styles.listOuterContainer}>
            <View style={styles.listContainer}>
                <Subtitle text="Ingredients" />
                <List items={selectedMeal.ingredients} />
                <Subtitle text="Steps" />
                <List items={selectedMeal.steps} />
            </View>
        </View>
    </ScrollView>
}

export default MealDetailsScreen;

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 32
    },
    image: {
        width: "100%",
        height: 350,
    },
    title: {
        fontWeight: "bold",
        fontSize: 24,
        margin: 8,
        textAlign: "center",
        color: "white",
    },
    detailText: {
        color: "white"
    },
    listOuterContainer: {
        alignItems: "center",
    },
    listContainer: {
        width: "80%",
    }
})