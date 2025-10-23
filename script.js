// --- Netflop version XMLHttpRequest ---
// Objet javascript qui va nous permettre de récupérer des fichier json ou JSON

function chargerNetflopJson() {
  /* Création d'un objet XMLHttpRequest qui permet de faire des requêtes HTTP depuis le navigateur. 
Ici, il est utilisé pour charger un fichier JSON. */
  let xhr = new XMLHttpRequest();

  /* Configuration de la requête : On configure une requête de type GET (premier paramètre) pour récupérer 
  le fichier "netflop.json" (deuxième paramètre). Le troisième paramètre true indique 
  que la requête est asynchrone (le navigateur ne sera pas bloqué en attendant la réponse).*/

  xhr.open("GET", "netflop.json", true);

  /* Gestion de la réponse : Lorsqu'une réponse est reçue (onload), on affiche le 
  code de statut de la requête HTTP dans la console (par exemple, 200 signifie "succès"). */
  xhr.onload = function () {
    console.log("Status de la requête:", xhr.status);

    /* Vérification du succès : Si le statut est 200 (succès), on utilise JSON.parse() 
    pour convertir la réponse JSON en objet JavaScript. La réponse est ensuite affichée dans la console.*/
    if (xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      console.log(data);

      /* Appels aux fonctions d'affichage : Une fois les données récupérées et transformées, 
  elles sont envoyées à différentes fonctions pour les afficher sous forme de cartes 
  pour les films, séries, documentaires, mangas, etc. */
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

  // Envoi de la requête : La requête est envoyée au serveur.
  xhr.send();
}

// ---------------------------------------------------------
// FONCTIONS D'AFFICHAGE
// ---------------------------------------------------------

function afficherFilmsJSON(films) {
  /* On crée un conteneur pour afficher les films. 
D'abord, on récupère un élément HTML (avec getElementById) où les films vont être affichés. 
Ensuite, on crée un titre et un conteneur pour les cartes (les éléments de film). */

  let container = document.getElementById("films"); //Création du conteneur :

  // Créer un titre pour la section
  let titre = document.createElement("h2");
  titre.textContent = "Films";

  let cardsContainer = document.createElement("div"); // Creation d'une div supplémentaire pour css du titre
  cardsContainer.className = "cards-container";

  container.appendChild(titre);
  container.appendChild(cardsContainer);

  // Récupérer TOUS les elements <films> du JSON
  /* getElementsByTagName() retourne une collection de tous les élements avec 
  ce nom de balise */

  console.log(films);

  /* On parcourt le tableau de films et pour chaque film, 
  on appelle la fonction creerCarteJSON() pour créer une carte de film. Cette carte 
  est ajoutée au conteneur. */
  for (let i = 0; i < films.length; i++) {
    let filmCard = creerCarteJSON(films[i], "film");
    cardsContainer.appendChild(filmCard);
  }
}

function afficherSeriesJSON(series) {
  let container = document.getElementById("series");

  let titre = document.createElement("h2");
  titre.textContent = "Séries";

  let cardsContainer = document.createElement("div");
  cardsContainer.className = "cards-container";

  container.appendChild(titre);
  container.appendChild(cardsContainer);

  console.log(series);
  for (let i = 0; i < series.length; i++) {
    let serieCard = creerCarteJSON(series[i], "serie");
    cardsContainer.appendChild(serieCard);
  }
}

function afficherDocumentaireJSON(documentaires) {
  let container = document.getElementById("documentaires");

  let titre = document.createElement("h2");
  titre.textContent = "Documentaires";

  let cardsContainer = document.createElement("div");
  cardsContainer.className = "cards-container";

  container.appendChild(titre);
  container.appendChild(cardsContainer);

  console.log(documentaires);
  for (let i = 0; i < documentaires.length; i++) {
    let documentaireCard = creerCarteJSON(documentaires[i], "documentaire");
    cardsContainer.appendChild(documentaireCard);
  }
}

function afficherMangaJSON(mangas) {
  let container = document.getElementById("mangas");

  let titre = document.createElement("h2");
  titre.textContent = "Mangas";

  let cardsContainer = document.createElement("div");
  cardsContainer.className = "cards-container";

  container.appendChild(titre);
  container.appendChild(cardsContainer);

  console.log(mangas);
  for (let i = 0; i < mangas.length; i++) {
    let mangaCard = creerCarteJSON(mangas[i], "manga");
    cardsContainer.appendChild(mangaCard);
  }
}

function afficherAnimeJSON(animes) {
  let container = document.getElementById("animes");

  let titre = document.createElement("h2");
  titre.textContent = "Animés";

  let cardsContainer = document.createElement("div");
  cardsContainer.className = "cards-container";

  container.appendChild(titre);
  container.appendChild(cardsContainer);

  console.log(animes);
  for (let i = 0; i < animes.length; i++) {
    let animeCard = creerCarteJSON(animes[i], "anime");
    cardsContainer.appendChild(animeCard);
  }
}

function afficherShowJSON(shows) {
  let container = document.getElementById("shows");

  let titre = document.createElement("h2");
  titre.textContent = "Shows";

  let cardsContainer = document.createElement("div");
  cardsContainer.className = "cards-container";

  container.appendChild(titre);
  container.appendChild(cardsContainer);

  console.log(shows);
  for (let i = 0; i < shows.length; i++) {
    let showCard = creerCarteJSON(shows[i], "show");
    cardsContainer.appendChild(showCard);
  }
}

function afficherConcertJSON(concerts) {
  let container = document.getElementById("concerts");

  // Crée le titre
  let titre = document.createElement("h2");
  titre.textContent = "Concerts";

  // Crée un sous-conteneur pour les cartes
  let cardsContainer = document.createElement("div");
  cardsContainer.className = "cards-container"; // ✅ pour le style

  // Ajoute le titre et le bloc de cartes
  container.appendChild(titre);
  container.appendChild(cardsContainer);

  // Ajoute les cartes à la bonne div
  for (let i = 0; i < concerts.length; i++) {
    let concertCard = creerCarteJSON(concerts[i], "concert");
    cardsContainer.appendChild(concertCard);
  }
}

// ---------------------------------------------------------
// FONCTION POUR CRÉER UNE "CARTE"
// ---------------------------------------------------------

function creerCarteJSON(item, itemType) {
  /* Création d'une carte : Une nouvelle div est créée pour servir de conteneur à une carte. 
On lui assigne une classe CSS card pour le style. */

  let card = document.createElement("div"); // creer une div pour la carte
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
