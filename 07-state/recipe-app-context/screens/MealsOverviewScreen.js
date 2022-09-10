import { useLayoutEffect } from "react";
import MealsList from "../components/MealsList/MealsList";
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

    return <MealsList mealItems={displayedMeals} />
}

export default MealsOverviewScreen
