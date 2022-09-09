import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import MealsList from "../components/MealsList/MealsList";
import { MEALS } from "../data/dummy-data";

const FavoritesScreen = () => {
    const favoritesMealIds = useSelector(state => state.favoriteMeals.ids)
    const favoriteMeals = MEALS.filter(meal => favoritesMealIds.includes(meal.id))
    if (favoriteMeals.length < 1) {
        return <View style={styles.rootContainer}>
            <Text style={styles.text}>You have no favorite meals yet.</Text>
        </View>
    }
    return <MealsList mealItems={favoriteMeals} />
}

export default FavoritesScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white"
    }
})