// Metflix version XMLHttpRequest
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

      // Afficher les différentes catégories
      afficherFilmsXML(xmlDoc);

      console.log(xmlDoc);
    } else {
      console.error("Erreur lors du chargement du fichier XML");
      console.error("status :", xhr.status);
      console.error("message :", xhr.statusText);
    }
  };

  // Gérer les erreurs réseau
  xhr.onerror = function () {
    console.error("erreur reseau lors du chargement du fichier xml");
    alert("impossible de charger les données. Vérifier votre connexion !");
  };

  // Envoyer la requête
  xhr.send();
}

console.log(chargerNetflopXml());

/**
 * Fonction pour afficher les films depuis le document XML
 * @param {Document} xmlDoc Document XML parse par DOMparser
 */
function afficherFilmsXML(xmlDoc) {
  // Récupérer le containeur HTML où afficher les films
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
    console.log(films[i]);
  }
}
