const restaurantUrl = "https://jsonplaceholder.typicode.com/todos";
const inputElement = document.getElementById("input-id");
const restaurantsTitles = document.getElementById("restaurants-titles");



function clearLocal()
{
    localStorage.clear();
    location.reload();
}

function getLocalRestaurants()
{
    const ristorantiString = localStorage.getItem("ristoranti");
    if(!ristorantiString) return null;

    return JSON.parse(ristorantiString);
}

function addLocalRestaurant(restaurant)
{
    let ristorantiBavaresi = getLocalRestaurants();
    if(!ristorantiBavaresi) ristorantiBavaresi = [];

    ristorantiBavaresi.push(restaurant);
    localStorage.setItem("ristoranti", JSON.stringify(ristorantiBavaresi));
}

function displayRestaurant(restaurant)
{
    let div = document.createElement("div");
    let hr = document.createElement("hr");
    let p = document.createElement("p");
    p.innerHTML = restaurant.title;

    div.append(p, hr);
    restaurantsTitles.append(div);
}


async function callApi()
{
    const id = inputElement.value;
    if(!id.length) return alert("Devi inserire un id");
    if(id < 1 || id > 200) return alert("L'id del ristorante deve essere tra 1 e 200");

    const res = await (await fetch(`${restaurantUrl}/${id}`)).json();

    addLocalRestaurant(res);
    displayRestaurant(res);

    inputElement.value = "";
}

window.onload = () =>
{
    const ristorantiBavaresi = getLocalRestaurants();
    if(ristorantiBavaresi) for(let i = 0; i < ristorantiBavaresi.length; i++)
        displayRestaurant(ristorantiBavaresi[i]);
};