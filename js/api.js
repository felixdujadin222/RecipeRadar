// Handles API calls to TheMealDB
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';

// 1. Search recipes by keyword or ingredient name
export async function searchRecipes(query) {
    try {
        const response = await fetch(`${BASE_URL}search.php?s=${query}`);
        const data = await response.json();
        return data.meals || [];
    } catch (error) {
        console.error('Error fetching recipes by search:', error);
        return [];
    }
}

// 2. Filter recipes by category (e.g., Seafood, Vegetarian, Breakfast)
export async function getRecipesByCategory(category) {
    try {
        const response = await fetch(`${BASE_URL}filter.php?c=${category}`);
        const data = await response.json();
        return data.meals || [];
    } catch (error) {
        console.error('Error fetching recipes by category:', error);
        return [];
    }
}

// 3. Fetch a single random recipe for the "Surprise Me" feature
export async function getRandomRecipe() {
    try {
        const response = await fetch(`${BASE_URL}random.php`);
        const data = await response.json();
        return data.meals ? data.meals[0] : null;
    } catch (error) {
        console.error('Error fetching random recipe:', error);
        return null;
    }
}

// Fetch all meal categories for filter buttons
export async function getCategories() {
    try {
        const response = await fetch(`${BASE_URL}categories.php`);
        const data = await response.json();
        return data.categories || [];
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

// Add this second API function to your existing api.js
export async function getRandomCocktail() {
    try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        const data = await response.json();
        return data.drinks ? data.drinks[0] : null;
    } catch (error) {
        console.error('Error fetching cocktail API:', error);
        return null;
    }
}