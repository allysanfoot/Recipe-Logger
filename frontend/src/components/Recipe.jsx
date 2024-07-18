import React from 'react'
import '../styles/recipe.css'

function Recipe({ recipe, onDelete }) {
    const formattedDate = new Date(recipe.created_at).toLocaleDateString('en-US')

    return (
        <div className='recipe-container'>
            <p className='recipe-title'>{recipe.title}</p>
            <p className='recipe-content'>{recipe.content}</p>
            <p className='recipe-date'>{formattedDate}</p>
            <button className='delete-button' onClick={() => onDelete(recipe.id)}>Delete</button>
        </div>
    )
}

export default Recipe