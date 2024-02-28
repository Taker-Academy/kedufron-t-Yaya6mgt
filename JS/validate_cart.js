if (!localStorage.getItem("panier")) {
    let panier = [];
    localStorage.setItem("panier", JSON.stringify(panier));
}

let panier = JSON.parse(localStorage.getItem("panier"));

