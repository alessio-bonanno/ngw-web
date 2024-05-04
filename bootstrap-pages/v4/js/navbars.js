const horizontalNavbarTemplate = `
<nav class="navbar navbar-expand-lg" id="horizontal-navbar">
    <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#vertical-navbar-collapse" aria-controls="vertical-navbar-collapse"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#">
            <img src="logo.svg" alt="UN'ICONA">
        </a>
        <div class="navbar-nav flex-row gap-3">
        </div>
    </div>
</nav>
`;
const verticalNavbarTemplate = `
<nav class="navbar navbar-expand-lg" id="vertical-navbar">
    <div class="container-fluid px-0">
        <div class="collapse navbar-collapse" id="vertical-navbar-collapse">
            <div class="navbar-nav flex-column text-center w-100">
            </div>
        </div>
    </div>
</nav>
`;



class Navbar
{
    entriesClassName;
    navbar;

    constructor(navbarTemplate, navbarType)
    {
        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = navbarTemplate;

        this.navbar = tempDiv.children[0];

        if(navbarType == "horizontal") this.entriesClassName = "nav-link mx-2 d-flex flex-column mx-auto align-items-center";
        else if(navbarType == "vertical") this.entriesClassName = "nav-link";
    }

    addEntries(entries, entriesContainerElement)
    {
        let entriesContainer = this.navbar.querySelector(".navbar-nav");
        if(entriesContainerElement) entriesContainer = entriesContainerElement;

        entries.forEach(entry =>
        {
            let entryElement = document.createElement("a");
            let entryInnerHTML = "";

            if(entry.iconName) entryInnerHTML += `<i class="b ${entry.iconName} h2"></i>`;
            if(entry.onclick) entryElement.setAttribute("onclick", entry.onclick);
            if(entry.href) entryElement.setAttribute("href", entry.href);
            entryInnerHTML += `<span>${entry.title}</span>`;
            entryElement.innerHTML = entryInnerHTML;
            entryElement.setAttribute("class", this.entriesClassName);

            entriesContainer.append(entryElement);
        });
    }

    render(navbarParentElement)
    {
        navbarParentElement.append(this.navbar);
    }
}


const navbarsHeader = document.createElement("header");
navbarsHeader.id = "navbars-element";
document.body.prepend(navbarsHeader);

const horizontalNavbarEntries = [
    { title: "Search", iconName: "bi-search", onclick: "searchPress()", href: "#" },
    { title: "Wishlist", iconName: "bi-suit-heart", onclick: "wishlistPress()", href: "#" },
    { title: "Login", iconName: "bi-person-fill", onclick: "loginPress()", href: "#" }
];
const verticalNavbarEntries = [
    { title: "Home", href: "./index.html" },
    { title: "Shopping List", href: "./shopping-list.html" },
    { title: "Cards", href: "./cards.html" },
    { title: "404", href: "#" }
];

const horizontalNavbar = new Navbar(horizontalNavbarTemplate, "horizontal");
const verticalNavbar = new Navbar(verticalNavbarTemplate, "vertical");

horizontalNavbar.addEntries(horizontalNavbarEntries);
verticalNavbar.addEntries(verticalNavbarEntries);

horizontalNavbar.render(navbarsHeader);
verticalNavbar.render(navbarsHeader);