let produitStorage = JSON.parse(localStorage.getItem("produit"));


let visuelProduitPanier = document.querySelector("#cart__items")
for (let i = 0; i < produitStorage.length; i++) {
    let visuelProduitPanier = document.createElement('div');
    visuelProduitPanier.innerHTML = `<article class="cart__item" data-id="${produitStorage[i].idDuProduit}" data-color="${produitStorage[i].couleurProduit}">
                                    <div class="cart__item__img">
                                    <img src="${produitStorage[i].imageProduit}" alt="${produitStorage[i].descriptionImageProduit}">
                                    </div>
                                    <div class="cart__item__content">
                                    <div class="cart__item__content__description">
                                        <h2>${produitStorage[i].nomDuProduit}</h2>
                                        <p>${produitStorage[i].couleurProduit}</p>
                                        <p>${produitStorage[i].prixProduit} €</p>
                                    </div>
                                    <div class="cart__item__content__settings">
                                        <div class="cart__item__content__settings__quantity">
                                        <p>Qté :</p>
                                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" onchange="updateQuantity(event)" value="${produitStorage[i].nombreDeProduits}" data-id="${produitStorage[i].idDuProduit}" data-color="${produitStorage[i].couleurProduit}">
                                        </div>
                                        <div class="cart__item__content__settings__delete">
                                        <p class="deleteItem">Supprimer</p>
                                        </div>
                                    </div>
                                    </div>
                                    </article>`
    document.querySelector('#cart__items').appendChild(visuelProduitPanier)
}

//--Supression d'un produit dans le panier-->

let creationBtnsuppr = document.createElement('div');
creationBtnsuppr.innerHTML = `<div class="cart__item__content__settings__delete">
                                    <p class="deleteItem">Supprimer</p>
                                    </div>`
let btnSupprimer = document.querySelectorAll(".deleteItem")

for (let i = 0; i < btnSupprimer.length; i++) {
    btnSupprimer[i].addEventListener("click", (event) => {
        event.preventDefault();

        filterProduct = produitStorage.filter(product => product.couleurProduit !== produitStorage[i].couleurProduit || product.idDuProduit !== produitStorage[i].idDuProduit)

        localStorage.setItem("produit", JSON.stringify(filterProduct));

        alert("Ce produit à bien été supprimer du panier")
        location.reload()
    })
}
//---------------------------------Addition du prix de tous les articles----------------------------------------->

let calculPrixTotal = []
let totalQuantity = 0
for (let b = 0; b < produitStorage.length; b++) {
    let ProduitEtQuantité = produitStorage[b].nombreDeProduits
    let prixProduitPanier = produitStorage[b].prixProduit
    let PrixEtQuantité = ProduitEtQuantité * prixProduitPanier
    calculPrixTotal.push(PrixEtQuantité)
    totalQuantity += parseInt(ProduitEtQuantité)
}
const reducer = (accumulator, currentValue) => accumulator + currentValue
const prixTotal = calculPrixTotal.reduce(reducer)

//Affichage du prix de tous les articles

let allPrice = document.querySelector("#totalPrice")
allPrice.innerHTML = prixTotal

//Affichage quantité de produit

let allQuantity = document.querySelector("#totalQuantity")
allQuantity.innerHTML = totalQuantity

//--------------------------------Fleches plus et moins------------------------------------->


