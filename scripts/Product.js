let id = parseInt(localStorage.getItem("product_id"));
window.dataset.id = id.toString();
window.dataset.name = product_list[id-1].name;
window.dataset.price = product_list[id-1].price;
window.dataset.image_source = product_list[id-1].image_source;
document.querySelector("#product_name").innerText = product_list[id-1].name;
document.querySelector("#price").innerText = product_list[id-1].price + " Руб";
document.querySelector("#main_image").src = product_list[id-1].image_source;
let list_image = document.getElementById("list_of_images");
for (let i=0; i < 7; i++) {
    let image = document.createElement("img");
    image.src = product_list[id - 1].image_source;
    image.className = "mini_image";
    list_image.appendChild(image);
}

list_image.addEventListener("wheel" || "mousedown", function (e) {
    list_image.style.scrollBehavior = "smooth";
    list_image.scrollLeft += 20*e.deltaY;
    e.preventDefault();
})

let add_to_cart_button = document.getElementById("add_to_cart_button");
add_to_cart_button.onclick = () => {
    let product = new Product(window);
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    cart.products = savedCart.products;
    cart.addToCart(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location = "ProductCart.html";
};