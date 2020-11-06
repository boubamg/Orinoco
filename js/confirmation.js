// Variable
const ordered = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : "";
const basketParsed = localStorage.getItem("basket") ? JSON.parse(localStorage.getItem("basket")) : "";

const displayCommand = () => {

    if (localStorage.getItem("order") && localStorage.getItem("basket")){
        validMessage()
        localStorage.clear();
    } else {
        errorMesage()
    }
    backtoHome()
}

const validMessage = () => {
    
    // Create Element * SECTION VALIDATE *
    let thanksDiv = document.createElement("div");
        thanksDiv.classList.add("thankyou");

    let thanksP = document.createElement("p");
        thanksP.innerHTML = "Merci " + ordered.contact.firstName + " :) <br/> À bientot !" 

    thanksDiv.appendChild(thanksP);

    // Create Element * SECTION SUMMARY *
    let orderId = document.createElement("p");
        orderId.innerHTML = "<span class='bold'>Numéro de commande :</span> <br/>" + ordered.orderId;

    let totalPrice = document.createElement("p");
        totalPrice.innerHTML = "<span class='bold'>Prix Total :</span> <br/>" + getTotalPrice() + " €";

    let orderIdDiv = document.createElement("div");
        orderIdDiv.classList.add("orderId");

    let totalPriceDiv = document.createElement("div");
        totalPriceDiv.classList.add("totalPriceConfirmation");

    orderIdDiv.appendChild(orderId);
    totalPriceDiv.appendChild(totalPrice);

    // Html Element
    let validateSection = document.querySelector(".validate");
    let summarySection = document.querySelector(".summary");

    // Construction Structure
    validateSection.appendChild(thanksDiv);

    summarySection.appendChild(orderIdDiv);
    summarySection.appendChild(totalPriceDiv);
}

const errorMesage = () => {
    let svgElement = document.querySelector("svg");
    svgElement.classList.add("d-none");
    let h2Error = document.createElement("h2");
    h2Error.textContent = "Une erreur s'est produite";
    h2Error.classList.add("error");

    let SummarySection = document.querySelector(".summary");
    SummarySection.appendChild(h2Error);
}

const backtoHome = () => {
    let backHomeLink = document.createElement("a");
        backHomeLink.href = "../index.html";
        backHomeLink.textContent = "Retour à l'accueil";
        backHomeLink.classList.add("text-center")

    let container = document.querySelector(".container");
        container.appendChild(backHomeLink);
}

displayCommand();