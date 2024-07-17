import React from 'react'

function Recipe({ recipe, onDelete }) {
    const formattedDate = new Date(recipe.created_at).toLocaleDateString('en-US')

    return (
        <div className='note-container'>
            <p className='note-title'>{recipe.title}</p>
            <p className='note-content'>{recipe.content}</p>
            <p className='note-date'>{formattedDate}</p>
            <button className='delete-button' onClick={() => onDelete(recipe.id)}>Delete</button>
        </div>
    )
}

export default Recipe