import React from 'react'
import { useState, useEffect } from 'react'
import api from '../api'
import Recipe from '../components/Recipe'
import '../styles/homepage.css'
import Navigation from '../components/Navigation'

function Homepage() {
    const [recipes, setRecipes] = useState([])
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')

    useEffect(() => {
        getRecipes()
    }, [])

    
    const getRecipes = () => {
        api
        .get('/api/recipes/')
        .then((response) => response.data)
        .then((data) => { setRecipes(data); console.log(data) })
        .catch((error) => alert(error))
    }

    const createRecipe = (e) => {
        e.preventDefault()
        api
            .post('api/recipes/', { title: title, content: content })
            .then((response) => {
                if (response.status === 201) { alert('Recipe created') }
                else alert('Failed to create recipe')
                getRecipes()
            })
            .catch((error) => alert(error))
    }

    const deleteRecipe = (id) => {
        api
            .delete(`/api/recipes/delete/${id}/`)
            .then((response) => {
                if (response.status === 204) { alert('Recipe deleted') }
                else alert('Failed to delete recipe')
                getRecipes()
            })
            .catch((error) => alert(error))
    }

    return (
        <>
        <Navigation />
            <div className='recipe-section-title'>
                <h2>Create a Recipe!</h2>
            </div>
            <div>
                <form onSubmit={createRecipe}>
                    <label htmlFor='title'>Title:</label>
                    <br />
                    <input
                        type='text'
                        id='title'
                        name='title'
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <br />
                    <br />
                    <label htmlFor='content'>Content:</label>
                    <br />
                    <textarea
                        id='content'
                        name='content'
                        required
                        onChange={(e) => setContent(e.target.value)}
                        value={content}>
                    </textarea>
                    <br />
                    <input type='submit' value='Create Recipe' />
                </form>
                <br />
                <div className='recipes-on-file'>
                    <h2>Recipes on File:</h2>
                    {recipes.map((recipe) => (
                        <Recipe key={recipe.id} recipe={recipe} onDelete={deleteRecipe} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Homepage