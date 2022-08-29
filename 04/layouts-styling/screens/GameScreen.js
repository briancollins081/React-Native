import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import GuessLogItem from "../components/game/GuessLogItem";

const generateRandomNumberBetween = (min, max, exclude) => {
    const randNum = Math.floor(Math.random() * (max - min)) + min
    if (randNum === exclude) {
        return generateRandomNumberBetween(min, max, exclude)
    } else {
        return randNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;



const GameScreen = ({ userNumber, onGameOver }) => {
    const initialNo = generateRandomNumberBetween(1, 100, userNumber)
    const [currentGuess, setCurrentGuess] = useState(initialNo)
    const [guessRounds, setGuessRounds] = useState([initialNo])

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length)
        }
    }, [currentGuess, userNumber, onGameOver])

    useEffect(() => {
        maxBoundary = 100;
        minBoundary = 1;
    }, [])

    const nextGuessHandler = (direction) => { // direction => 'lower' or 'greater'
        if ((direction === 'lower' && currentGuess < userNumber) || (direction === 'greater' && currentGuess > userNumber)) {
            Alert.alert("Don't lie!", "You know that is wrong...", [{ text: "Sorry!", style: "cancel" }])
            return
        }
        if (direction === 'lower') {
            maxBoundary = currentGuess; // max is excluded in rand()
        } else {
            minBoundary = currentGuess + 1; // min is included in rand()
        }
        // console.log({ userNumber, minBoundary, maxBoundary });
        const randNumber = generateRandomNumberBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(randNumber)
        setGuessRounds(prevRounds => [randNumber, ...prevRounds])
    }

    const guessRoundsListLength = guessRounds.length

    return <View style={styles.screen}>
        <Title>Opponent's Guess</Title>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
            <InstructionText style={styles.instructionText} text="Higher or lower" />
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={() => nextGuessHandler("lower")}>
                        <Ionicons name="md-remove" size={24} color="white" />
                    </PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={() => nextGuessHandler("greater")}>
                        <Ionicons name="md-add" size={24} color="white" />
                    </PrimaryButton>
                </View>
            </View>
        </Card>
        <View style={styles.logListContainer}>
            {/* {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)} */}
            <FlatList
                data={guessRounds}
                renderItem={(itemData) => <GuessLogItem roundNumber={guessRoundsListLength - itemData.index} guess={itemData.item} />}
                keyExtractor={(item) => item}
            />
        </View>
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
    instructionText: {
        marginBottom: 12,
    },
    buttonsContainer: {
        flexDirection: "row"
    },
    buttonContainer: {
        flex: 1
    },
    logListContainer: {
        flex: 1,
        padding: 16,
    }
})