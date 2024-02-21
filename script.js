var url = "https://api.kedufront.juniortaker.com/";

function getImageToId(id) {
    try {
        var id_t = id + '';
        var url_img = url + "item/picture/" + id_t;
        console.log(url_img);
        const response = axios.get(url_img);
        const items = response.data;

        if (items) {
                return url_img;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des données :", error);
        throw error;
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

                const itemName = document.createElement('p');
                itemName.textContent = item.name;

                const itemPrice = document.createElement('p');
                itemPrice.textContent = item.price.toString();

                const itemImg = document.createElement('img');
                var id_t = item._id + '';
                var url_img = url + "item/picture/" + id_t;
                itemImg.src = url_img;

                zoneItem.appendChild(itemName);
                zoneItem.appendChild(itemPrice);
                zoneItem.appendChild(itemImg);
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