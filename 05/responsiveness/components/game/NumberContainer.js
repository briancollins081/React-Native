import { Dimensions, StyleSheet, Text, View } from "react-native"
import Colors from "../../constants/colors";

const NumberContainer = ({ children }) => {
    return <View style={styles.container}>
        <Text style={styles.text}>{children}</Text>
    </View>
}

export default NumberContainer;

const deviceWidth = Dimensions.get("screen").width

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: Colors.accent500,
        padding: deviceWidth < 380 ? 12 : 24,
        margin: deviceWidth < 380 ? 12 : 24,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: Colors.accent500,
        fontSize: deviceWidth < 380 ? 28 : 36,
        // fontWeight: "bold"
        fontFamily: "open-sans-bold"
    }
})