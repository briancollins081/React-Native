import { Pressable, StyleSheet, Text, View } from "react-native"

const GoalItem = ({ itemData, onDelete }) => {
    const onPressItem = () => {
        onDelete(itemData.item.id)
    }
    return <View style={styles.goalItemContainer}>
        <Pressable android_ripple={{ color: "#210645" }} onPress={onPressItem} style={({ pressed }) => pressed && styles.pressedItem}>
            <Text style={styles.goalItem}>{itemData.item.text}</Text>
        </Pressable>
    </View>
}

export default GoalItem

const styles = StyleSheet.create({
    goalItemContainer: {
        marginTop: 8,
        borderRadius: 6,
        backgroundColor: "#5e0acc",
    },
    goalItem: {
        padding: 8,
        color: "#fff",
    },
    pressedItem: {
        opacity: 0.75
    },
})