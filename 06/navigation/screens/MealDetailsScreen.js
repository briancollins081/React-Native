import { Text, View } from "react-native";

const MealDetailsScreen = ({ route }) => {
    const mealId = route.params.mealId
    return <View>
        <Text>Details for: {mealId}</Text>
    </View>
}

export default MealDetailsScreen;