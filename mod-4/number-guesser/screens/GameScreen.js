import { useState } from "react";
import { StyleSheet, Text, View } from "react-native"
import Title from "../components/ui/Title";

const generateRandomNumberBetween = (min, max, exclude) => {
    const randNum = Math.floor(Math.random() * (max - min)) + min
    if (randNum === exclude) {
        return generateRandomNumberBetween(min, max, exclude)
    } else {
        return randNum;
    }
}

const GameScreen = ({ userNumber }) => {
    const initialNo = generateRandomNumberBetween(1, 100, userNumber)
    const [currentGuess, setCurrentGuess] = useState(initialNo)

    return <View style={styles.screen}>
        <Title>Opponent's Guess</Title>
        {/* GUESS */}
        <View>
            <Text>Higher or lower</Text>
            {/* +- */}
        </View>
        {/* <View>Log rounds</View> */}
    </View>
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ddb52f",
        textAlign: "center",
        borderWidth: 2,
        borderColor: "#ddb52f",
        padding: 12,
    },

})