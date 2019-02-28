const endpoint = "https://gist.githubusercontent.com/kristinawang/0974ae55854c4e2cd7feca5570232cdd/raw/d673528dd5749f2a1c11184b16c62fe2251b6533/recipes.jsonhttps://gist.githubusercontent.com/kristinawang/0974ae55854c4e2cd7feca5570232cdd/raw/d673528dd5749f2a1c11184b16c62fe2251b6533/recipes.json";

const recipes = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => recipes.push(...data));

function findMatches(wordToMatch, recipes) {
    return recipes.filter(keyword => {
        const regEx = new RegExp(wordToMatch, "gi");
        return keyword.dish.match(regEx) || 
        keyword.ingredients[0].match(regEx);
    });
}

function displayMatches() {
    const matchArray = findMatches(this.value, recipes);
    const html = matchArray.map(keyword => {
        const regEx = new RegExp(this.value, "gi");
        const foodName = keyword.dish.replace(regEx, `<span class="hl">${this.value}</span>`);
        const ingredientName = keyword.ingredients[0].replace(regEx, `<span class="hl">${this.value}</span>`);
        return `
            <li>
                <span class="name">${foodName}, ${ingredientName}</span>
                <span class="cuisine">${keyword.cuisine}</span>
            </li>
     `;
    }).join("");
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);