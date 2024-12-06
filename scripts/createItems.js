let scroller = document.getElementsByClassName("scroller_new");
let prices = [900, 700, 1000, 1200, 800];
function createItems() {
    for (let i = 0; i < scroller.length; i++) {
        for (let j = 0; j < 10; j++) {
            const item = document.createElement("div");
            item.className = "scroll_item";
            item.innerHTML = `
                <img src="images/product.png" alt="product" width="220px" heigth="220px">
                <p class="price">${prices[j%5]} Руб <span>1 шт</span></p>
                <p>Крем-мед Медолюбов с черной смородиной,<br> 100 мл</p>
                <button class="add_to_cart_button" >В корзину</button>
            `
            scroller[i].appendChild(item);
        }
    }
}

createItems();