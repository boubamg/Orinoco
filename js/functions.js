// * Function * See Article Nb in Basket
const getBasketNb = () => {
    NbItem = localStorage.getItem("basket") ? JSON.parse(localStorage.basket) : 0;
    return NbItem.length;
}

// * Function * Display Article Nb in Basket
const displayBasketNb = (basket) => {
    basket.textContent = getBasketNb();
}

// Get total order price 
const getTotalPrice = () => {
    let price = 0;
    for(let i = 0; i < basketParsed.length; i++){
        price += basketParsed[i].price;
    }
    return price;
}
