import { createContext, useReducer } from "react"


const DUMMY_EXPENSES = [
    {
        id: "e1",
        description: "A pair of shoes",
        amount: 59.99,
        date: new Date('2021-12-28')
    },
    {
        id: "e2",
        description: "A pair of trousers",
        amount: 89.99,
        date: new Date('2022-09-16')
    },
    {
        id: "e3",
        description: "Vegetables",
        amount: 9.99,
        date: new Date('2022-08-06')
    },
    {
        id: "e4",
        description: "A book",
        amount: 12.99,
        date: new Date('2022-03-10')
    },
    {
        id: "e5",
        description: "Sci-Fiction book",
        amount: 20.00,
        date: new Date('2022-05-01')
    },
    {
        id: "e6",
        description: "A pair of trousers",
        amount: 89.99,
        date: new Date('2022-09-06')
    },
    {
        id: "e7",
        description: "Vegetables",
        amount: 9.99,
        date: new Date('2022-08-06')
    },
    {
        id: "e8",
        description: "A book",
        amount: 12.99,
        date: new Date('2022-03-10')
    },
    {
        id: "e9",
        description: "Sci-Fiction book",
        amount: 20.00,
        date: new Date('2022-05-01')
    },
]


export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, amount, date }) => { }
})

const expensesReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            const id = `ex-${new Date().getTime()}`
            return [{ ...action.payload, id }, ...state]

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
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES)

    const addExpense = (expenseData) => {
        dispatch({ type: 'ADD', payload: expenseData })
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
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    }
    return <ExpensesContext.Provider value={value}>
        {children}
    </ExpensesContext.Provider>
}

export default ExpensesContextProvider;