import { StyleSheet, Text, View } from "react-native";

const List = ({ items = [] }) => {
    return <>
        {items.map(item => (
            <View style={styles.listItem} key={item}>
                <Text style={styles.item}>{item}</Text>
            </View>
        ))}
    </>
}

export default List;

const styles = StyleSheet.create({
    listItem: {
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginHorizontal: 12,
        marginVertical: 4,
        backgroundColor: "#e2b497",
    },
    item: {
        color: "#351401",
        textAlign: "center"
    }
})