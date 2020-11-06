// Find 'id' parameter in Url 
const urlParams = window.location.search;
const searchParams = new URLSearchParams(urlParams);
const id = searchParams.get("id");

// Connect to API
fetch("https://mvp-ecommerce.herokuapp.com/api/teddies/" + id)
    .then(response => response.json())
    .then(teddie => {
        displaySpecifictTeddie(teddie);
        displayBasketNb(document.querySelector(".fa-shopping-bag"));
    }).catch(err => console.log(err))

// Display Specific Teddie
const displaySpecifictTeddie = (teddie) => {

    // Create element 

        // Image Div
        let imgProductDiv = document.createElement("div");
            imgProductDiv.classList.add("imgProduct");

        // Info Div
        let infoProductDiv = document.createElement("div");
            infoProductDiv.classList.add("infoProduct");

        // teddie Image
        let teddieImg = document.createElement("img");
            teddieImg.setAttribute("src", teddie.imageUrl);
            teddieImg.classList.add("img-fluid");

        // teddie Name
        let teddieName = document.createElement("h1");
            teddieName.textContent = teddie.name + " - Ours en peluche";

        // teddie Description
        let teddieDescription = document.createElement("p")
            teddieDescription.textContent = teddie.description;

        // teddie Price
        let teddiePrice = document.createElement("span");
            teddiePrice.classList.add("price");
            teddiePrice.textContent = "Prix : " + teddie.price/100 + " €";

            // Dropdown list
            let labelDropdownColor = document.createElement("label");
                labelDropdownColor.setAttribute("for", "colorSelector");
                labelDropdownColor.textContent = "Choisissez une couleur : ";

            let SelectColor = document.createElement("select");
                SelectColor.setAttribute("name", "colors");
                SelectColor.setAttribute("id", "colorSelector");

            for(i = 0; i < teddie.colors.length; i++) {
                let optionList = document.createElement("option");
                    optionList.setAttribute("value", teddie.colors[i]);
                    optionList.textContent = teddie.colors[i];
                    SelectColor.appendChild(optionList);
            }
            
        // Button Add To Basket
        let buttonAdd = document.createElement("button");
            buttonAdd.textContent = "Ajouter au panier";
            buttonAdd.classList.add("btn");

            buttonAdd.addEventListener("click", function(){
                addToBasket(SelectColor, teddie);
            });

          

        let container = document.querySelector(".container2");
    
    // Create structure

        container.appendChild(imgProductDiv);
        container.appendChild(infoProductDiv);

        imgProductDiv.appendChild(teddieImg);

        infoProductDiv.appendChild(teddieName);
        infoProductDiv.appendChild(teddiePrice);
        infoProductDiv.appendChild(teddieDescription);
        infoProductDiv.appendChild(labelDropdownColor);
        infoProductDiv.appendChild(SelectColor);
        infoProductDiv.appendChild(buttonAdd);

}

// * Function * Add Teddies in Basket
const addToBasket = function(selectColor, teddie){

    // Array of Teddies for basket
        let teddieArray = localStorage.getItem("basket") ? JSON.parse(localStorage.getItem("basket")) : [];

    // Teddie object
        let teddieObj = {
            id : teddie._id,
            image : teddie.imageUrl,
            name : teddie.name,
            price : teddie.price/100,
            color : selectColor.value,
        }
            
    // Add Teddie object in Array
        teddieArray.push(teddieObj);

    // Save teddie array in localstorage basket
        localStorage.setItem("basket", JSON.stringify(teddieArray));

        displayBasketNb(document.querySelector(".fa-shopping-bag"));

}

