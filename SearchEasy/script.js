const searchButton = document.getElementById("searchButton");
const searchBar = document.getElementById("searchBar");
const resultsContainer = document.getElementById("results");

searchButton.addEventListener("click", fetchCocktails);

async function fetchCocktails() {
    const searchQuery = searchBar.value;
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`);
        const data = await response.json();

        displayCocktails(data.drinks);
    } catch (error) {
        console.error("Error fetching data", error);
    }
}

function displayCocktails(cocktails) {
    resultsContainer.innerHTML = "";

    if(!cocktails) {
        resultsContainer.innerHTML = "<p> No Results Found.</p>";
        return;
    }

    cocktails.forEach(cocktail => {
        const cocktailDiv = document.createElement("div");
        cocktailDiv.className = "cocktail";

        const ingredientsList = getIngredientsList(cocktail);

        cocktailDiv.innerHTML = `
        <h3>${cocktail.strDrink}</h3>
        <div id="cocktailDetails">
        <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
        <p>${cocktail.strInstructions}</p>
        <h4>Ingredients:</h4>
        <ul>${ingredientsList}</ul> <!-- Added ul tag here -->
        </div>
        `;

        resultsContainer.appendChild(cocktailDiv);
    });
}

function getIngredientsList(cocktail) {
    const ingredientsList = [];
    for (let i = 1; i <= 15; i++) {
        const ingredient = cocktail[`strIngredient${i}`];
        const measure = cocktail[`strMeasure${i}`];

        if(ingredient && measure) {
            ingredientsList.push(`<li>${measure} ${ingredient}</li>`);
        }
    }
    return ingredientsList.join("");
}
