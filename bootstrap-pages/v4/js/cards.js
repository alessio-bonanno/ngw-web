const cardTemplate = `
<div class="col-lg-3 m-2">
    <div class="card">
    </div>
</div>
`;



class Card
{
    card;

    constructor(cardTemplate)
    {
        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = cardTemplate;

        this.card = tempDiv.children[0];
    }

    addCard(card, cardChildrenContainerElement)
    {
        let cardChildrenContainer = this.card.querySelector(".card");
        if(cardChildrenContainerElement) cardChildrenContainer = cardChildrenContainerElement;

        cardChildrenContainer.innerHTML += `
            <img src="${card.thumbnailUrl}" class="card-img-top" alt="${card.title}">
            <div class="card-body">
                <h5 class="card-title">${card.title}</h5>
            </div>
        `;
    }

    addCards(cards, cardChildrenContainerElement)
    {
        if(cards.length) cards.forEach(card => this.addCard(card, cardChildrenContainerElement));
        else this.addCard(cards, cardChildrenContainerElement);
    }

    render(cardParentElement)
    {
        cardParentElement.append(this.card);
    }
}


const requestUrl = "https://jsonplaceholder.typicode.com/photos";
const cardsContainer = document.getElementById("cards-container");
const imageApiCallButton = document.getElementById("image-api-call");


let imageId = 1;
async function apiGetImage()
{
    const res = (await (await fetch(`${requestUrl}/${imageId}`)).json());
    const card = new Card(cardTemplate);

    card.addCards(res);
    card.render(cardsContainer);

    ++imageId;
}

imageApiCallButton.addEventListener("click", apiGetImage);