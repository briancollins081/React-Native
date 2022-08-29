import { Image, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";

const GameOverScreen = ({ rounds, userNumber, onStartNewGame }) => {
    return <View style={styles.rootContainer}>
        <Title>GAME OVER!</Title>
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={require("../assets/images/success.png")} />
        </View>
        <Text style={styles.summaryText}>Your phone needed <Text style={styles.hilightText}>{rounds}</Text> rounds to guess the number <Text style={styles.hilightText}>{userNumber}</Text></Text>
        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
    </View>
}

export default GameOverScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        borderRadius: 150,
        borderWidth: 3,
        color: Colors.primary800,
        width: 300,
        height: 300,
        overflow: "hidden",
        margin: 36,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    summaryText: {
        fontFamily: "open-sans",
        textAlign: "center",
        marginBottom: 24,
    },
    hilightText: {
        fontFamily: "open-sans-bold",
        color: Colors.primary500,
    }
})