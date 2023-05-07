// Récupération du panier sotcké dans le localStorage

let produitStorage = JSON.parse(localStorage.getItem("produit"));

// Affichage des produits dans le panier sur la page panier

for (let i = 0; i < produitStorage.length; i++) {
    let visuelProduitPanier = document.createElement('div');

    visuelProduitPanier.innerHTML =
        `<article class="cart__item" data-id="${produitStorage[i].idDuProduit}" data-color="${produitStorage[i].couleurProduit}">
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
    </article>`

    document.querySelector('#cart__items').appendChild(visuelProduitPanier)
}

// Création des boutons supprimer

let creationBtnsuppr = document.createElement('div');
creationBtnsuppr.innerHTML = `<div class="cart__item__content__settings__delete">
                                    <p class="deleteItem">Supprimer</p>
                                </div>`

// Suppression du produit et mise à jour du panier

let btnSupprimer = document.querySelectorAll(".deleteItem")

for (let i = 0; i < btnSupprimer.length; i++) {
    btnSupprimer[i].addEventListener("click", (event) => {
        event.preventDefault();

        NewCart = produitStorage.filter(product => product.couleurProduit !== produitStorage[i].couleurProduit || product.idDuProduit !== produitStorage[i].idDuProduit)

        localStorage.setItem("produit", JSON.stringify(NewCart));

        alert("Ce produit a bien été supprimé du panier")
        location.reload()
    })
}

// Addition du prix de tous les articles

let totalPrice = []
let totalQuantity = 0
for (let b = 0; b < produitStorage.length; b++) {
    let ProductQuantity = produitStorage[b].nombreDeProduits
    let ProductPrice = produitStorage[b].prixProduit
    totalPrice.push(ProductQuantity * ProductPrice)
    totalQuantity += parseInt(ProductQuantity)
}

<<<<<<< HEAD
const reducer = (accumulator, currentValue) => accumulator + currentValue
const prixTotal = totalPrice.reduce(reducer)

// Affichage du prix de tous les articles
=======

//Affichage du prix de tous les articles
>>>>>>> origin

let allPrice = document.querySelector("#totalPrice")
allPrice.innerHTML = prixTotal

<<<<<<< HEAD
// Affichage quantité de produit
=======

//Affichage quantité de produit
>>>>>>> origin

let allQuantity = document.querySelector("#totalQuantity")
allQuantity.innerHTML = totalQuantity

<<<<<<< HEAD
// Fleches plus et moins
=======

//--------------------------------Fleches plus et moins------------------------------------->

>>>>>>> origin

function updateQuantity(event) {

    let product = produitStorage.find(produit => produit.idDuProduit == event.target.dataset.id && produit.couleurProduit == event.target.dataset.color)
    product.nombreDeProduits = event.target.value

    // On réutilise les fonctions utilisées précédemment

    let totalPrice = []
    let totalQuantity = 0
    for (let b = 0; b < produitStorage.length; b++) {
        let ProductQuantity = produitStorage[b].nombreDeProduits
        let ProductPrice = produitStorage[b].prixProduit
        totalPrice.push(ProductQuantity * ProductPrice)
        totalQuantity += parseInt(ProductQuantity)
    }
<<<<<<< HEAD

    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const prixTotal = totalPrice.reduce(reducer)
=======
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const prixTotal = calculPrixTotal.reduce(reducer)
    

//Affichage du prix de tous les articles
>>>>>>> origin

    let allPrice = document.querySelector("#totalPrice")
    allPrice.innerHTML = prixTotal

<<<<<<< HEAD
=======
//Affichage quantité de produit

>>>>>>> origin
    let allQuantity = document.querySelector("#totalQuantity")
    allQuantity.innerHTML = totalQuantity

    localStorage.setItem("produit", JSON.stringify(produitStorage));
}

<<<<<<< HEAD
//Récupération des ID des produits du panier 

let idPanier = []
for (let p = 0; p < produitStorage.length; p++) {
    idPanier.push(produitStorage[p].idDuProduit)
}

// Formulaire
=======
//Recuperation ID panier 

let idPanier = []
for (let p = 0; p < produitStorage.length; p++){
    let idArticle = produitStorage[p].idDuProduit
    console.log(idArticle)
}

//------------------------------------FORMULAIRE------------------------------------------>
>>>>>>> origin

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
        products: idPanier,
        contact: contact,
    }

<<<<<<< HEAD
    // Validation du formulaire

    // Contrôle du prénom

    const regExPrenom = (value) => {
        return /^[A-Z][A-Za-z\é\è\ê\-]+$/.test(value)
    }

    function prenomControle(formData) {
        const prenom = formData.firstName
        if (regExPrenom(prenom)) {
            return true
        }
        else {
            alert("Le prénom n'est pas valide")
            return false
        }
    }

    // Contrôle du nom

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

    // Contrôle de l'e-mail

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

    // Contrôle de l'adresse 

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

    // Contrôle de la ville

    const regExVille = (value) => {
        return /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(value)
    }

    function villeControle(formData) {
        const ville = formData.city
        if (regExVille(ville)) {
            return true
        }
        else {
            alert("La ville ne doit contenir que des lettres")
            return false
        }
    }

    // Affichage des erreurs de saisie

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
=======
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
                alert("Votre commande a bien été enregistré")
                localStorage.setItem('idCommande', JSON.stringify(data.orderId))
                window.location.href = "confirmation.html"
            }
            )
        }
        else{}
    })

//API Order

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
>>>>>>> origin
    }
    if (!villeControle(contact)) {
        document.getElementById('cityErrorMsg').textContent = "Veuillez bien remplir ce champ"
        document.getElementById('cityErrorMsg').style.color = "darkred"
    }
<<<<<<< HEAD
    if (!emailControle(contact)) {
        document.getElementById('emailErrorMsg').textContent = "Veuillez bien remplir ce champ"
        document.getElementById('emailErrorMsg').style.color = "darkred"
=======
}

//Controle du nom

const regExNom = (value) => {
    return /^[A-Z][A-Za-z\é\è\ê\-]+$/.test(value)
}

function nomControle(formData) {
    const nom = formData.lastName
    if (regExNom(nom)) {
        return true
>>>>>>> origin
    }

    // Validation des champs du formulaire

    if (prenomControle(contact) && nomControle(contact) && adresseControle(contact) && villeControle(contact) && emailControle(contact)) {
        localStorage.setItem('contact', JSON.stringify(contact))
        passOrder(valeursFormulaire).then((data) => {
            alert("Votre commande a bien été enregistrée")
            localStorage.setItem('idCommande', JSON.stringify(data.orderId))
            window.location.href = "confirmation.html"
        })
    }

<<<<<<< HEAD
    // API order

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
})
=======
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
>>>>>>> origin