function updateQuantity(event) {
    console.log(event.target.dataset.id)
    console.log(event.target.dataset.color)
    console.log(event.target.value)
    let product = produitStorage.find(produit => produit.idDuProduit == event.target.dataset.id && produit.couleurProduit == event.target.dataset.color)
    console.log(product.prixProduit)
    console.log(event.target.value * product.prixProduit)
    product.nombreDeProduits = event.target.value

    let calculPrixTotal = []
    let totalQuantity = 0
    for (let b = 0; b < produitStorage.length; b++) {
        let ProduitEtQuantité = produitStorage[b].nombreDeProduits
        let prixProduitPanier = produitStorage[b].prixProduit
        let PrixEtQuantité = ProduitEtQuantité * prixProduitPanier
        calculPrixTotal.push(PrixEtQuantité)
        totalQuantity += parseInt(ProduitEtQuantité)
    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const prixTotal = calculPrixTotal.reduce(reducer)

    //Affichage du prix de tous les articles

    let allPrice = document.querySelector("#totalPrice")
    allPrice.innerHTML = prixTotal

    //Affichage quantité de produit

    let allQuantity = document.querySelector("#totalQuantity")
    allQuantity.innerHTML = totalQuantity
    console.log(product)
    localStorage.setItem("produit", JSON.stringify(produitStorage));
}

//------------------------------------FORMULAIRE------------------------------------------>

const btnEnvoieFormulaire = document.getElementById('order')
btnEnvoieFormulaire.addEventListener("click", (e) => {
    e.preventDefault()

    const contact = {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value,
    }
    const valeursFormulaire = {
        products: ["107fb5b75607497b96722bda5b504926"],
        contact: contact,
    }

    // generates random id

    // let s4 = () => {
    //     return Math.floor((1 + Math.random()) * 0x10000)
    //         .toString(16)
    //         .substring(1);
    // }

    // return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'

    // let id = (s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4())
    // console.log(id)
    // localStorage.setItem('idCommande', JSON.stringify(id))
    // alert("Votre commande a bien été enregistré")
    // window.location.href = "confirmation.html"





    //-------------------------------------VALIDATION DU FORMULAIRE---------------------------------->
        
    //Controle du texte

        if (!prenomControle(contact)) {
            document.getElementById('firstNameErrorMsg').textContent = "Veuillez bien remplir ce champ"
            document.getElementById('firstNameErrorMsg').style.color = "darkred"
        }
        if (!nomControle(contact)) {
            document.getElementById('lastNameErrorMsg').textContent = "Veuillez bien remplir ce champ"
            document.getElementById('lastNameErrorMsg').style.color = "darkred"
        }
        if (!adresseControle(contact)) {
            document.getElementById('addressErrorMsg').textContent = "Veuillez bien remplir ce champ"
            document.getElementById('addressErrorMsg').style.color = "darkred"
        }
        if (!villeControle(contact)) {
            document.getElementById('cityErrorMsg').textContent = "Veuillez bien remplir ce champ"
            document.getElementById('cityErrorMsg').style.color = "darkred"
        }
        if (!emailControle(contact)) {        
            document.getElementById('emailErrorMsg').textContent = "Veuillez bien remplir ce champ"
            document.getElementById('emailErrorMsg').style.color = "darkred"
        }

// Validation des champs du formulaire
        if(prenomControle(contact) === true && nomControle(contact) === true && adresseControle(contact) === true && villeControle(contact)=== true && emailControle(contact) == true){
            localStorage.setItem('contact', JSON.stringify(contact))
            console.log("formulaire OK")
            passOrder(valeursFormulaire).then((data) => {
                console.log(data.orderId)
                alert("Votre commande a bien été enregistré")
                window.location.href = "confirmation.html"
            }
            )
        }
        else{}
    })

//API Order

//const orderID = fetch("http://localhost:3000/api/products")
const passOrder = async (order) => {
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order)
    };
    try {
        const fetchResponse = await fetch("http://localhost:3000/api/products/order", settings);
        const data = await fetchResponse.json();
        return data;
    } catch (e) {
        return e;
    }    

}
//Controle du prenom

const regExPrenom = (value) => {
    return /^[A-Z][A-Za-z\é\è\ê\-]+$/.test(value)
}

function prenomControle(formData) {
    const prenom = formData.firstName
    if (regExPrenom(prenom)) {
        return true
    }
    else {
        alert("Le prenom n'est pas valide")
        return false
    }
}

//Controle du nom

const regExNom = (value) => {
    return /^[A-Z][A-Za-z\é\è\ê\-]+$/.test(value)
}

function nomControle(formData) {
    const nom = formData.lastName
    if (regExNom(nom)) {
        return true
    }
    else {
        alert("Le nom n'est pas valide")
        return false
    }
}

//Controle de l'email

const regExEmail = (value) => {
    return /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/.test(value)
}

function emailControle(formData) {
    const email = formData.email
    if (regExEmail(email)) {
        return true
    }
    else {
        alert("Email non valide")
        return false
    }
}

//Controle de l'adresse 

const regExAdresse = (value) => {
    return /^[a-zA-Z0-9\s,'-]*$/.test(value)

}

function adresseControle(formData) {
    const adresse = formData.address
    if (regExAdresse(adresse)) {
        return true
    }
    else {
        alert("Adresse non valide")
        return false
    }
}

//Controle de la ville

const regExVille = (value) => {
    return /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(value)

}

function villeControle(formData) {
    const ville = formData.city
    if (regExVille(ville)) {
        return true
    }
    else {
        alert("La ville doit contenir que des lettres")
        return false
    }
}