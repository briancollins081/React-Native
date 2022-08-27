import { useState } from "react";
import { TextInput, View, StyleSheet, Alert } from "react-native";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";

const StartGameScreen = ({ onPickedNumber }) => {
    const [enteredNumber, setEnteredNumber] = useState("");

    const inputChangeHandler = (enteredText) => {
        setEnteredNumber(enteredText)
    }

    const resetInputHandler = () => {
        setEnteredNumber("")
    }

    const confirmInputHandler = () => {
        const number = parseInt(enteredNumber);
        if (isNaN(number) || number < 1 || number > 99) {
            Alert.alert(
                "Invalid number!",
                "Number must have a value between 1 and 99",
                [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
            )
            return;
        }
        onPickedNumber(number)
    }
    return <View style={styles.rootContainer}>
        <Title>Guess My Number</Title>
        <Card>
            <InstructionText text="Enter a Number" />
            <TextInput
                style={styles.numberInput}
                maxLength={2}
                keyboardType="number-pad"
                autoCapitalize="none"
                autoCorrect={false}
                value={enteredNumber}
                onChangeText={inputChangeHandler}
            />
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                </View>
            </View>
        </Card>
    </View>
}

export default StartGameScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginTop: 100,
        alignItems: "center"
    },
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: "bold",
        textAlign: "center",
    },
    buttonsContainer: {
        flexDirection: "row"
    },
    buttonContainer: {
        flex: 1
    }
})