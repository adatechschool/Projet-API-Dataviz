// Initialisation de la carte centrée sur la région des Pays de la Loire
const map = L.map("map", { zoom: 8, minZoom: 8, maxZoom: 8 }).setView(
  [42.3, -0.8],
  8
);
map.zoomControl.remove();

map.dragging.disable();

// Ajouter le fond de carte OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Fonction pour styliser les départements
function styleDepartement(feature) {
  return {
    color: "#3388FF", // Couleur de la bordure (bleu)
    weight: 1, // Épaisseur de la bordure
    fillColor: "#FFFFFF", // Couleur de remplissage (blanc)
    fillOpacity: 0, // Opacité du remplissage (transparent)
  };
}

// Fonction pour gérer le survol d'un département
function highlightFeature(e) {
  const layer = e.target;
  layer.setStyle({
    weight: 2,
    color: "#666",
    fillColor: "#00aaff", // Couleur de surbrillance
    fillOpacity: 0.7,
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

// Fonction asynchrone pour charger et ajouter un département à la carte
async function ajouterDepartement(nomFichier) {
  try {
    const response = await fetch(nomFichier);
    if (!response.ok) {
      throw new Error(
        `Erreur lors du chargement du fichier GeoJSON : ${nomFichier}`
      );
    }
    const data = await response.json();
    L.geoJSON(data, {
      style: styleDepartement,
      onEachFeature: (feature, layer) => {
        layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature,
        });
      },
    }).addTo(map);
  } catch (error) {
    console.error(error);
  }
}

// Liste des fichiers GeoJSON des départements
const departements = [
  "sarthe.geojson",
  "maine_et_loire.geojson",
  "loire_atlantique.geojson",
  "mayenne.geojson",
  "vendee.geojson",
];

// Chargement de chaque département
departements.forEach(ajouterDepartement);

// Création d'une couche masque vide avec les options désirées
const maskLayer = L.mask(null, {
  fitBounds: true, // Ajuste la vue pour englober le masque
  restrictBounds: true, // Restreint la navigation aux limites du masque
  color: "#3388FF", // Couleur de la bordure (bleu)
  weight: 2, // Épaisseur de la bordure
  fillColor: "#87CEEB", // Couleur de remplissage du masque (cachant l'extérieur)
  fillOpacity: 1, // Opacité complète pour masquer l'extérieur
});

// Ajout de la couche masque à la carte
maskLayer.addTo(map);

// Fonction asynchrone pour charger le fichier GeoJSON de la région et appliquer le mask
async function chargerRegion() {
  try {
    const response = await fetch("region_pays_de_la_loire.geojson");
    if (!response.ok) {
      throw new Error(
        "Erreur lors du chargement du fichier GeoJSON de la région"
      );
    }
    const data = await response.json();
    console.log("Données GeoJSON de la région :", data);
    // Ajout des données au masque
    maskLayer.addData(data);
    // Ajustement de la vue pour englober la région
    const bounds = L.geoJSON(data).getBounds();
    map.fitBounds(bounds);
  } catch (error) {
    console.error(
      "Erreur lors du chargement du fichier GeoJSON de la région :",
      error
    );
  }
}

// Chargement du fichier GeoJSON de la région
chargerRegion();

// Ajout d'un EventListener pour réajuster la taille de la carte lors du redimensionnement
window.addEventListener("resize", () => {
  map.invalidateSize();
});
