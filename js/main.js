import { searchRecipes, getRecipesByCategory, getRandomRecipe, getRandomCocktail } from './api.js';
import { renderRecipes, showLoading } from './ui.js';
import { getFavorites, saveFavorite, removeFavorite, isFavorite } from './storage.js';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');

// Keep track of currently displayed recipes in memory
let currentRecipes = [];

// Helper wrapper to update both memory and render UI
function displayAndCacheRecipes(recipes) {
    currentRecipes = recipes;
    renderRecipes(recipes);
}

// 1. Handle search form submission
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return;

    showLoading();
    const recipes = await searchRecipes(query);
    displayAndCacheRecipes(recipes);
});

// 2. Handle category button clicks & Favorite button clicks
document.addEventListener('click', async (e) => {
    // Category filter clicks
    if (e.target.classList.contains('category-btn')) {
        const category = e.target.dataset.category;
        if (!category) return;

        showLoading();
        const recipes = await getRecipesByCategory(category);
        displayAndCacheRecipes(recipes);
        return;
    }

    // Favorite button clicks
    if (e.target.classList.contains('favorite-btn')) {
        const button = e.target;
        const recipeId = button.dataset.id;
        
        // Find recipe from current cache or localStorage
        let recipe = currentRecipes.find(r => r.idMeal === recipeId);
        if (!recipe) {
            const favorites = getFavorites();
            recipe = favorites.find(r => r.idMeal === recipeId);
        }

        if (!recipe) return;

        if (isFavorite(recipeId)) {
            removeFavorite(recipeId);
            button.style.background = '#10B981';
            button.textContent = 'Save Favorite';
        } else {
            saveFavorite(recipe);
            button.style.background = '#EF4444';
            button.textContent = 'Remove Favorite';
        }
    }
});

// 3. Handle "Surprise Me" navigation click
const surpriseLink = document.querySelector('nav.nav-links a:nth-child(3)');
if (surpriseLink) {
    surpriseLink.addEventListener('click', async (e) => {
        e.preventDefault();
        showLoading();
        
        const randomMeal = await getRandomRecipe();
        const recipesArray = Array.isArray(randomMeal) ? randomMeal : [randomMeal];
        displayAndCacheRecipes(recipesArray);
    });
}

// 4. Handle "Saved Favorites" navigation click
const favoritesLink = document.querySelector('nav.nav-links a:nth-child(2)');
if (favoritesLink) {
    favoritesLink.addEventListener('click', (e) => {
        e.preventDefault();
        
        const favorites = getFavorites();
        
        if (favorites.length === 0) {
            resultsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #6B7280;">No saved favorites yet. Explore recipes and save your favorites!</p>';
            currentRecipes = [];
            return;
        }
        
        displayAndCacheRecipes(favorites);
    });
}

// 5. Handle "Drink Pairing" navigation click (Second API)
const cocktailLink = document.getElementById('cocktail-link');
if (cocktailLink) {
    cocktailLink.addEventListener('click', async (e) => {
        e.preventDefault();
        showLoading();
        
        const cocktail = await getRandomCocktail();
        if (cocktail) {
            const formattedCocktail = [{
                idMeal: cocktail.idDrink,
                strMeal: `Drink Pairing: ${cocktail.strDrink}`,
                strCategory: cocktail.strCategory,
                strArea: cocktail.strAlcoholic,
                strMealThumb: cocktail.strDrinkThumb,
                strInstructions: cocktail.strInstructions
            }];
            displayAndCacheRecipes(formattedCocktail);
        } else {
            resultsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #6B7280;">Could not fetch drink pairing. Try again!</p>';
        }
    });
}