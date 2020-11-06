// Connexion to API
fetch("https://mvp-ecommerce.herokuapp.com/api/teddies")
    .then(response => response.json())
    .then(teddies => {
        displayTeddies(teddies);
        displayBasketNb(document.querySelector(".fa-shopping-bag"));
    }).catch(err => console.log(err))

// * Function * Display Teddies
const displayTeddies = (teddies) => {
    let container = document.querySelector(".container");
       let ulElement = document.createElement("ul");
       container.appendChild(ulElement);

       // Loop for each Teddie Object
       for(let i = 0; i < teddies.length; i++ ) {
           
           // Creation of Tag
           let liElement = document.createElement("li");
           let a1Element = document.createElement("a");
           let a2Element = document.createElement("a");
           let buttonAdd = document.createElement("button");
               buttonAdd.textContent = "Ajouter au panier";
               buttonAdd.classList.add("btn");

               buttonAdd.addEventListener("click", function() {
                   // function for add specific teddie in basket
                   addToBasketDefault(teddies[i]);
               });

           let imgElement = document.createElement("img");
           let divElement = document.createElement("div");
           let h3Element = document.createElement("h3");
           let price = document.createElement("span");
               price.classList.add("price");

           // Display informations for each Teddies
           liElement.setAttribute("id", teddies[i]._id);
           imgElement.setAttribute("src", teddies[i].imageUrl);
           h3Element.textContent = teddies[i].name;
           price.textContent = teddies[i].price/100 + " €";

           // Add links
           a1Element.setAttribute("href", "./pages/produit.html?id=" + teddies[i]._id);
           a1Element.appendChild(imgElement);
           
           a2Element.setAttribute("href", "./pages/produit.html?id=" + teddies[i]._id);
           a2Element.appendChild(h3Element);

           // Built structure
           divElement.appendChild(a2Element);
           divElement.appendChild(price);
           divElement.appendChild(buttonAdd);
           liElement.appendChild(a1Element);
           liElement.appendChild(divElement);
           ulElement.appendChild(liElement);
       }
}

const addToBasketDefault = (teddie) => {

    // Array of Teddies for basket
    let teddieArray = localStorage.getItem("basket") ? JSON.parse(localStorage.getItem("basket")) : [];

    // Teddie object
    let teddieObj = {
        id : teddie._id,
        image : teddie.imageUrl,
        name : teddie.name,
        price : teddie.price/100,
        // Default color (first color of array)
        color : teddie.colors[0],
    }
    
    // Add Teddie object in Array
    teddieArray.push(teddieObj);

    // Save teddie array in localstorage basket
    localStorage.setItem("basket", JSON.stringify(teddieArray));

    displayBasketNb(document.querySelector(".fa-shopping-bag"));
}
