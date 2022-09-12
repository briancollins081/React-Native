import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import Button from "../ui/Button";
import Input from "./Input";

const ExpenseForm = ({ isEditing, defaultValues, onCancel, onConfirm }) => {
    const [formInput, setFormInput] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : "",
            isValid: true
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : "",
            isValid: true
        },
        description: {
            value: defaultValues ? defaultValues.description : "",
            isValid: true
        }
    });

    const inputChangeHandler = (inputIdentifier, enteredVal) => {
        setFormInput(prev => ({
            ...prev,
            [inputIdentifier]: {
                value: enteredVal,
                isValid: true
            }
        }))
    }

    const formSubmissionHandler = () => {
        let data = {
            amount: Number(formInput.amount.value),
            date: new Date(formInput.date.value),
            description: formInput.description.value
        }
        // validate data
        const amountIsValid = !isNaN(formInput.amount.value) && formInput.amount.value > 0
        const dateIsValid = new Date(formInput.date.value).toString() !== "Invalid Date"
        const descriptionIsValid = !!formInput.description.value && formInput.description.value.trim().length > 0
        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            setFormInput(prev => {
                return {
                    amount: { value: prev.amount.value, isValid: amountIsValid },
                    date: { value: prev.date.value, isValid: dateIsValid },
                    description: { value: prev.description.value, isValid: descriptionIsValid },
                }
            })
            return;
        }
        // send data
        onConfirm(data)
    }

    const formIsInValid = !formInput.amount.isValid || !formInput.date.isValid || !formInput.description.isValid

    return <View style={styles.form}>
        <Text style={styles.formTitle}>Your Expense</Text>
        <View style={styles.inputsRow}>
            <Input
                label="Amount"
                textInputConfig={{
                    keyboardType: "decimal-pad",
                    onChangeText: enteredAmount => inputChangeHandler("amount", enteredAmount),
                    value: formInput.amount.value
                }}
                style={styles.rowSetting}
                invalid={!formInput.amount.isValid}
            />
            <Input
                label="Date"
                textInputConfig={{
                    placeholder: "YYYY-MM-DD",
                    maxLength: 10,
                    onChangeText: enteredDate => inputChangeHandler("date", enteredDate),
                    value: formInput.date.value
                }}
                style={styles.rowSetting}
                invalid={!formInput.date.isValid}
            />
        </View>
        <Input
            label="Description"
            textInputConfig={{
                multiline: true,
                onChangeText: enteredDesc => inputChangeHandler("description", enteredDesc),
                value: formInput.description.value
            }}
            invalid={!formInput.description.isValid}
        />
        {formIsInValid && <Text style={styles.errorText}>Form is invalid, please check entered data!</Text>}
        <View style={styles.buttonsContainer}>
            <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
            <Button style={styles.button} onPress={formSubmissionHandler}>{isEditing ? "Update" : "Add"}</Button>
        </View>
    </View>

}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 40,

    },
    inputsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rowSetting: {
        flex: 1,
    },
    errorText: {
        textAlign: "center",
        color: GlobalStyles.colors.error500,
        margin: 8,
    },
    formTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginVertical: 24,
        textAlign: "center",
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
})