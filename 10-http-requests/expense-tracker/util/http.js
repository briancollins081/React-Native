import axios from "axios";

const ROOT_ENDPOINT = "https://react-native-full-default-rtdb.firebaseio.com/"

export const storeExpense = async (expenseData) => {
    const response = await axios.post(ROOT_ENDPOINT + "expenses.json", expenseData)
    const id = response.data.name
    return id;
}

export const fetchExpenses = async () => {
    const response = await axios.get(ROOT_ENDPOINT + "expenses.json")
    const expenses = []
    for (const key in response.data) {
        if (Object.hasOwnProperty.call(response.data, key)) {
            const matched = response.data[key];
            const expense = {
                id: key,
                amount: matched.amount,
                date: new Date(matched.date),
                description: matched.description
            }
            expenses.push(expense)
        }
    }
    return expenses;
}

export const updateExpense = (id, expenseData) => {
    return axios.put(`${ROOT_ENDPOINT}expenses/${id}.json`, expenseData)
}

export const deleteExpense = (id) => {
    return axios.delete(`${ROOT_ENDPOINT}expenses/${id}.json`)
}