import { StyleSheet, View, Text } from "react-native";

const Subtitle = ({text}) => {
    return <View style={styles.titleContainer}>
        <Text style={styles.title}>{text}</Text>
    </View>
}

export default Subtitle;

const styles = StyleSheet.create({
    title: {
        color: "#E2B497",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    titleContainer: {
        padding: 6,
        marginHorizontal: 12,
        marginVertical: 4,
        borderBottomColor: "#E2B497",
        borderBottomWidth: 2,
    }
})