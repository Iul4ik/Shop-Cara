// un product
let products = document.querySelectorAll(".product__item");
// nr de produse in cart
let productsPop = document.querySelector(".header__cart p");
let productsPop2 = document.querySelector(".header__cart-2 p");
// nr de produse in cart in span
let productsCounter = document.querySelector(".header__cart  span");
let productsCounter2 = document.querySelector(".header__cart-2  span");

// un array unde o sa fie descrierea produsului
let productsArr = [];
// buton de trecere la cart.html
let checkout = document.querySelector(".checkout");


products.forEach((elm, index) => {  
  // nr de produs
  let count = 1;
  // denumirea produsului
  let productName = elm.querySelector(".product__item-name");
  // denumirea produdului dupa data-name
  let productNameData = productName.getAttribute("data-name");
  // costul produsului
  let productPrice = elm.querySelector(".product__item-price");
  // pretul produsului dupa data-price 
  let productPriceData = productPrice.getAttribute("data-price");
  
  // cantitatea produsului
  let productQuantity = elm.querySelector(".product__item-quantity p");
  
  // marirea cantitatii produsului
  let addOne = elm.querySelector(".add");
  // micsorarea cantitatii produsului
  let removeOne = elm.querySelector(".remove");
  // buton de adaugare a produsului in cos
  let buyBtn = elm.querySelector(".addtocart");
  // let productQuantityData = productQuantity.innerText
  
  // functie de marire a cantitatii produsului
  addOne.addEventListener("click", function () {
    productQuantity.innerText = count += 1;
  });
  
  // functie de micsorare a cantitatii produsului
  removeOne.addEventListener("click", function () {
    if (count <= 1) {
      return;
    }
    productQuantity.innerText = count -= 1;
  });

  // functie de adaugare a produsului in cos
  buyBtn.addEventListener("click", function () {
    // un array unde o sa fie descrierea produsului
    productsArr.push({
      // id fiecarui produs adaugat +1
      id: index + 1,
      // denumirea produsului dupa data-name
      name: productNameData,
      // pretul produsului dupa data-price 
      price: productPriceData,
      // cantitatea produsului
      quantity: productQuantity.innerText,
      // sumarea costului produsului cu cantitatea
      total: Number(productPriceData) * Number(productQuantity.innerText),
    });
    // nr de produs
    count = 1;
    // adaugarea produsului in cart
    productsCounter.innerText = productsArr.length;
    console.log(productsArr);
  });
});

// nr de produse
let cartItems = document.querySelector("#products");
// adaugarea in pop up cart a produselor
let cartPopup = document.querySelector(".products");
// nr de produse in cart
if (productsPop) {
  productsPop.addEventListener("click", function () {
    cartPopup.classList.toggle("visible");
    // functie de adaugare a produselor in Popup
    // addItemsToPopup();
  });
}

productsArr.forEach((elm) => {
  let li = document.createElement("li");
  let div = document.createElement("div");
  div.setAttribute("class", "popup__list-item");
  let productListName = document.createElement("span");
  let productListQuantity = document.createElement("span");
  let productItemsTotal = document.createElement("span");

  productListName.innerText = elm.name;
  productListQuantity.innerText = elm.quantity + "x" + elm.price;
  productItemsTotal.innerText = elm.quantity * elm.price + "$";
  div.append(productListName);
  div.append(productListQuantity);
  div.append(productItemsTotal);
  li.appendChild(div);
  cartItems.appendChild(li);
});

if (checkout) {
  checkout.addEventListener("click", function () {
    localStorage.setItem("products", JSON.stringify(productsArr));

    window.location.href = "cart.html";
  });
}

//cart
function checkOut() {
  let productsFromStorage;
  productsFromStorage = localStorage.getItem("products");
  let productsItems = JSON.parse(productsFromStorage);
  productsCounter.innerText = productsItems.length;
  let cart = document.querySelector(".cart-in-cart ul");
  productsItems.forEach((elm) => {
    let li = document.createElement("li");
    li.className = 'li-in-cart'
    let p = document.createElement("p");
    p.className = 'p-cart'
    p.innerHTML = `<span>${elm.name}</span>
                  <span class="elm-quantity">${elm.quantity}</span>
                  <span class="elm-quantity">${elm.price}</span>
                  <span>${elm.total}</span>`;
    li.append(p);
    cart.append(li);
  });

  const sumall = productsItems
    .map((item) => item.total)
    .reduce((prev, curr) => prev + curr);
  let cartTotal = document.querySelector(".total");
  let cartTotalTwo = document.querySelector('.total2');

  cartTotalTwo.innerHTML = sumall + '$'; 
  cartTotal.innerText = sumall + "$";
}

let payBtn = document.querySelector(".pay");

if (payBtn) {
  payBtn.addEventListener("click", function () {
    window.location.href = "index.html";
    localStorage.removeItem("products");

  });
}
if (window.location.href === "http://localhost:3006/cart.html" || "http://localhost:3008/cart.html") {
  
  checkOut();
}
