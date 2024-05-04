const cocktailDBSeachEndpoint = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const cocktailDBDetailsEndpoint = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
const inputButton = document.getElementById("input-cocktail");
const cocktailsContainer = document.getElementById("cocktails");
const cocktailModalPopup = document.getElementById("cocktail-modal");



function renderCocktails(cocktails)
{
    cocktailsContainer.innerHTML = "";

    cocktails.forEach(cocktail =>
    {
        const template = `
        <div class="card my-4" style="width: 18rem;">
            <img src="${cocktail.strDrinkThumb}" class="card-img-top" alt="${cocktail.strDrink}">
            <div class="card-body d-flex flex-column justify-content-evenly text-center">
                <h5 class="card-title">${cocktail.strDrink}</h5>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#cocktail-modal" onclick="renderCocktailModal(${cocktail.idDrink})">Mostra dettagli
                </button>
            </div>
        </div>
        `;

        cocktailsContainer.innerHTML += template;
    });
}

async function getCocktailDetails(cocktailId)
{
    const res = await (await fetch(`${cocktailDBDetailsEndpoint}${cocktailId}`)).json();
    return res.drinks[0];
}

async function renderCocktailModal(cocktailId)
{
    const modalTitle = cocktailModalPopup.querySelector(".modal-title");
    const modalBodyDetails = cocktailModalPopup.querySelector(".modal-body p");
    const modalImage = cocktailModalPopup.querySelector(".modal-body img");
    const cocktailDetails = await getCocktailDetails(cocktailId);

    modalTitle.innerHTML = cocktailDetails.strDrink;
    modalBodyDetails.innerHTML = cocktailDetails.strInstructionsIT;
    modalImage.setAttribute("src", cocktailDetails.strDrinkThumb);
    modalImage.setAttribute("alt", cocktailDetails.strDrink);
}

async function getCocktail()
{
    const inputValue = inputButton.value.trim();
    if(!inputValue.length) return inputButton.value = "";

    const res = await (await fetch(`${cocktailDBSeachEndpoint}${inputValue}`)).json();

    renderCocktails(res.drinks);
    inputButton.value = "";
}


const callApiButton = document.getElementById("call-api-button");
callApiButton.addEventListener("click", getCocktail);