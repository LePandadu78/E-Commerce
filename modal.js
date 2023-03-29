// Fonction pour ouvrir la modal
function openModal(source) {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    var figeac = document.getElementById(source);
    var nom = figeac.getAttribute("data-nom");
    var prix = figeac.getAttribute("data-prix");
    var image = figeac.getAttribute("data-image");

    // Remplir la modal avec les valeurs des attributs data
    document.getElementById("nom-produit").textContent = nom;
    document.getElementById("prix-produit").textContent = prix + "€";
    document.getElementById("image-produit").src = image;

    // Mettre à jour le prix total en fonction de la quantité choisie
    var quantite = document.getElementById("quantite").value;
    var prixTotal = prix * quantite;
    document.getElementById("prix-total").textContent = "Prix total: " + prixTotal.toFixed(0) + "€";

    // Ajouter un événement onchange au champ de saisie de quantité pour mettre à jour le prix total en temps réel
    var quantiteInput = document.getElementById("quantite");
    quantiteInput.onchange = function() {
      var quantite = quantiteInput.value;
      var prix = document.getElementById("prix-produit").textContent;
      prix = prix.substring(0, prix.length - 1); // Retirer le symbole euro
      var prixTotal = prix * quantite;
      document.getElementById("prix-total").textContent = "Prix total: " + prixTotal.toFixed(0) + "€";
    };
  }

  function ajouterAuPanier(nomProduit, quantite, prixTotal) {
    var panier = JSON.parse(localStorage.getItem("panier")) || []; // Récupérer le panier ou le créer s'il n'existe pas encore

    // Vérifier si le produit est déjà dans le panier
    var produitExistant = false;
    for (var i = 0; i < panier.length; i++) {
      if (panier[i].nomProduit === nomProduit) {
        // Si le produit existe déjà, ajouter la quantité et le prix total au produit existant
        panier[i].quantite += quantite;
        panier[i].prixTotal += prixTotal;
        produitExistant = true;
        break;
      }
    }

    // Si le produit n'existe pas encore dans le panier, le créer et l'ajouter au panier
    if (!produitExistant) {
      var produit = {
        nomProduit: nomProduit,
        quantite: quantite,
        prixTotal: prixTotal
      };
      panier.push(produit);
    }

    // Enregistrer le panier dans le localStorage
    localStorage.setItem("panier", JSON.stringify(panier));

    // Afficher un message de confirmation
    var message = quantite + " bouteille(s) de " + nomProduit + " ont été ajoutées au panier !";
    alert(message);
  }

   // Mettre à jour le nombre de produits dans le panier
   var nombreProduits = parseInt(quantite);
   var compteurPanier = document.getElementById("compteur-panier");
   compteurPanier.textContent = "0";
   var nombreCommandes = parseInt(compteurPanier.textContent) + parseInt(quantite, 10) || 0;   compteurPanier.textContent = nombreCommandes;

  function commander() {
    var nomProduit = document.getElementById("nom-produit").textContent;
    var quantite = document.getElementById("quantite").value;
    var prixTotal = document.getElementById("prix-total").textContent.substring(13);
    ajouterAuPanier(nomProduit, quantite, prixTotal);
    closeModal();
  }

  // Ajouter un événement au bouton "Commander" pour ajouter le produit au panier
document.getElementById("commander").addEventListener("click", function() {
    // Récupérer la quantité de produits commandée
    var quantite = document.getElementById("quantite").value;

    // Ajouter la quantité au compteur de panier
    var compteurPanier = document.getElementById("compteur-panier");
    var nombreCommandes = parseInt(compteurPanier.textContent) + parseInt(quantite);
    compteurPanier.textContent = nombreCommandes;

    // Afficher le message de confirmation
    var confirmation = document.getElementById("confirmation-commande");
    confirmation.style.display = "block";

    // Fermer la modal
    closeModal();
  });

    // Afficher la modal
    document.getElementById("myModal").style.display = "block";


  // Fonction pour fermer la modal
  function closeModal() {
    document.getElementById("myModal").style.display = "none";
  }

  // Fermer la modal si l'utilisateur clique en dehors du contenu de la modal
  window.onclick = function(event) {
    if (event.target == document.getElementById("myModal")) {
      closeModal();
    }
  }
