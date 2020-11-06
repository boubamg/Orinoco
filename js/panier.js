// Articles in Basket
const basketParsed = localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : "";

// Main Function 
const basketManagement = () => {
    if (basketParsed != 0){
        displayBasketNb(document.querySelector(".fa-shopping-bag"));
        getBasket();
        orderTeddie();
    } else {
        emptyBasket();
    }
}

// Get all articles in Basket
const getBasket = () => {

    let container = document.querySelector(".container");

    // Creation of elements
    let h1Element = document.createElement("h1");
        h1Element.textContent = "Orinoco - Panier";
    let ulElement = document.createElement("ul");
        ulElement.classList.add("basketList");
    let totalPrice = document.createElement("p");
        totalPrice.classList.add("totalPrice", "text-right");
        totalPrice.textContent = "Montant Total : " + getTotalPrice() + "€";

    // clear basket button
    let deleteAll = document.createElement("a");
        deleteAll.textContent = "Vider le panier";
        deleteAll.classList.add("btn", "btn-danger", "deleteAllButton");
        
        deleteAll.href = "javascript:window.location.reload()";

        deleteAll.addEventListener("click", function(){
            localStorage.clear();
            getBasketNb();
        });        
    
    container.appendChild(h1Element);
    container.appendChild(deleteAll)
    container.appendChild(ulElement);
    container.appendChild(totalPrice);

    for(let i = 0; i < basketParsed.length; i++){

        let selectTeddie = basketParsed[i];

        // Create Element
        let liElement = document.createElement("li");

        let divImgBasket = document.createElement("div");
            divImgBasket.classList.add("imgBasket");
        let divInfoBasket = document.createElement("div");
            divInfoBasket.classList.add("infoBasket");
        let divPriceBasket = document.createElement("div");
            divPriceBasket.classList.add("priceBasket");

        let imgTeddie = document.createElement("img");
            imgTeddie.classList.add("img-fluid");
        let infoTeddie = document.createElement("h3");
        let priceTeddie = document.createElement("span");
            priceTeddie.classList.add("price");
        let deleteButton = document.createElement("a");
            deleteButton.href = "javascript:window.location.reload()";

        deleteButton.addEventListener("click", function(){

            // Array of Teddies for basket
            let teddieArray = localStorage.getItem("basket") ? JSON.parse(localStorage.getItem("basket")) : [];
            
            // Delete Teddie object in Array
            teddieArray.splice( selectTeddie, 1 );

            // Save teddie array in localstorage basket
            localStorage.setItem("basket", JSON.stringify(teddieArray));

            getBasketNb()
        });
        
        // Element Content
        imgTeddie.src = selectTeddie.image;
        infoTeddie.textContent = selectTeddie.name + " - " + selectTeddie.color;
        priceTeddie.textContent = selectTeddie.price + '€';
        deleteButton.textContent = "Supprimer";

        // Structure
        divImgBasket.appendChild(imgTeddie);
        divInfoBasket.appendChild(infoTeddie);
        divInfoBasket.appendChild(deleteButton);
        divPriceBasket.appendChild(priceTeddie);

        liElement.appendChild(divImgBasket);
        liElement.appendChild(divInfoBasket);
        liElement.appendChild(divPriceBasket);

        ulElement.appendChild(liElement);
    }
    
}

// Order teddies
const orderTeddie = () => {

    const inputFirstname = document.querySelector("#firstname");
    const inputLastname = document.querySelector("#lastname");
    const inputEmail = document.querySelector("#email");
    const inputAddress = document.querySelector("#address");
    const inputCity = document.querySelector("#city");
    const orderingForm = document.querySelector("form");

    orderingForm.addEventListener("submit", function(event){
        event.preventDefault();

        if (isValidText(inputFirstname.value) && isValidText(inputLastname.value) && isValidText(inputCity.value) && 
            isValidEmail(inputEmail.value) && isValidAddress(inputAddress.value)){
                const contact = {
                    firstName: inputFirstname.value,
                    lastName: inputLastname.value,
                    address: inputAddress.value,
                    city: inputCity.value,
                    email: inputEmail.value,
                }
                const products = [];
                for(i = 0; i < basketParsed.length; i++){
                    products.push(basketParsed[i].id);
                }  
        
                let orderingInformation = {contact, products}
        
                StringOrderingInformation = JSON.stringify(orderingInformation)

                fetch("https://mvp-ecommerce.herokuapp.com/api/teddies/order",{
                    method: 'POST',
                    body: StringOrderingInformation,
                    headers: {'Content-Type': 'application/json'}
                })
                .then(response => response.json())
                .then(order =>  {
                    localStorage.setItem("order", JSON.stringify(order));
                    window.location.href = "confirmation.html";
                })
                .catch(err => console.log(err))

            } else {
                alert("error")
            }
    })
    
} 
// If basket is empty : 

const emptyBasket = () => {

    let container = document.querySelector(".container");

    let h1Element = document.createElement("h1");
    let emptyBasketText = document.createElement("p");
        emptyBasketText.classList.add("text-center");
    let homeButton = document.createElement("a");

    h1Element.textContent = "Orinoco - Panier";
    emptyBasketText.textContent = "Votre panier est vide, cliquez ci-dessous pour voir nos articles.";
    homeButton.textContent = "Tous les articles";
    homeButton.classList.add("btn");
    homeButton.href = "../index.html";

    container.appendChild(h1Element);
    container.appendChild(emptyBasketText);
    container.appendChild(homeButton);

    disableForm();
}

const disableForm = () => {
    
    let allInput = document.querySelectorAll("input");
    allInput.forEach(function(input){
        input.setAttribute("disabled","");
    });
    const orderingButton = document.querySelector("#orderingButton");
    orderingButton.setAttribute("disabled","");
}

// Verification function

function isValidText(value) {
    const regex = /[A-Za-z]{2,}/
    return regex.test(value);
}

function isValidEmail(value) {
    const regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/
    return regex.test(value);
}

function isValidAddress(value) {
    const regex = /[A-Za-z0-9 ]+/
    return regex.test(value);
}

basketManagement();