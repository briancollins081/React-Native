import { useContext } from "react";
import { StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

const RecentExpenses = () => {
    const expensesContext = useContext(ExpensesContext)
    const recentExpense = expensesContext.expenses.filter(exp => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7)
        return exp.date > date7DaysAgo
    })
    return <ExpensesOutput
        expenses={recentExpense}
        expensesPeriod="Last 7 days"
        fallbackText="No expenses registered for the last 7 days."
    />
}

export default RecentExpenses;

const styles = StyleSheet.create({

})