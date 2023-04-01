let menuCheckbox = document.getElementById("nav-menu1");
let menu = document.getElementById("side-menu");

function displayMenu() {
    if (this.checked) {
        menu.classList.add("full-width");
    } else {
        menu.classList.remove("full-width");
    }
}

menuCheckbox.addEventListener("change", displayMenu);