import React, { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'

function Form({ route, method }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const formTitle = method === 'login' ? 'Login' : 'Register'

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        // send request to the route
        try {
            const response = await api.post(route, { username, password })
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
                alert('Logged in!')
                navigate('/')
            } else {
                alert('Registered!')
                navigate('/login')
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className=''>
                <h1>{formTitle}</h1>
                <input
                    className=''
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className=''
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='' type='submit'>
                    {formTitle}
                </button>
            </form>
        </>
    )
}

export default Form