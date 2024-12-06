
const cart_button = document.getElementById('user_cart_button');
const katalog_button = document.getElementById('katalog_button');
const main_page_start = document.getElementById('main_page_start');
const add_to_cart_button = document.getElementsByClassName('add_to_cart_button');





function goToProductPage(){window.location = "Product.html"}
function goToMainPage(){ window.location = "index.html"}

cart_button.onclick = goToProductPage;
katalog_button.onclick = goToMainPage;
main_page_start.onclick = goToMainPage;


