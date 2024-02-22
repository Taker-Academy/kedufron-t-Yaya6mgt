var url = "https://api.kedufront.juniortaker.com/";
var panier = [];
var total_price;

function ajouterAuPanier(item) {
    var produit = {
        id: item._id,
        name: item.name,
        price: item.price,
        count: 1
    };

    if (produitDejaDansPanier(item._id)) {
        var index = getIndexProduitDansPanier(item._id);
        panier[index].count++;
    } else {
        panier.push(produit);
    }
    mettreAJourPanier();
}

function supprimerDuPanier(id) {
    const fil_panier = panier.filter((prod) => prod.id !== id);

    panier = fil_panier;
    mettreAJourPanier();
}

function produitDejaDansPanier(id) {
    return panier.some(function(produit) {
        return produit.id === id;
    });
}

function getIndexProduitDansPanier(id) {
    for (var i = 0; i < panier.length; i++) {
        if (panier[i].id === id) {
            return i;
        }
    }
    return -1;
}

function mettreAJourPanier() {
    var listePanier = document.getElementById('list_panier');
    total_price = 0;

    listePanier.innerHTML = '';
    panier.forEach(function(produit) {
        const divArtPan = document.createElement('div');
        divArtPan.classList.add('divArtPan');

        const itemImg = document.createElement('img');
        var id_t = produit.id + '';
        var url_img = url + "item/picture/" + id_t;
        itemImg.src = url_img;

        const divInfo = document.createElement('div');
        divInfo.classList.add('div_info');

        const nameItem = document.createElement('p');
        nameItem.textContent = produit.name;
        nameItem.classList.add('name_item_pan');

        const priceItem = document.createElement('p');
        priceItem.textContent = produit.price.toFixed(2) + " €";
        priceItem.classList.add('price_item_pan');

        const nbrItem = document.createElement('p');
        nbrItem.textContent = "X " + produit.count.toString();
        nbrItem.classList.add('nbr_item_pan');

        const delCartButton = document.createElement('button');
        const cartIcon = document.createElement('i');
        cartIcon.classList.add('fa-regular', 'fa-trash-can');
        delCartButton.appendChild(cartIcon);
        delCartButton.classList.add('del_pan_button');

        delCartButton.addEventListener('click', function() {
            supprimerDuPanier(produit.id);
        });
        total_price += (produit.price * produit.count);

        divArtPan.appendChild(delCartButton);
        divArtPan.appendChild(nbrItem);
        divInfo.appendChild(nameItem);
        divInfo.appendChild(priceItem);
        divArtPan.appendChild(itemImg);
        divArtPan.appendChild(divInfo);
        listePanier.appendChild(divArtPan);
    });
    displayTotal();
}

function displayTotal() {
    var listePanier = document.getElementById('list_panier');

    if (!(panier.length === 0)) {
        const divTot = document.createElement('div');
        divTot.classList.add('divTot');

        const priceTot = document.createElement('p');
        priceTot.textContent = "TOTAL: " + total_price.toFixed(2) + " €";
        priceTot.classList.add('priceTot');

        const buyButton = document.createElement('button');
        buyButton.textContent = "Valider mon panier";
        buyButton.classList.add('buyButton');

        divTot.appendChild(priceTot);
        divTot.appendChild(buyButton);
        listePanier.appendChild(divTot);
    } else {
        const divTot = document.createElement('div');
        divTot.classList.add('divTot');

        const emptyPan = document.createElement('p');
        emptyPan.textContent = "Aucun produit dans le panier !";
        emptyPan.classList.add('emptyPan');

        divTot.appendChild(emptyPan);
        listePanier.appendChild(divTot);
    }
}

async function displayAllArt() {
    try {
        var url_item = url + "item/";
        const response = await axios.get(url_item);
        const items = response.data;
        const divAllArticle = document.getElementById('article_bdd');

        if (items && items.length > 0) {
            items.forEach(item => {
                const zoneItem = document.createElement('div');
                zoneItem.classList.add('zone_item');

                const itemName = document.createElement('p');
                itemName.textContent = item.name;
                itemName.classList.add('name_item');


                const itemImg = document.createElement('img');
                var id_t = item._id + '';
                var url_img = url + "item/picture/" + id_t;
                itemImg.src = url_img;

                const zonePrice = document.createElement('div');
                zonePrice.classList.add('zone_price');

                const itemPrice = document.createElement('p');
                itemPrice.textContent = item.price.toFixed(2) + " €";
                itemPrice.classList.add('price_item');

                const addToCartButton = document.createElement('button');
                const cartIcon = document.createElement('i');
                cartIcon.classList.add('fa-solid', 'fa-cart-shopping');
                addToCartButton.appendChild(cartIcon);
                addToCartButton.classList.add('add_to_cart_button');

                addToCartButton.addEventListener('click', function() {
                    ajouterAuPanier(item);
                });

                zoneItem.appendChild(itemName);
                zoneItem.appendChild(itemImg);
                zonePrice.appendChild(itemPrice);
                zonePrice.appendChild(addToCartButton);
                zoneItem.appendChild(zonePrice);
                divAllArticle.appendChild(zoneItem);
            });
        } else {
            console.log("Aucun item trouvé");
        }
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des données :", error);
        throw error;
    }
}

function togglePanier() {
    var panierContent = document.getElementById('panierContent');
    var backBlack = document.getElementById('back_black_panier');

    if (panierContent.style.display === 'none' || panierContent.style.display === '') {
        panierContent.style.display = 'block';
        backBlack.style.display = 'block';
        mettreAJourPanier();
        disableScroll();
    } else {
        panierContent.style.display = 'none';
        backBlack.style.display = 'none';
    }
}

function closePanier() {
    var panierContent = document.getElementById('panierContent');
    var backBlack = document.getElementById('back_black_panier');

    if (!(panierContent.style.display === 'none' || panierContent.style.display === '')) {
        panierContent.style.display = 'none';
        backBlack.style.display = 'none';
        enableScroll();
    }
}

function disableScroll() {
    document.body.style.overflow = 'hidden';
}

function enableScroll() {
    document.body.style.overflow = '';
}


