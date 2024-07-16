import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import api from '../api'

function ProtectedRoutes({ children }) {
    // we need to check if we are authorized before we let someone access this route
    // otherwise we need to redirect them to the login page
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)

        try {
            // send a request to our server to get a new access token
            const response = await api.post('/api/token/refresh/', {
                refresh_token: refreshToken
            })
            // if response is successful, we'll store the new access token
            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error)
            localStorage.removeItem(ACCESS_TOKEN)
            localStorage.removeItem(REFRESH_TOKEN)
            setIsAuthorized(false)
        }
    }

    // check if our access token is expired
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setIsAuthorized(false)
            return
        }

        // refresh token if expired
        const decoded = jwtDecode(token)
        if (decoded.exp * 1000 < Date.now()) {
            await refreshToken()
        } else {
            // if not expired, we still have access with our token
            setIsAuthorized(true)
        }
    }

    if (isAuthorized === null) {
        return (
            <div>Loading...</div>
        )
    }

    return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoutes