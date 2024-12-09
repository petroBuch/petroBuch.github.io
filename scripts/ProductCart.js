if (localStorage.getItem("price") == null) {
    localStorage.setItem("price", total_price.toString());
}


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

const plus_button = document.getElementsByClassName("plus_button");
const minus_button = document.getElementsByClassName("minus_button");
const clear_cart = document.getElementsByClassName("clear_cart");
const clear_button = document.getElementsByClassName("clear_button");

for (let i = 0; i < plus_button.length; i++) {
    plus_button[i].onclick = () => {
        let product = new Product(plus_button[i].parentNode.parentNode.parentNode);
        const savedCart = JSON.parse(localStorage.getItem("cart"));
        cart.products = savedCart.products;
        cart.addToCart(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateTotalPrice();
        plus_button[i].parentNode.children[1].innerText = (parseInt(plus_button[i].parentNode.children[1].innerText) + 1).toString();
        plus_button[i].parentNode.parentNode.children[1].innerText = (parseInt(plus_button[i].parentNode.parentNode.children[1].innerText) + product.price).toString();
    };
}


