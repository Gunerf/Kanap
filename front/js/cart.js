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

//---------------------------------Addition du prix de tous les articles----------------------------------------->

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

//--------------------------------Fleches plus et moins------------------------------------->

//valeurFleche = document.querySelector('itemQuantity')
//valeurFleche.addEventListener('change', (e)=>{
    //console.log(e.target.value)
//})

for(let y = 0; y < produitStorage.length; y++){
console.log(produitStorage[y].nombreDeProduits)
function updateQuantity(event){  
    console.log(event.target.dataset.id)
    console.log(event.target.dataset.color)
    console.log(event.target.value)
    let nombreProduitStorage = produitStorage[y].nombreDeProduits  
    let calculeNombre = nombreProduitStorage = event.target.value
    console.log(calculeNombre)        
}
}
//------------------------------------FORMULAIRE------------------------------------------>


const btnEnvoieFormulaire = document.getElementById('order')
btnEnvoieFormulaire.addEventListener("click", (e)=>{
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
    
//------------------------NOUVEAU CODE (formdata)-------------------------------
    //const form = document.getElementById('orderForm')
    //const formData = new FormData(form)
    //console.log(formData.values())

    //let firstName = document.getElementById('firstName').value
    //console.log(firstName)
//-------------------------------------VALIDATION DU FORMULAIRE---------------------------------->

//Controle du prenom
    function prenomControle() {

        const lePrenom = contact.prenom
        console.log(lePrenom)
        if(/^[A-Za-z]$/.test(lePrenom)){
            return true
        }
        else{
            alert ("Chiffre et symbole ne sont pas autorisé")
            return false
        }
    }
        if(prenomControle()){
            localStorage.setItem('contact', (valeursFormulaire))
        }
        else{
            alert ("Veuillez bien remplir le formulaire")
        }
})


