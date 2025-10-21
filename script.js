// --- Netflop version XMLHttpRequest ---
// Objet javascript qui va nous permettre de récupérer des fichier json ou XML

function chargerNetflopXml() {
  // créer un nouvel objet XMLHttpRequest
  let xhr = new XMLHttpRequest();

  // configurer une requête
  // utiliser la méthode 'GET' = pour recupérer des données
  // le nom du fichier à charger
  /* - true = requête asynchrone (ne bloque pas le navigateur et l'exécution du 
  code) */

  xhr.open("GET", "netflop.xml", true);

  // Définir le gestionnaire d'événement pour le chargement
  xhr.onload = function () {
    // vérifie si la requête réussie
    // status 200  = OK (succès)
    if (xhr.status === 200) {
      // Parser la réponse du serveur avec DOMparser(); (parse = parcourir/analyse le fichier)
      let parser = new DOMParser();
      // console.log(parser);
      // Parse le text xml reçu et converti en document XML
      // xhr.responseText = contenu du fichier XML en texte
      // 'text/xml' = type MIME pour indiquer que c'est du XML
      let xmlDoc = parser.parseFromString(xhr.responseText, "text/xml");

      // Appel des fonctions d'affichage
      afficherFilmsXML(xmlDoc);
      afficherSeriesXML(xmlDoc);
      afficherDocumentaireXML(xmlDoc);
      afficherMangaXML(xmlDoc);
      afficherAnimeXML(xmlDoc);
      afficherShowXML(xmlDoc);
      afficherConcertXML(xmlDoc);
    } else {
      console.error("Erreur lors du chargement du fichier XML :", xhr.status);
      console.error("status :", xhr.status);
      console.error("message :", xhr.statusText);
    }
  };

  // Gérer les erreurs réseau
  xhr.onerror = function () {
    console.error("Erreur réseau lors du chargement du fichier XML");
    alert("Impossible de charger les données. Vérifiez votre connexion !");
  };

  // Envoyer la requête
  xhr.send();
}

/**
 * Fonction pour afficher les films depuis le document XML
 * @param {Document} xmlDoc Document XML parse par DOMparser
 */
// ---------------------------------------------------------
// FONCTIONS D'AFFICHAGE
// ---------------------------------------------------------

function afficherFilmsXML(xmlDoc) {
  // Récupérer le conteneur HTML où afficher les films
  let container = document.getElementById("films");

  // Créer un titre pour la section
  let titre = document.createElement("h2");
  titre.textContent = "Films";
  container.appendChild(titre);

  // Récupérer TOUS les elements <films> du XML
  /* getElementsByTagName() retourne une collection de tous les élements avec 
  ce nom de balise */
  let films = xmlDoc.getElementsByTagName("film");

  console.log(films);

  /* Parcourir tous les films (attention films est un HTMLCollection, du coup pas
  vrai tableau) */
  for (let i = 0; i < films.length; i++) {
    let filmCard = creerCarteXML(films[i]);
    container.appendChild(filmCard);
  }
}

/**
 *  Fonction générique pour créer une carte d'affichage à partir d'un élément XML
 *@param {element} item - element XML (film, série, etc)
 @returns {HTMLElement} - element div representant la carte
 */

function afficherSeriesXML(xmlDoc) {
  let container = document.getElementById("series");

  let titre = document.createElement("h2");
  titre.textContent = "Séries";
  container.appendChild(titre);

  let series = xmlDoc.getElementsByTagName("serie");
  console.log(series);
  for (let i = 0; i < series.length; i++) {
    let serieCard = creerCarteXML(series[i]);
    container.appendChild(serieCard);
  }
}

function afficherDocumentaireXML(xmlDoc) {
  let container = document.getElementById("documentaire");

  let titre = document.createElement("h2");
  titre.textContent = "Documentaires";
  container.appendChild(titre);

  let documentaires = xmlDoc.getElementsByTagName("documentaire");
  console.log(documentaires);
  for (let i = 0; i < documentaires.length; i++) {
    let docCard = creerCarteXML(documentaires[i]);
    container.appendChild(docCard);
  }
}

function afficherMangaXML(xmlDoc) {
  let container = document.getElementById("manga");

  let titre = document.createElement("h2");
  titre.textContent = "Mangas";
  container.appendChild(titre);

  let manga = xmlDoc.getElementsByTagName("manga");
  console.log(manga);
  for (let i = 0; i < manga.length; i++) {
    let mangaCard = creerCarteXML(manga[i]);
    container.appendChild(mangaCard);
  }
}

function afficherAnimeXML(xmlDoc) {
  let container = document.getElementById("anime");

  let titre = document.createElement("h2");
  titre.textContent = "Animés";
  container.appendChild(titre);

  let anime = xmlDoc.getElementsByTagName("anime");
  console.log(anime);
  for (let i = 0; i < anime.length; i++) {
    let animeCard = creerCarteXML(anime[i]);
    container.appendChild(animeCard);
  }
}

function afficherShowXML(xmlDoc) {
  let container = document.getElementById("show");

  let titre = document.createElement("h2");
  titre.textContent = "Show";
  container.appendChild(titre);

  let show = xmlDoc.getElementsByTagName("show");
  console.log(show);
  for (let i = 0; i < show.length; i++) {
    let showCard = creerCarteXML(show[i]);
    container.appendChild(showCard);
  }
}

function afficherConcertXML(xmlDoc) {
  let container = document.getElementById("concert");

  let titre = document.createElement("h2");
  titre.textContent = "Concerts";
  container.appendChild(titre);

  let concert = xmlDoc.getElementsByTagName("concert");
  console.log(concert);
  for (let i = 0; i < concert.length; i++) {
    let concertCard = creerCarteXML(concert[i]);
    container.appendChild(concertCard);
  }
}
// ---------------------------------------------------------
// FONCTION GÉNÉRIQUE POUR CRÉER UNE CARTE
// ---------------------------------------------------------

function creerCarteXML(item) {
  // creer le conteneur de la carte
  // creer une div pour la carte
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

  // Récupérer l'url de l'image depuis la balise <url>
  let url = item.getElementsByTagName("url")[0].textContent;

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
  genreElement.innerHTML = "<strong>Genre :</strong>" + genre;

  // Créer l'élément réalisateur
  // Créer un paragraphe pour le réalisateur
  let realisateurElement = document.createElement("p");
  realisateurElement.innerHTML =
    "<strong> Réalisateur :</strong>" + realisateur;

  // Créer l'élément date de sortir
  // Créer un paragraphe pour la date de sortie
  let dateElement = document.createElement("p");
  dateElement.innerHTML = "<strong> Date de sortie :</strong> " + dateSortie;

  // Créer le  conteneur du résumé
  // Créer une div pour contenir le résumé et le bouton
  let resumerContainer = document.createElement("div");
  resumerContainer.className = "resume-container";

  // Créer l'élément résumé
  // Créer un paragraphe pour le résumé
  let resumeElement = document.createElement("p");
  resumeElement.className = "resume";
  resumeElement.innerHTML = "<strong> Résumé :</strong>" + resumer;

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

  // On retourne la carte complète.
  return card;
}

// ---------------------------------------------------------
// Lancer le chargement au DOM prêt
// ---------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  console.log("Le DOM est chargé, lancement de Netflop avec DOMParser...");
  chargerNetflopXml();
});
