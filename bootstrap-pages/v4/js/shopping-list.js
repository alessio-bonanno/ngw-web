const shoppingList = document.getElementById("shoppingList");
const inputElement = document.getElementById("inputElement");



shoppingList.addEventListener("click", e =>
{
    if(e.target.classList.contains("trash"))
        e.target.parentElement.remove();
});

function addElement(elementValue)
{
    const element = document.createElement("li");
    element.className = "list-group-item d-flex justify-content-between";
    element.innerHTML = `<span>${elementValue}</span><i class="bi bi-trash-fill trash"></i>`;
    shoppingList.append(element);
}

inputElement.addEventListener("keyup", e =>
{
    if(e.key != "Enter" || !e.target.value.trim()) return;

    addElement(e.target.value);
    e.target.value = "";
});