import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../components/ui/Button";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";

const ManageExpenses = ({ route, navigation }) => {
    const expenseCtx = useContext(ExpensesContext);

    const editExpenseId = route.params?.expenseId;
    const isEditing = !!editExpenseId

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing])

    const deleteExpenseHandler = () => {
        expenseCtx.deleteExpense(editExpenseId)
        navigation.goBack();
    }

    const cancelHandler = () => {
        navigation.goBack();
    }

    const confirmHandler = () => {
        if (isEditing) {
            expenseCtx.updateExpense(
                editExpenseId,
                {
                    description: "Test Update!!!!",
                    amount: 67.99,
                    date: new Date('2022-09-10')
                }
            )
        } else {
            expenseCtx.addExpense(
                {
                    description: "Test Add",
                    amount: 19.99,
                    date: new Date('2022-08-19')
                }
            )
        }
        navigation.goBack();
    }

    return <View style={styles.container}>
        <View style={styles.buttonsContainer}>
            <Button style={styles.button} mode="flat" onPress={cancelHandler}>Cancel</Button>
            <Button style={styles.button} onPress={confirmHandler}>{isEditing ? "Update" : "Add"}</Button>
        </View>
        {isEditing && <View style={styles.deleteContainer}>
            <IconButton
                icon="trash"
                color={GlobalStyles.colors.error500}
                size={36}
                onPress={deleteExpenseHandler}
            />
        </View>
        }
    </View>
}

export default ManageExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
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
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: "center",
    }
})