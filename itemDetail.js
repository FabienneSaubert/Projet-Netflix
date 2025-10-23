// -----------------------------------------------------------------------------
// FONCTION POUR RECUPERER DONNEES URL
// -----------------------------------------------------------------------------
// Récupère dans l'URL tout ce qui a après le ? donc ID et TYPE
function getUrlParams() {
  let params = new URLSearchParams(window.location.search);

  return {
    id: params.get("id"),
    type: params.get("type"),
  };
}

//------------------------------------------------------------------------------
// FONCTION POUR CHARGER DETAIL
// -----------------------------------------------------------------------------

function chargerItemDetail() {
  // récupère Id et Type
  let urlParams = getUrlParams();

  let itemId = urlParams.id;
  let itemType = urlParams.type;
  let xhr = new XMLHttpRequest();
  console.log(itemId, itemType);

  xhr.open("GET", "netflop.xml", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(xhr.responseText, "text/xml");
      let item = chercherItemParType(xmlDoc, itemId, itemType);
      console.log(item);

      if (item) {
        afficherDetailItem(item, itemType);
      } else {
        console.error("Item non trouvé !");
      }
    } else {
      console.error("Erreur lors du chargement du fichier XML :", xhr.status);
    }
  };

  xhr.onerror = function () {
    console.error("Erreur réseau lors du chargement du fichier XML");
    alert("Impossible de charger les données. Vérifiez votre connexion !");
  };
  xhr.send();
}

// //------------------------------------------------------------------------------
// // FONCTION ASSOCIER ID ET CONTENU XML
// // -----------------------------------------------------------------------------

function chercherItemParType(xmlDoc, itemId, itemType) {
  // on va chercher l'élement dans notre XML par son type (film, serie, documentaire...)
  let items = xmlDoc.getElementsByTagName(itemType);

  // On parcourt la liste des items
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    // On vérifie si l'item à un attribut Id
    if (item.hasAttribute("id") && item.getAttribute("id") === itemId) {
      return item;
    }
  }
}

// // -----------------------------------------------------------------------------
// // FONCTION AFFICHER = IMPORTE DANS LE DOM LE CONTENU DE L'ITEM
// // -----------------------------------------------------------------------------

function afficherDetailItem(item, itemType) {
  let url = item.getElementsByTagName("url")[0].textContent;

  let card = document.createElement("div");
  card.className = "card";

  // Extraire les données du XML

  // Récupérer le nom depuis la balise <nom>
  let nom = item.getElementsByTagName("nom")[0].textContent;

  // Récupérer le genre depuis la balise <genre>
  let genre = item.getElementsByTagName("genre")[0].textContent;

  // Récupérer le réalisateur depuis la balise <realisateur>
  let realisateur = item.getElementsByTagName("realisateur")[0].textContent;

  // Récupérer la date depuis la balise <dateSortie>
  let dateSortie = item.getElementsByTagName("dateSortie")[0].textContent;

  // Récupérer le résumé depuis la balise <resumer>
  // trim() = supprimer les espaces au début et à la fin
  let resumer = item.getElementsByTagName("resumer")[0].textContent.trim();

  // Image
  // Créer un élement img pour afficher l'image
  let img = document.createElement("img");
  // Définir la source de l'image
  img.src = url;
  img.alt = nom;
  img.className = "card-image";

  // Informations
  // Créer le conteneur pour les informations
  // Créer une div pour contenir toutes les infos textuelles
  let infoDiv = document.createElement("div");
  infoDiv.className = "card-info";

  // Créer le titre
  // Créer un élément h2 pour titre
  let titreElement = document.createElement("h2");
  titreElement.textContent = nom;

  // créer l'élement genre
  // Créer un paragraphe pour le genre
  let genreElement = document.createElement("p");
  // innerHTML permet d'insérer du html
  genreElement.innerHTML = "<strong>Genre : </strong>" + genre;

  // Créer l'élément réalisateur
  // Créer un paragraphe pour le réalisateur
  let realisateurElement = document.createElement("p");
  realisateurElement.innerHTML =
    "<strong> Réalisateur : </strong>" + realisateur;

  // Créer l'élément date de sortir
  // Créer un paragraphe pour la date de sortie
  let dateElement = document.createElement("p");
  dateElement.innerHTML = "<strong> Date de sortie : </strong> " + dateSortie;

  // Créer le  conteneur du résumé
  // Créer une div pour contenir le résumé et le bouton
  let resumerContainer = document.createElement("div");
  resumerContainer.className = "resume-container";

  // Créer l'élément résumé
  // Créer un paragraphe pour le résumé
  let resumeElement = document.createElement("p");
  resumeElement.className = "resume";
  resumeElement.innerHTML = "<strong> Résumé : </strong>" + resumer;

  let container = document.getElementById("item-detail");
  container.appendChild(card);

  // Ajouter le résumé au conteneur
  resumerContainer.appendChild(resumeElement);

  // Assembler tous les éléments
  // Ajouter tous les éléments au conteneur d'inofrmation
  infoDiv.appendChild(titreElement);
  infoDiv.appendChild(genreElement);
  infoDiv.appendChild(realisateurElement);
  infoDiv.appendChild(dateElement);
  infoDiv.appendChild(resumerContainer);

  // On ajoute l'image et les informations à la carte
  card.appendChild(img);
  card.appendChild(infoDiv);
}
window.addEventListener("DOMContentLoaded", chargerItemDetail);
