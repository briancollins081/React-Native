import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";

const RecentExpenses = () => {
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState()
    const expensesContext = useContext(ExpensesContext)

    useEffect(() => {
        const getExpenses = async () => {
            try {
                setIsFetching(true)
                const expenses = await fetchExpenses();
                expensesContext.setExpenses(expenses);
            } catch (error) {
                setError("Could not fetch expenses!")
            } finally {
                setIsFetching(false)
            }
        }
        getExpenses();
    }, [])

    const recentExpense = expensesContext.expenses.filter(exp => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7)
        return exp.date > date7DaysAgo
    })

    const errorHandler = () => {
        setError(null)
    }

    if (!!error && !isFetching) {
        return <ErrorOverlay message={error} />
    }

    if (isFetching) {
        return <LoadingOverlay />
    }

    return <ExpensesOutput
        expenses={recentExpense}
        expensesPeriod="Last 7 days"
        fallbackText="No expenses registered for the last 7 days."
    />
}

export default RecentExpenses;

// const styles = StyleSheet.create({

// })