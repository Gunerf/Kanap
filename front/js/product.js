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

    // ------------------Ajout d'un item dans le panier

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

    // ------------------Création popup erreur et ajout panier

    const popupConfirmation = () =>{
        if(window.confirm(`${data.name} option: ${productColor.value} a bien été ajouté au panier
        Consultez le panier OK ou revenir à l'accueil ANNULER`)){
        window.location.href = "cart.html";           
        }
        else{
            window.location.href = "index.html";
        }
    }
    const popupError = () =>{
        if(productColor.value.length === 0 && (quantity.value < 1 || quantity.value > 100)){
            alert("Veuillez sélectionner une couleur et une quantité entre 1 et 100")
        }
        else{
            if(productColor.value.length === 0){
                alert("Veuillez sélectionner une couleur")
            }
            else{
                alert("Veuillez sélectionner une quantité entre 1 et 100")
            }
        }
    }
    
//------------------------------------Ajout / tri d'un produit au panier------------------------------>

    let produitPanier = JSON.parse(localStorage.getItem("produit"));

    if(productColor.value.length === 0 || (quantity.value < 1 || quantity.value > 100)){
        popupError()
    }
    else{
        if(produitPanier){ 
        let productIndex = produitPanier.findIndex(product => product.idDuProduit == data._id && product.couleurProduit === productColor.value)
        if(produitPanier[productIndex] && produitPanier[productIndex].couleurProduit === productColor.value){
                produitPanier[productIndex].nombreDeProduits += quantity.value
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
    }
    })
    }))
   