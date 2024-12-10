let id = parseInt(localStorage.getItem("product_id"));
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