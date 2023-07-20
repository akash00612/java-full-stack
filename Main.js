let shop = document.getElementById('shop');

let shopItemsData = [
    {
        id: "one",
        name: "Adidas",
        price: 2399,
        desc: "Adidas Men's Wear",
        img: "Adidas.webp"
    },
    {
        id: "two",
        name: "Airmesh",
        price: 2199,
        desc: "AirMesh Men's Wear",
        img: "Airmesh.jpg"
    },
    {
        id: "three",
        name: "Alberto Torresi",
        price: 3199,
        desc: "Albetro Torresi Men's Wear",
        img: "AlbertoTorresi.webp"
    },
    {
        id: "four",
        name: "Brutan",
        price: 1999,
        desc: "Brutan Men's Wear",
        img: "Brutan.jpg"
    },
    {
        id: "five",
        name: "Calviv",
        price: 2599,
        desc: "Calviv Men's Wear",
        img: "Calviv.webp"
    },
    {
        id: "six",
        name: "Derbys",
        price: 3799,
        desc: "Derbys Men's Wear",
        img: "Derbys.jpg"
    },
    {
        id: "seven",
        name: "FredPerry",
        price: 2399,
        desc: "FredPerry Men's Wear",
        img: "FredPerry.webp"
    },
    {
        id: "eight",
        name: "Nike",
        price: 2399,
        desc: "Nike Men's Wear",
        img: "Nike.webp"
    },
    {
        id: "nine",
        name: "Sparx",
        price: 2399,
        desc: "Sparx Men's Wear",
        img: "Sparx.jpg"
    },
    {
        id: "ten",
        name: "Amawears",
        price: 2399,
        desc: "AmaWears Men's Wear",
        img: "Amawears.webp"
    },
    {
        id: "eleven",
        name: "Comfycush Old Skool",
        price: 6999,
        desc: "Comfycush Men's Wear",
        img: "Comfycush.webp"
    },
    {
        id: "twelve",
        name: "Dicy Canvas",
        price: 1999,
        desc: "Dicy Canvas Men's Wear",
        img: "Dicycanvas.jpg"
    },
    {
        id: "thirteen",
        name: "Diesel",
        price: 12599,
        desc: "Diesel Men's Wear",
        img: "Diesel.jpg"
    },
    {
        id: "fourteen",
        name: "Florsheim",
        price: 3499,
        desc: "Florsheim Men's Wear",
        img: "Florsheim.webp"
    },
    {
        id: "fifteen",
        name: "Gaze",
        price: 2399,
        desc: "Gaze Men's Wear",
        img: "Gaze.jpg"
    },
    {
        id: "sixteen",
        name: "Puma",
        price: 2699,
        desc: "Puma Men's Wear",
        img: "Puma.webp"
    },
    {
        id: "seventeen",
        name: "Reebok",
        price: 3599,
        desc: "Reebok Men's Wear",
        img: "Reebok.webp"
    },
    {
        id: "eighteen",
        name: "Versace",
        price: 102399,
        desc: "Versace Men's Wear",
        img: "Versace.webp"
    },
    {
        id: "ninteen",
        name: "Britannica",
        price: 2999,
        desc: "Britannica Men's Wear",
        img: "Britannica.webp"
    },
    {
        id: "twenty",
        name: "Jordan",
        price: 42999,
        desc: "Jordan Men's Wear",
        img: "Jordan.jpg"
    }
];

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x) => {
        let { id, name, price, desc, img } = x;
        let search = basket.find((x) => x.id === id) || [];
        return `
            <div id=product-id-${id} class="item">
                 <img height="200" width="200" src="${img}">
                 <div class="details">
                     <h3>${name}</h3>
                     <p>${desc}</p>
                     <div class="price-quantity">
                          <h2>Rs.${price}</h2>
                          <div class="buttons">
                          <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                          <div id=${id} class="quantity">
                             ${search.item === undefined ? 0 : search.item}
                          </div>
                          <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                          </div>
                     </div>
                 </div>
            </div>      `
    }).join(""));
}

generateShop();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1
        });
    }
    else {
        search.item += 1;
    }
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
}

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
    if (search === undefined) return;
    else if (search.item === 0) { return; }
    else {
        search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    localStorage.setItem("data", JSON.stringify(basket));
}

let update = (id) => {
    let search = basket.find((x) => x.id === id)

    document.getElementById(id).innerHTML = search.item;
    calculation();
}

let calculation = () => {
    let cartIcon = document.getElementById("cartamount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}

calculation();