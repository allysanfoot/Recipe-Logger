import React from 'react'
import '../styles/navigation.css'
import { Link } from 'react-router-dom'

function Navigation() {
    return (
        <div>
            <nav>
                <ul className='navigation'>
                    <li><Link to='/'>Home</Link></li>
                    <li>About</li>
                    <li>Contact</li>
                    <li><Link to='/logout'>Logout</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navigation