import { Dimensions, Image, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";

const GameOverScreen = ({ rounds, userNumber, onStartNewGame }) => {
    const { width, height } = useWindowDimensions();
    let imageSize = 300;
    if (width < 380) {
        imageSize = 150
    }
    if (height < 400) {
        imageSize = 80
    }
    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2,
    }
    return <ScrollView style={styles.screen}>
        <View style={styles.rootContainer}>
            <Title>GAME OVER!</Title>
            <View style={[styles.imageContainer, imageStyle]}>
                <Image style={styles.image} source={require("../assets/images/success.png")} />
            </View>
            <Text style={styles.summaryText}>Your phone needed <Text style={styles.hilightText}>{rounds}</Text> rounds to guess the number <Text style={styles.hilightText}>{userNumber}</Text></Text>
            <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
        </View>
    </ScrollView>
}

export default GameOverScreen;

const deviceWidth = Dimensions.get("screen").width
const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        color: Colors.primary800,
        borderWidth: 3,
        // borderRadius: deviceWidth < 380 ? 75 : 150,
        // width: deviceWidth < 380 ? 150 : 300,
        // height: deviceWidth < 380 ? 150 : 300,
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