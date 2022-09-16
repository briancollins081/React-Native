import axios from "axios";

const API_KEY = "AIzaSyDlmkjNLgKAegO7HgBuq5MX1wqavz2f-lM"

export const authenticate = async (mode, email, password) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`
    return await axios.post(url, { email, password })
}

export const createUser = async (email, password) => {
    const response = await authenticate("signUp", email, password)
    const token = response.data.idToken
    return { token }
}

export const loginUser = async (email, password) => {
    const response = await authenticate("signInWithPassword", email, password)
    const token = response.data.idToken
    return { token }
}