let params = (new URL(document.location)).searchParams;
let id = params.get("id");

fetch('http://localhost:3000/api/products/'+id).then(
    
    (Response) => Response.json().then(
        
        (data) => {

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
        
        /* Ajout d'un item dans le panier */

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

            // Tu déclares la variable trop tôt => let produitPanier = JSON.parse(localStorage.getItem("produit"));

            /* Création des fonctions popup d'erreur et de confirmation d'ajout au panier */

            const popupConfirmation = () =>{
                if(window.confirm(`${data.name} , couleur : ' ${productColor.value} ' a bien été ajouté au panier. Cliquez sur 'Ok' pour consulter le panier ou 'Annuler' pour revenir à l'accueil`))  
                {
                    window.location.href = "cart.html";           
                }
                else
                {
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
            
            /* Ajout / tri d'un produit au panier */
            
            let Panier = JSON.parse(localStorage.getItem("produit"));

            if(productColor.value.length === 0 || (quantity.value < 1 || quantity.value > 100)){
                popupError()
            }
            else{
                if(Panier){ 
                    let ProductIndex = Panier.findIndex(product => product.idDuProduit == data._id && product.couleurProduit === productColor.value)

                    if(Panier[ProductIndex]){
                        if(Panier[ProductIndex].couleurProduit === productColor.value){
                            
                            Panier[ProductIndex].nombreDeProduits = Panier[ProductIndex].nombreDeProduits + quantity.value

                            // Parse int inutiles : ça transforme string en int or c'est déjà des int => parseInt(Panier[ProductIndex].nombreDeProduits) + parseInt(quantity.value)

                            // Tu peux simplifier en => Panier[ProductIndex].nombreDeProduits += quantity.value

                        }
                        else{
                            Panier.push(optionProduit);
                        }
                    }
                    else {
                        Panier.push(optionProduit); 
                    }

                    /* Pareil tu peux simplifier en changeant la condition du if car tu as 2 else identiques :

                    if(Panier[ProductIndex] && Panier[ProductIndex].couleurProduit === productColor.value){
                        [...]
                    }
                    else {
                        Panier.push(optionProduit); 
                    } 
                    
                    */
                    
                    localStorage.setItem("produit", JSON.stringify(Panier));
                    popupConfirmation()

                }

                else {
                    Panier = [];
                    Panier.push(optionProduit);
                    localStorage.setItem("produit", JSON.stringify(Panier));
                    popupConfirmation()
                }
            }
        })
        }
    )
)
   