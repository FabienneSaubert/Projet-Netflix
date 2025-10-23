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

  xhr.open("GET", "netflop.json", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);

      let item = chercherItemParType(data, itemId, itemType);
      console.log(item);

      if (item) {
        afficherDetailItem(item);
      } else {
        console.error("Item non trouvé !");
      }
    } else {
      console.error("Erreur lors du chargement du fichier JSON :", xhr.status);
    }
  };

  xhr.onerror = function () {
    console.error("Erreur réseau lors du chargement du fichier JSON");
    alert("Impossible de charger les données. Vérifiez votre connexion !");
  };
  xhr.send();
}

// //------------------------------------------------------------------------------
// // FONCTION ASSOCIER ID ET CONTENU JSON
// // -----------------------------------------------------------------------------

function chercherItemParType(data, itemId, itemType) {
  // on va chercher l'élement dans notre JSON par son type (film, serie, documentaire...)
  console.log(data.netflop);

  let categoryMap = {
    film: { categorie: "films", tableau: data.netflop.films.film },
    serie: { categorie: "series", tableau: data.netflop.series.serie },
    documentaire: {
      categorie: "documentaires",
      tableau: data.netflop.documentaires.ducumentaire,
    },
    manga: { categorie: "mangas", tableau: data.netflop.mangas.manga },
    anime: { categorie: "animes", tableau: data.netflop.animes.anime },
    show: { categorie: "shows", tableau: data.netflop.shows.show },
    concert: { categorie: "concerts", tableau: data.netflop.concerts.concert },
  };

  let config = categoryMap[itemType];

  if (!config) {
    console.log("Le type n'existe pas");
    return null;
  }

  if (config.tableau && Array.isArray(config.tableau)) {
    for (let i = 0; i < config.tableau.length; i++) {
      if (config.tableau[i].id === itemId) {
        return config.tableau[i];
      }
    }
  }
}

// // -----------------------------------------------------------------------------
// // FONCTION AFFICHER = IMPORTE DANS LE DOM LE CONTENU DE L'ITEM
// // -----------------------------------------------------------------------------

function afficherDetailItem(item) {
  let card = document.createElement("div");
  card.className = "card";

  // Extraire les données du JSON

  // Récupérer le nom depuis l'index 'nom'
  let nom = item.nom;

  // Récupérer le genre depuis la balise <genre>
  let genre = item.genre;

  // Récupérer le réalisateur depuis la balise <realisateur>
  let realisateur = item.realisateur;

  // Récupérer la date depuis la balise <dateSortie>
  let dateSortie = item.dateSortie;

  // Récupérer le résumé depuis la balise <resumer>
  // trim() = supprimer les espaces au début et à la fin
  let resumer = item.resumer;

  // Récupérer l'url de l'image depuis la balise <url>
  let url = item.url;

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
  // Créer un élément h3 pour titre
  let titreElement = document.createElement("h3");
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

  // Verifier si le résumé dépasse 4 lignes
  // On va utiliser le setTimeout pour laisser le dom se mettre à jour
  // Permettre aussi de mesurer la hauteur réelle

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
