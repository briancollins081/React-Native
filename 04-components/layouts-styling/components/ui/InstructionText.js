import { StyleSheet, Text } from "react-native";
import Colors from "../../constants/colors";

const InstructionText = ({ text, style }) => {
    return <Text style={[styles.text, style]}>{text}</Text>
}

export default InstructionText;

const styles = StyleSheet.create({
    text: {
        color: Colors.accent500,
        fontSize: 24,
        fontFamily: "open-sans",
    },
})