// Initialiser la carte centrée sur Nantes (Pays de la Loire) avec un zoom de 8
// const map = L.map('map').setView([47.2184, -1.5536], 8);

// Ajouter la couche de tuiles OpenStreetMap à la carte
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; OpenStreetMap contributors'
// }).addTo(map);

// Ajuster la taille de la carte lors du redimensionnement de la fenêtre
// window.addEventListener('resize', () => {
//   map.invalidateSize();
// });



// Initialisation de la carte centrée sur la région des Pays de la Loire
const map = L.map('map').setView([47.5, -0.8], 8);

// Ajout des tuiles OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Créer une couche masque vide avec les options désirées
const maskLayer = L.mask(null, {
  fitBounds: true,        // Ajuste la vue pour englober le masque
  restrictBounds: true,   // Restreint la navigation aux limites du masque
  color: "#3388FF",       // Couleur de la bordure (bleu)
  weight: 2,              // Épaisseur de la bordure
  fillColor: "#FFFFFF",   // Couleur de remplissage du masque (cachant l'extérieur)
  fillOpacity: 1          // Opacité complète pour masquer l'extérieur
});

// Ajoutez la couche masque à la carte (pour définir _map)
maskLayer.addTo(map);

// Chargement du fichier GeoJSON contenant les contours des Pays de la Loire
fetch('region-pays-de-la-loire.geojson')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur lors du chargement du fichier GeoJSON');
    }
    return response.json();
  })
  .then(data => {
    console.log("Données GeoJSON chargées :", data);
    // Ajout des données GeoJSON au masque, maintenant que maskLayer est ajouté à la carte (_map est défini)
    maskLayer.addData(data);
    // Facultatif : ajuster la vue manuellement si nécessaire
    const bounds = L.geoJSON(data).getBounds();
    map.fitBounds(bounds);
  })
  .catch(error => {
    console.error('Erreur lors du chargement du fichier GeoJSON :', error);
  });