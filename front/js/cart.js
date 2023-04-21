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

//------------------------------------------Supression de produit dans le panier----------------------------------------->

let creationBtnsuppr = document.createElement('div');
creationBtnsuppr.innerHTML = `<div class="cart__item__content__settings__delete">
                                    <p class="deleteItem">Supprimer</p>
                                    </div>`
let btnSupprimer = document.querySelectorAll(".deleteItem")

for (let i = 0; i < btnSupprimer.length; i++) {
    btnSupprimer[i].addEventListener("click", (event) => {
        event.preventDefault();

        let supressionProduit = produitStorage[i].couleurProduit;
        filterProduct = produitStorage.filter(product => product.couleurProduit !== supressionProduit && product.idDuProduit == produitStorage[i].idDuProduit)

        localStorage.setItem("produit", JSON.stringify(filterProduct));

        alert("Ce produit à bien été supprimer du panier")
        window.location.href = "cart.html";
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

//valeurFleche = document.querySelector('itemQuantity')
//valeurFleche.addEventListener('change', (e)=>{
//console.log(e.target.value)
//})




function updateQuantity(event) {
    console.log(event.target.dataset.id)
    console.log(event.target.dataset.color)
    console.log(event.target.value)
    let product = produitStorage.find(produit => produit.idDuProduit == event.target.dataset.id && produit.couleurProduit == event.target.dataset.color)
    console.log(product)
    product.nombreDeProduits = event.target.value
    //supprimer le produit si quantite = 0
    //mettre a jour dans le local storage
    //mettre a jour le prix 

}

//------------------------------------FORMULAIRE------------------------------------------>


const btnEnvoieFormulaire = document.getElementById('order')
btnEnvoieFormulaire.addEventListener("click", (e) => {
    e.preventDefault()
    //-----------------------CODE PRECEDENT------------------------

    const contact = {
        prenom: document.querySelector("#firstName").value,
        nom: document.querySelector("#lastName").value,
        adresse: document.querySelector("#address").value,
        ville: document.querySelector("#city").value,
        email: document.querySelector("#email").value,
    }
    const valeursFormulaire = {
        produit: produitStorage,
        utilisateur: contact,
    }
    console.log(contact)
    console.log(valeursFormulaire)


    //-------------------------------------VALIDATION DU FORMULAIRE---------------------------------->

    //Controle du texte

    if (prenomControle(contact)) {
        localStorage.setItem('contact', (valeursFormulaire))
    }
    else {
        document.getElementById('firstNameErrorMsg').textContent = "Veuillez bien remplir ce champ"
    }
    if (nomControle(contact)) {
        localStorage.setItem('contact', (valeursFormulaire))
    }
    else {
        document.getElementById('lastNameErrorMsg').textContent = "Veuillez bien remplir ce champ"
    }
})

//Controle du prenom

const regExPrenom = (value) => {
    return /^[A-Z][A-Za-z\é\è\ê\-]+$/.test(value)
}

function prenomControle(formData) {
    const lePrenom = formData.prenom
    if (regExPrenom(lePrenom)) {
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
    const leNom = formData.nom
    if (regExNom(leNom)) {
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
    const leEmail = formData.email
    if (regExEmail(leEmail)) {
        return true
    }
    else {
        alert("L'email n'est pas valide")
        return false
    }
}

//Controle de l'adresse 

const regExAdresse = (value) => {
    return /^[A-Za-z0-9]$/.test(value)

}

function adresseControle(formData) {
    const leAdresse = formData.adresse
    if (regExEmail(leAdresse)) {
        return true
    }
    else {
        alert("L'adresse doit contenir que des lettres et des chiffres")
        return false
    }
}
