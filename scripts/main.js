let scroller = document.getElementsByClassName("scroller_new");
let prices = [900, 700, 1000, 1200, 800];
function createItems() {
    for (let i = 0; i < scroller.length; i++) {
        for (let j = 0; j < 10; j++) {
            const item = document.createElement("div");
            item.className = "scroll_item";
            item.innerHTML = `
                <img class="image_source" src="images/product.png" alt="product" width="220px" heigth="220px">
                <p class="price">${prices[j%5]} Руб <span>1 шт</span></p>
                <p class="name">Крем-мед Медолюбов с черной смородиной,<br> 100 мл</p>
                <button class="add_to_cart_button" >В корзину</button>
            `
            scroller[i].appendChild(item);
        }
    }
}

createItems();



const cart_button = document.getElementById('user_cart_button');
const katalog_button = document.getElementById('katalog_button');
const main_page_start = document.getElementById('main_page_start');
const add_to_cart_button = document.getElementsByClassName('add_to_cart_button');


let product_cart = [];
if (localStorage.getItem('cart') != null) {
    localStorage.setItem("cart", product_cart.toString());
}


class Product {
    name;
    image_source;
    price;
    volume;
    constructor(info) {
        this.name = info.querySelector(".name").innerText.split(",")[0];
        this.image_source = info.querySelector(".image_source").src;
        this.price = info.querySelector(".price").innerText.split("Руб")[0];
        this.volume = info.querySelector(".name").innerText.split(",")[1];
    }
}

function addToCart() {
    let product = new Product(this.parentNode);
    product_cart.push(product);
    console.log(localStorage.getItem("cart").toString());
}

for (let i = 0; i < add_to_cart_button.length; i++) {
    add_to_cart_button[i].onclick = addToCart;
}



function goToProductPage(){window.location = "Product.html";}
function goToMainPage(){ window.location = "index.html"}

cart_button.onclick = goToProductPage;
katalog_button.onclick = goToMainPage;
main_page_start.onclick = goToMainPage;


