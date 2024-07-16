import React, { useState } from 'react'
import api from '../api'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import '../styles/form.css'
import Login from '../pages/Login'

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
        <div id='login-form' className='login'>
            <form onSubmit={handleSubmit} className='form-container'>
                <h1>{formTitle}</h1>
                <input
                    className='form-input'
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className='form-input'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                { method === 'register' ?
                <p>Already have an account? <Link to='/login'>Log in</Link></p> :
                <p>Don't have an account? <Link to='/register'>Register</Link></p>
                }
                <button className='form-button' type='submit'>
                    {formTitle}
                </button>
            </form>
        </div>
    )
}

export default Form