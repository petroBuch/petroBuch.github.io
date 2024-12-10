function updateTotalPrice() {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    cart.products = savedCart.products;
    let total_price = 0;
    let total_amount = 0;
    for (let i = 0; i < cart.products.length; i++) {
        total_price += cart.products[i].price*cart.products[i].amount;
        total_amount += cart.products[i].amount;
    }
    document.querySelector("#price").innerText = total_price.toString() + " Руб";
    document.querySelector("#total_items").innerText = total_amount.toString();
    localStorage.setItem("price", total_price.toString());
}

updateTotalPrice();

function updateCartProducts(){
    const product_list = document.querySelector(".products");
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    cart.products = savedCart.products;
    if (cart.products.length > 0) {
        for (let i = 0; i < cart.products.length; i++) {
            let item = document.createElement("div");
            item.className = "product_item";
            item.dataset.id = cart.products[i].id;
            item.dataset.name = cart.products[i].name;
            item.dataset.image_source = cart.products[i].image_source;
            item.dataset.price = cart.products[i].price;
            item.innerHTML = `
        <img class="image_source" src=${cart.products[i].image_source} alt="product" width="220px" heigth="220px">
        <p class="name">${cart.products[i].name},<br> ${cart.products[i].volume}</p>
        <div class="item_amount">
            <div class="controller">
                <button class="plus_button">+</button>
                <div class="amount">${cart.products[i].amount}</div>
                <button class="minus_button">-</button>
                <button class="clear_button">х</button>
            </div>
            <div class="price">${cart.products[i].price*cart.products[i].amount} Руб</div>
        </div>
    `
            product_list.appendChild(item);
        }
    } else {
        let item = document.createElement("div");
        item.className = "empty_cart";
        item.innerHTML = `
            <img class="empty_cart_image" src="/images/empty_cart.png" alt="empty_cart">
            <div class="item_amount">
                <h1>Ваша корзина пуста, Милорд!</h1>
                <p>Попробуйте найти то, что Вам понравится в <a href="/index.html" style="color: #F4A261">каталоге</a> продуктов</p>
            </div>
        `
        product_list.appendChild(item);
    }
}

updateCartProducts();


let plus_button = document.getElementsByClassName("plus_button");
let minus_button = document.getElementsByClassName("minus_button");
let clear_cart = document.getElementById("clear_cart");
let clear_button = document.getElementsByClassName("clear_button");

function updateElements(){
    plus_button = document.getElementsByClassName("plus_button");
    minus_button = document.getElementsByClassName("minus_button");
    clear_cart = document.getElementById("clear_cart");
    clear_button = document.getElementsByClassName("clear_button");
}


for (let i = 0; i < plus_button.length; i++) {
    plus_button[i].onclick = () => {
        let product = new Product(plus_button[i].parentNode.parentNode.parentNode);
        const savedCart = JSON.parse(localStorage.getItem("cart"));
        cart.products = savedCart.products;
        cart.addToCart(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateTotalPrice();
        plus_button[i].parentNode.children[1].innerText = (parseInt(plus_button[i].parentNode.children[1].innerText) + 1).toString();
        plus_button[i].parentNode.parentNode.children[1].innerText = (parseInt(plus_button[i].parentNode.parentNode.children[1].innerText) + product.price).toString() + " Руб";
        updateElements();
    };
}

for (let i = 0; i < minus_button.length; i++) {
        minus_button[i].onclick = () => {
        let product = new Product(minus_button[i].parentNode.parentNode.parentNode);
        const savedCart = JSON.parse(localStorage.getItem("cart"));
        cart.products = savedCart.products;
        for (let i = 0; i < cart.products.length; i++) {
            if (product.id === cart.products[i].id) {
                product.amount = cart.products[i].amount;
            }
        }
        cart.removeFromCart(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateTotalPrice();
        if (product.amount === 1)
        {
            let div = document.getElementById("products");
            div.removeChild(minus_button[i].parentNode.parentNode.parentNode);
        }
        else{
            minus_button[i].parentNode.children[1].innerText = (parseInt(minus_button[i].parentNode.children[1].innerText) - 1).toString();
            minus_button[i].parentNode.parentNode.children[1].innerText = (parseInt(minus_button[i].parentNode.parentNode.children[1].innerText) - product.price).toString() + " Руб";
        }
        updateElements()
    };
}

for (let i = 0; i < clear_button.length; i++) {
    clear_button[i].onclick = () => {
        console.log(minus_button);
        let product = new Product(minus_button[i].parentNode.parentNode.parentNode);
        const savedCart = JSON.parse(localStorage.getItem("cart"));
        cart.products = savedCart.products;
        cart.removeAllItem(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateTotalPrice();
        let div = document.getElementById("products");
        div.removeChild(minus_button[i].parentNode.parentNode.parentNode);
        console.log(minus_button);
        updateCartProducts();
        updateElements();
        console.log(minus_button);
    };
}

clear_cart.onclick = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    cart.products = savedCart.products;
    cart.products = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    let div = document.getElementById("products");
    let size = div.children.length;
    for (let i = size-1; i >= 0; i--) {
        div.removeChild(div.children[i]);
    }
    updateTotalPrice();
    updateCartProducts();
    updateElements();
}
