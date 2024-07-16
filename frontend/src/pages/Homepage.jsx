import React from 'react'
import { useState, useEffect } from 'react'
import api from '../api'

function Homepage() {
    const [recipes, setRecipes] = useState([])
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')

    useEffect(() => {
        getRecipes()
    }, [])

    const createRecipe = (e) => {
        e.preventDefault()
        api
        .post('api/recipes/', {title: title, content: content})
        .then((response) => {
            if (response.status === 201) {alert('Recipe created')}
            else alert('Failed to create recipe')
            getRecipes()
        })
        .catch((error) => alert(error))
    }

    const getRecipes = () => {
        api
        .get('/api/recipes/')
        .then((response) => response.data)
        .then((data) => {setRecipes(data); console.log(data)})
        .catch((error) => alert(error))
    }

    const deleteRecipe = (id) => {
        api
        .delete(`/api/recipes/delete/${id}/`)
        .then((response) => {
            if (response.status === 204) {alert('Recipe deleted')}
            else alert('Failed to delete recipe')
        })
        .catch((error) => alert(error))
        getRecipes()
    }

    return (
        <div>Homepage</div>
    )
}

export default Homepage