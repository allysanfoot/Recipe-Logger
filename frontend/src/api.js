import axios from 'axios'
import { ACCESS_TOKEN } from './constants'

const api = axios.create({
    // import anything specified in .env file
    baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use(
    (config) => {
        // look in our local storage and see if we have a token
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token) {
            // if we do, we'll add it to our headers
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

export default api