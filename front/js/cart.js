let produitStorage = JSON.parse(localStorage.getItem("produit"));


let visuelProduitPanier = document.querySelector("#cart__items")
for(let i = 0; i < produitStorage.length; i++){
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
                                        <p>Qté : "${produitStorage[i].nombreDeProduits}"</p>
                                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitStorage[i].nombreDeProduits}">
                                        </div>
                                        <div class="cart__item__content__settings__delete">
                                        <p class="deleteItem">Supprimer</p>
                                        </div>
                                    </div>
                                    </div>
                                    </article>`
    document.querySelector('#cart__items').appendChild(visuelProduitPanier)   
}

//Supression de produit dans le panier

let creationBtnsuppr = document.createElement('div');
    creationBtnsuppr.innerHTML = `<div class="cart__item__content__settings__delete">
                                    <p class="deleteItem">Supprimer</p>
                                    </div>`
let btnSupprimer = document.querySelectorAll(".deleteItem")
for(let a = 0; a < btnSupprimer.length; a++){
    btnSupprimer[a].addEventListener("click" , (event) =>{
        event.preventDefault();
        let supressionProduit = produitStorage[a].couleurProduit;

        filterProduct = produitStorage.filter(product => product.couleurProduit !== supressionProduit)

        localStorage.setItem("produit", JSON.stringify(filterProduct));

        alert("Ce produit à bien été supprimer du panier")
        window.location.href = "cart.html";
    })
}

//Addition du prix de tous les articles

let calculPrixTotal = []
let totalQuantity = 0
for(let b = 0; b < produitStorage.length; b++){
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


//------------------------------------Formulaire------------------------------------------

const btnEnvoieFormulaire = document.querySelector("#order")
btnEnvoieFormulaire.addEventListener("click", (e)=>{
    e.preventDefault

    //Mdn formdata 
    
    const contact = {
        prenom: document.querySelector("#firstName").value,
        nom: document.querySelector("#lastName").value,
        adresse: document.querySelector("#address").value,
        ville: document.querySelector("#city").value,
        email: document.querySelector("#email").value,
    }
    console.log(contact)
    const valeursFormulaire = {
        produitStorage,
        contact
    }
    console.log(valeursFormulaire)

    let form = new FormData(document.getElementById("#orderForm")) 
    console.log(form)
})

