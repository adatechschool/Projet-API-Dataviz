// Initialisation de la carte centrée sur la région des Pays de la Loire
const map = L.map('map').setView([47.5, -0.8], 8);

// Ajout des tuiles OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Fonction pour styliser les départements
function styleDepartement(feature) {
  return {
    color: "#3388FF",       // Couleur de la bordure (bleu)
    weight: 1,              // Épaisseur de la bordure
    fillColor: "#FFFFFF",   // Couleur de remplissage (blanc)
    fillOpacity: 0          // Opacité du remplissage (transparent)
  };
}

// Fonction pour gérer le survol d'un département
function highlightFeature(e) {
  const layer = e.target;
  layer.setStyle({
    weight: 2,
    color: '#666',
    fillColor: '#00aaff', // Couleur de surbrillance
    fillOpacity: 0.7
  });
}

// Fonction pour réinitialiser le style d'un département
function resetHighlight(e) {
  e.target.setStyle(styleDepartement(e.target.feature));
}

// Fonction pour zoomer sur un département lors du clic
function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

// Fonction pour charger et ajouter un département à la carte
function ajouterDepartement(nomFichier) {
  fetch(nomFichier)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors du chargement du fichier GeoJSON : ' + nomFichier);
      }
      return response.json();
    })
    .then(data => {
      const departementLayer = L.geoJSON(data, {
        style: styleDepartement,
        onEachFeature: (feature, layer) => {
          layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
          });
        }
      }).addTo(map);
    })
    .catch(error => {
      console.error(error);
    });
}

// Liste des fichiers GeoJSON des départements
const departements = [
  'sarthe.geojson',
  'maine_et_loire.geojson',
  'loire_atlantique.geojson',
  'mayenne.geojson',
  'vendee.geojson'
];

// Chargement de chaque département
departements.forEach(ajouterDepartement);

// Création d'une couche masque vide avec les options désirées
const maskLayer = L.mask(null, {
  fitBounds: true,        // Ajuste la vue pour englober le masque
  restrictBounds: true,   // Restreint la navigation aux limites du masque
  color: "#3388FF",       // Couleur de la bordure (bleu)
  weight: 2,              // Épaisseur de la bordure
  fillColor: "#FFFFFF",   // Couleur de remplissage du masque (cachant l'extérieur)
  fillOpacity: 1          // Opacité complète pour masquer l'extérieur
});

// Ajout de la couche masque à la carte
maskLayer.addTo(map);

// Chargement du fichier GeoJSON contenant les contours des Pays de la Loire
fetch('region_pays_de_la_loire.geojson')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur lors du chargement du fichier GeoJSON');
    }
    return response.json();
  })
  .then(data => {
    // Ajout des données GeoJSON au masque
    maskLayer.addData(data);
    // Ajustement de la vue pour englober les limites du masque
    const bounds = L.geoJSON(data).getBounds();
    map.fitBounds(bounds);
  })
  .catch(error => {
    console.error('Erreur lors du chargement du fichier GeoJSON :', error);
  });