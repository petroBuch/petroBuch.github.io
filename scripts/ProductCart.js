let total_price = 0;
let total_amount = 0;

if (localStorage.getItem("price") == null) {
    localStorage.setItem("price", total_price.toString());
}


function updateTotalPrice() {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    cart.products = savedCart.products;
    for (let i = 0; i < cart.products.length; i++) {
        total_price += cart.products[i].price*cart.products[i].amount;
        total_amount += cart.products[i].amount;
    }
    document.querySelector("#price").innerText = total_price.toString() + " Руб";
    document.querySelector("#total_items").innerText = total_amount.toString();
    localStorage.setItem("price", total_price.toString());
}

updateTotalPrice();


const product_list = document.querySelector(".products");
const savedCart = JSON.parse(localStorage.getItem("cart"));
cart.products = savedCart.products;
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

