import { createContext, useReducer } from "react"

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => { },
    setExpenses: (expenses) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, amount, date }) => { }
})

const expensesReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return [{ ...action.payload }, ...state]
        case 'SET':
            return action.payload.reverse()
        case 'UPDATE':
            const expIndex = state.findIndex(exp => exp.id === action.payload.id)
            const expense = state[expIndex];
            const updatedExpense = { ...expense, ...action.payload.data }
            let updateExpenses = [...state]
            updateExpenses[expIndex] = updatedExpense;
            return updateExpenses;

        case 'DELETE':
            return state.filter(exp => exp.id !== action.payload)

        default:
            return state;
    }
}

const ExpensesContextProvider = ({ children }) => {
    const [expensesState, dispatch] = useReducer(expensesReducer, [])

    const addExpense = (expenseData) => {
        dispatch({ type: 'ADD', payload: expenseData })
    }

    const setExpenses = (expenses) => {
        dispatch({ type: 'SET', payload: expenses })
    }

    const deleteExpense = (expenseId) => {
        dispatch({ type: 'DELETE', payload: expenseId })
    }
    const updateExpense = (expenseId, expenseData) => {
        dispatch({ type: 'UPDATE', payload: { id: expenseId, data: expenseData } })
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        setExpenses: setExpenses,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    }
    return <ExpensesContext.Provider value={value}>
        {children}
    </ExpensesContext.Provider>
}

export default ExpensesContextProvider;