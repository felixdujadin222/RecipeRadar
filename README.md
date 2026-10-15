# 🍳 RecipeRadar

RecipeRadar is a modern, modular JavaScript web application that allows users to discover, search, filter, and save their favorite recipes instantly using [TheMealDB API](https://www.themealdb.com/api.php).

---

## ✨ Features

* **Keyword Search**: Search for meals and ingredients dynamically with real-time results and loading states.
* **Category Filtering**: Instantly filter recipes by popular categories (Seafood, Vegetarian, Dessert, Chicken, etc.).
* **"Surprise Me" Generator**: Discover a random meal at the click of a button.
* **Saved Favorites**: Bookmark recipes and manage your personal collection using browser `localStorage`.

---

## 📂 Project Architecture & Modules

The application follows a clean modular JavaScript structure:

* **`js/api.js`**: Manages all asynchronous network requests to TheMealDB API (search queries, category lookups, random meal generation, and category lists).
* **`js/ui.js`**: Handles dynamic DOM manipulation, HTML template rendering, loading indicators, and empty-state messaging.
* **`js/storage.js`**: Encapsulates browser `localStorage` operations for saving, removing, and retrieving favorite recipes.
* **`js/main.js`**: Acts as the central entry point, wiring up event listeners for user interactions, search submissions, navigation, and state caching.

---

## 🛠️ Technologies Used

* **HTML5** & **CSS3** (with Google Fonts: Inter & Poppins)
* **Vanilla JavaScript (ES6 Modules)**
* **TheMealDB REST API**
* **Git & GitHub** for version control and deployment

---

## 🚀 Getting Started & Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dujadin22/RecipeRadar.git
