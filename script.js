// --- Netflop version XMLHttpRequest ---
// Objet javascript qui va nous permettre de récupérer des fichier json ou JSON

function chargerNetflopJson() {
  // créer un nouvel objet XMLHttpRequest
  let xhr = new XMLHttpRequest();

  // configurer une requête
  // utiliser la méthode 'GET' = pour recupérer des données
  // deuxième paramètres le nom du fichier à charger
  /* - true = requête asynchrone (ne bloque pas le navigateur et l'exécution du 
  code) */

  xhr.open("GET", "netflop.json", true);

  // Définir le gestionnaire d'événement pour le chargement
  xhr.onload = function () {
    console.log("Status de la requête:", xhr.status);
    // vérifie si la requête réussie
    // status 200  = OK (succès)
    if (xhr.status === 200) {
      // Parser la réponse du serveur avec DOMparser(); (parse = parcourir/analyse le fichier)
      let data = JSON.parse(xhr.responseText);

      console.log(data);

      // Appel des fonctions d'affichage
      // Pour afficher les différentes catégories
      afficherFilmsJSON(data.netflop.films.film);
      afficherSeriesJSON(data.netflop.series.serie);
      afficherDocumentaireJSON(data.netflop.documentaires.documentaire);
      afficherMangaJSON(data.netflop.mangas.manga);
      afficherAnimeJSON(data.netflop.animes.anime);
      afficherShowJSON(data.netflop.shows.show);
      afficherConcertJSON(data.netflop.concerts.concert);
    } else {
      console.error("Erreur lors du chargement du fichier JSON :", xhr.status);
      console.error("status :", xhr.status);
      console.error("message :", xhr.statusText);
    }
  };

  // Gérer les erreurs réseau
  xhr.onerror = function () {
    console.error("Erreur réseau lors du chargement du fichier JSON");
    alert("Impossible de charger les données. Vérifiez votre connexion !");
  };

  // Envoyer la requête
  xhr.send();
}

// ---------------------------------------------------------
// FONCTIONS D'AFFICHAGE
// ---------------------------------------------------------

function afficherFilmsJSON(films) {
  // Récupérer le conteneur HTML où afficher les films
  let container = document.getElementById("films");

  // Créer un titre pour la section
  let titre = document.createElement("h2");
  titre.textContent = "Films";
  container.appendChild(titre);

  // Récupérer TOUS les elements <films> du JSON
  /* getElementsByTagName() retourne une collection de tous les élements avec 
  ce nom de balise */

  console.log(films);

  /* Parcourir tous les films (attention films est un HTMLCollection, du coup pas
  vrai tableau) */
  for (let i = 0; i < films.length; i++) {
    let filmCard = creerCarteJSON(films[i], "film");
    container.appendChild(filmCard);
  }
}

function afficherSeriesJSON(series) {
  let container = document.getElementById("series");

  let titre = document.createElement("h2");
  titre.textContent = "Séries";
  container.appendChild(titre);

  console.log(series);
  for (let i = 0; i < series.length; i++) {
    let serieCard = creerCarteJSON(series[i], "serie");
    container.appendChild(serieCard);
  }
}

function afficherDocumentaireJSON(documentaires) {
  let container = document.getElementById("documentaires");

  let titre = document.createElement("h2");
  titre.textContent = "Documentaires";
  container.appendChild(titre);

  console.log(documentaires);
  for (let i = 0; i < documentaires.length; i++) {
    let docCard = creerCarteJSON(documentaires[i], "documentaire");
    container.appendChild(docCard);
  }
}

function afficherMangaJSON(mangas) {
  let container = document.getElementById("mangas");

  let titre = document.createElement("h2");
  titre.textContent = "Mangas";
  container.appendChild(titre);

  console.log(mangas);
  for (let i = 0; i < mangas.length; i++) {
    let mangaCard = creerCarteJSON(mangas[i], "manga");
    container.appendChild(mangaCard);
  }
}

function afficherAnimeJSON(animes) {
  let container = document.getElementById("animes");

  let titre = document.createElement("h2");
  titre.textContent = "Animés";
  container.appendChild(titre);

  console.log(animes);
  for (let i = 0; i < animes.length; i++) {
    let animeCard = creerCarteJSON(animes[i], "anime");
    container.appendChild(animeCard);
  }
}

function afficherShowJSON(shows) {
  let container = document.getElementById("shows");

  let titre = document.createElement("h2");
  titre.textContent = "Show";
  container.appendChild(titre);

  console.log(shows);
  for (let i = 0; i < shows.length; i++) {
    let showCard = creerCarteJSON(shows[i], "show");
    container.appendChild(showCard);
  }
}

function afficherConcertJSON(concerts) {
  let container = document.getElementById("concerts");

  let titre = document.createElement("h2");
  titre.textContent = "Concerts";
  container.appendChild(titre);

  console.log(concerts);
  for (let i = 0; i < concerts.length; i++) {
    let concertCard = creerCarteJSON(concerts[i], "concert");
    container.appendChild(concertCard);
  }
}
// ---------------------------------------------------------
// FONCTION POUR CRÉER UNE "CARTE"
// ---------------------------------------------------------

function creerCarteJSON(item, itemType) {
  // creer le conteneur de la carte
  // creer une div pour la carte
  let card = document.createElement("div");
  card.className = "card";

  console.log(item);
  // Extraire les données du JSON

  // Récupérer le nom depuis la balise <nom>
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

  // // Récuperer l'id de l'élément depuis l'attribut "id"
  let itemId = item.id;

  // Vérifier que l'id existe avant de rendre la card cliquable
  if (itemId && itemType) {
    // Ajouter l'événement au click
    card.onclick = function () {
      // Rediriger vers la page détail avec l'id et le type dynamique
      window.location.href = `pageFilm.html?id=${itemId}&type=${itemType}`;
    };
  }

  // On retourne la carte complète.
  return card;
}

// ---------------------------------------------------------
// Lancer le chargement au DOM prêt
// ---------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  console.log("Le DOM est chargé, lancement de Netflop avec DOMParser...");
  chargerNetflopJson();
});
