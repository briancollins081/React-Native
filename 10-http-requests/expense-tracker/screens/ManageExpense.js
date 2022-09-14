import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import IconButton from "../components/ui/IconButton";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";

const ManageExpenses = ({ route, navigation }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState()

    const expenseCtx = useContext(ExpensesContext);

    const editExpenseId = route.params?.expenseId;
    const isEditing = !!editExpenseId

    const selectedExpense = expenseCtx.expenses.find(exp => exp.id === editExpenseId)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing])

    const deleteExpenseHandler = async () => {
        try {
            setIsSubmitting(true)
            await deleteExpense(editExpenseId)
            expenseCtx.deleteExpense(editExpenseId)
            navigation.goBack();
        } catch (error) {
            setError("Could not delete expense!")
        } finally {
            setIsSubmitting(false)
        }
    }

    const cancelHandler = () => {
        navigation.goBack();
    }

    const confirmHandler = async (data) => {
        let isAdding = true
        try {
            setIsSubmitting(true)
            if (isEditing) {
                expenseCtx.updateExpense(editExpenseId, data)
                await updateExpense(editExpenseId, data)
                isAdding = false
            } else {
                const id = await storeExpense(data)
                expenseCtx.addExpense({ ...data, id: id })
            }
            navigation.goBack();
        } catch (error) {
            setError(`Could not ${isAdding ? "create" : "update"} expense!`)
        } finally {
            setIsSubmitting(false)
        }
    }

    if(!!error && !isSubmitting) {
        return <ErrorOverlay message={error} />
    }

    if (isSubmitting) {
        return <LoadingOverlay />
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