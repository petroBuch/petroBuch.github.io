let scroller = document.getElementsByClassName("scroller_new");
let product_list = [
    {
        id: 1,
        name: "Крем-мед Медолюбов с черной смородиной",
        price: 900,
        image_source: "images/product0.png"
    },
    {
        id: 2,
        name: "Крем-мед Медолюбов с киви",
        price: 700,
        image_source: "images/product1.png"
    },
    {
        id: 3,
        name: "Крем-мед Медолюбов с малиной",
        price: 1000,
        image_source: "images/product2.png"
    },
    {
        id: 4,
        name: "Крем-мед Медолюбов с облепихой",
        price: 1200,
        image_source: "images/product3.png"
    }
]

function createItems() {
    for (let i = 0; i < scroller.length; i++) {
        for (let j = 0; j < 10; j++) {
            const item = document.createElement("div");
            item.className = "scroll_item";
            item.dataset.id = product_list[j%4].id;
            item.dataset.name = product_list[j%4].name;
            item.dataset.image_source = product_list[j%4].image_source;
            item.dataset.price = product_list[j%4].price;
            item.innerHTML = `
                <img class="image_source" src=${product_list[j%4].image_source} alt="product" style="width: 220px; height: 220px">
                <p class="price">${product_list[j%4].price} Руб <span>1 шт</span></p>
                <p class="name">${product_list[j%4].name},<br> 100 мл</p>
                <button class="add_to_cart_button" >В корзину</button>
            `
            scroller[i].appendChild(item);
        }

        scroller[i].addEventListener("wheel" || "mousedown", function (e) {
            scroller[i].style.scrollBehavior = "smooth";
            scroller[i].scrollLeft += 20*e.deltaY;
            e.preventDefault();
        })
    }
}

createItems();





const cart_button = document.getElementById('user_cart_button');
const katalog_button = document.getElementById('katalog_button');
const main_page_start = document.getElementById('main_page_start');
const add_to_cart_button = document.getElementsByClassName('add_to_cart_button');


class Product {
    id;
    name;
    image_source;
    price;
    volume;
    amount = 1;
    constructor(info) {
        this.name = info.dataset.name;
        this.image_source = info.dataset.image_source;
        this.price = parseInt(info.dataset.price);
        this.volume = info.dataset.name.split(",")[1];
    }
}

class ProductCart {
    products;
    constructor() {
        this.products = [];
    }

    addToCart(product) {
        if (this.products.length === 0){
            this.products.push(product);
            return;
        }
        for (let i = 0; i < this.products.length; i++) {
            if (product.id === this.products[i].id) {
                this.products[i].amount++;
                return;
            }
        }
        this.products.push(product);
    }

    removeFromCart(product) {
        for (let i = 0; i < this.products.length; i++) {
            if (product === this.products[i]) {
                if (this.products[i].amount > 1) {
                    this.products[i].amount--;
                    return;
                }

                this.products.splice(i, 1);
            }
        }
    }

    deleteCart(){
        this.products.splice(0, this.products.length);
    }
}

const cart = new ProductCart();

if (localStorage.getItem('cart') == null) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

//localStorage.setItem("cart", JSON.stringify(cart));

for (let i = 0; i < add_to_cart_button.length; i++) {
    add_to_cart_button[i].onclick = () => {
        let product = new Product(add_to_cart_button[i].parentNode);
        const savedCart = JSON.parse(localStorage.getItem("cart"));
        cart.products = savedCart.products;
        cart.addToCart(product);
        localStorage.setItem("cart", JSON.stringify(cart));
    };
}


function goToProductPage(){window.location = "Product.html";}
function goToMainPage(){ window.location = "index.html"; }
function goToCartPage() { window.location = "ProductCart.html"; }

cart_button.onclick = goToCartPage;
katalog_button.onclick = goToMainPage;
main_page_start.onclick = goToMainPage;


