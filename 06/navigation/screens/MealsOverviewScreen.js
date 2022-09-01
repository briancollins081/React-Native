import { useLayoutEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native"
import MealItem from "../components/MealItem";
import { MEALS, CATEGORIES } from "../data/dummy-data";
const MealsOverviewScreen = ({ route, navigation }) => {
    const categoryId = route.params.categoryId;

    const displayedMeals = MEALS.filter((mealItem) => {
        return mealItem.categoryIds.indexOf(categoryId) > -1;
    })
    const categoryTitle = CATEGORIES.find(category => category.id === categoryId).title

    useLayoutEffect(() => {
        navigation.setOptions({
            title: categoryTitle
        });
    }, [categoryId, categoryTitle])

    const renderMealItem = (itemData) => {
        const mealItemProps = {
            id: itemData.item.id,
            title: itemData.item.title,
            imageUrl: itemData.item.imageUrl,
            duration: itemData.item.duration,
            complexity: itemData.item.complexity,
            affordability: itemData.item.affordability
        }
        return <MealItem
            {...mealItemProps}
        />
    }

    return <View style={styles.container}>
        <FlatList
            data={displayedMeals}
            keyExtractor={item => item.id}
            renderItem={renderMealItem}
        />
    </View>
}

export default MealsOverviewScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    }
})