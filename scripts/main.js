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

        scroller[i].addEventListener("wheel", function (e) {
            scroller[i].style.scrollBehavior = "smooth";
            if (e.deltaY > 0) {
                scroller[i].scrollLeft += 40*e.deltaY;
                e.preventDefault();
            } else {
                scroller[i].scrollLeft -= 40*e.deltaY;
                e.preventDefault();
            }

        })
    }
}

createItems();





const cart_button = document.getElementById('user_cart_button');
const katalog_button = document.getElementById('katalog_button');
const main_page_start = document.getElementById('main_page_start');
const add_to_cart_button = document.getElementsByClassName('add_to_cart_button');


class Product {
    name;
    image_source;
    price;
    volume;
    amount = 1;
    constructor(info) {
        this.name = info.querySelector(".name").innerText.split(",")[0];
        this.image_source = info.querySelector(".image_source").src;
        this.price = parseInt(info.querySelector(".price").innerText.split("Руб")[0]);
        this.volume = info.querySelector(".name").innerText.split(",")[1];
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
            if (product.name === this.products[i].name && product.price === this.products[i].price) {
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


