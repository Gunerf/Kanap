let params = (new URL(document.location)).searchParams;
let id = params.get("id");


fetch('http://localhost:3000/api/products/'+id)
    .then((Response) =>
    Response.json().then((data) => {

    let productImg = document.querySelector(".item__img");
    productImg.innerHTML = '<img src="'+data.imageUrl+'" alt="'+data.altTxt+'">'
    
    let productTitle = document.querySelector('#title');
    productTitle.innerHTML = data.name

    let productPrice = document.querySelector('#price');
    productPrice.innerHTML = data.price

    let productDescription = document.querySelector('#description')
    productDescription.innerHTML = data.description
    
    let productColor = document.querySelector('#colors')
    for(let i = 0; i < data.colors.length; i++){
        let colorOption = document.createElement('option')
        colorOption.innerHTML = data.colors[i]
        colorOption.value = data.colors[i]
        productColor.appendChild(colorOption)
    }
    
    const addToCart = document.querySelector("#addToCart")

    addToCart.addEventListener("click", (event) =>{
    event.preventDefault();
    let optionProduit = {
        idDuProduit: data._id,
        nomDuProduit: data.name,
        desciptionProduit: data.description,
        imageProduit: data.imageUrl,
        descriptionImageProduit: data.altTxt,
        prixProduit: data.price,
        couleurProduit: productColor.value,
        nombreDeProduits: quantity.value,
    }

    let produitPanier = JSON.parse(localStorage.getItem("produit"));

    const popupConfirmation = () =>{
        if(window.confirm(`${data.name} option: ${productColor.value} a bien été ajouté au panier
        Consultez le panier OK ou revenir à l'accueil ANNULER`)){
        window.location.href = "cart.html";           
        }
        else{
            window.location.href = "index.html";
        }
    }
    
//Ajout / tri d'un produit au panier

    if(produitPanier){ 
        let productIndex = produitPanier.findIndex(product => product.idDuProduit == data._id && product.couleurProduit === productColor.value)
        if(produitPanier[productIndex]){
            if(produitPanier[productIndex].couleurProduit === productColor.value){
                produitPanier[productIndex].nombreDeProduits = parseInt(produitPanier[productIndex].nombreDeProduits) + parseInt(quantity.value)
            }
            else{
                produitPanier.push(optionProduit);
            }
        }
        else {
        produitPanier.push(optionProduit); 
        }       
        localStorage.setItem("produit", JSON.stringify(produitPanier));
        popupConfirmation()
    }
    else {
        produitPanier = [];
        produitPanier.push(optionProduit);
        localStorage.setItem("produit", JSON.stringify(produitPanier));
        popupConfirmation()
    }
    })
    }))
   