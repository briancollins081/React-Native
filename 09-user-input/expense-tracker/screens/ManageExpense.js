import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import Button from "../components/ui/Button";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";

const ManageExpenses = ({ route, navigation }) => {
    const expenseCtx = useContext(ExpensesContext);

    const editExpenseId = route.params?.expenseId;
    const isEditing = !!editExpenseId

    const selectedExpense = expenseCtx.expenses.find(exp => exp.id === editExpenseId)

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

    const confirmHandler = (data) => {
        if (isEditing) {
            expenseCtx.updateExpense(editExpenseId, data)
        } else {
            expenseCtx.addExpense(data)
        }
        navigation.goBack();
    }

    return <View style={styles.container}>
        <ExpenseForm 
        isEditing={isEditing} 
        onCancel={cancelHandler} 
        onConfirm={confirmHandler}
        defaultValues={selectedExpense} 
        />
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
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: "center",
    }
})