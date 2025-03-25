const meteo = document.getElementById("meteo_container");
const vent = document.getElementById("wind");
const conditions = document.getElementById("conditions_meteo");
const temp = document.getElementById("temperature");

// Liste des villes avec leurs coordonnées
const cities = [
  { name: "Nantes", lat: 47.2173, lon: -1.5534 },
  { name: "Angers", lat: 47.4698, lon: -0.5593 },
  { name: "Ancenis", lat: 47.3667, lon: -1.1767 },
  { name: "Saint-Nazaire", lat: 47.2733, lon: -2.22 },
  { name: "Challans", lat: 46.85, lon: -1.8833 },
  { name: "La Roche-sur-Yon", lat: 46.6667, lon: -1.4333 },
  { name: "Montaigu", lat: 46.9733, lon: -1.3167 },
  { name: "Pontchâteau", lat: 47.435, lon: -2.089 },
  { name: "Blain", lat: 47.476, lon: -1.762 },
  { name: "Château Gontier", lat: 47.833, lon: -0.7 },
  { name: "Ernée", lat: 48.297, lon: -0.936 },
  { name: "Mayenne", lat: 48.3, lon: -0.6167 },
  { name: "Le Mans", lat: 48, lon: 0.2 },
  { name: "La Flèche", lat: 47.7, lon: -0.0833 },
  { name: "Doué-la-Fontaine", lat: 47.19, lon: -0.28 },
  { name: "Trelazé", lat: 47.45, lon: -0.4667 },
  { name: "Les Sables-d'Olonne", lat: 46.5029, lon: -1.785493 },
  { name: "La Tranche-sur-mer", lat: 46.343, lon: -1.4391 },
  { name: "La Ferté-Bernard", lat: 48.188, lon: 0.647 },
];

// Les marees
const ville = [
  { name: "Les Sables-d'Olonne", lat: 46.5, lon: -1.78 }
]

// Affichage des pictogrammes sur la carte
const weatherIcons = {
  "Ciel dégagé":
    "https://lottie.host/b3b5ae08-5f3e-4094-ab58-f9612a687ac7/O8LhOt2dyT.lottie",
  "Principalement dégagé":
    "https://lottie.host/df7ee213-b80d-4cf3-94f4-1e91f15e9d2f/aXsV9VNWrm.lottie",
  "Partiellement nuageux":
    "https://lottie.host/df7ee213-b80d-4cf3-94f4-1e91f15e9d2f/aXsV9VNWrm.lottie",
  Couvert:
    "https://lottie.host/522351a4-39b0-46aa-82b5-29da2f0a8e2d/lrI1nvcZdv.lottie",
  Brouillard:
    "https://lottie.host/dd6c14a7-9062-4561-8e27-111094a81883/drAH2y6hpD.lottie",
  "Brouillard givrant":
    "https://lottie.host/e8f718db-3f4f-4b63-98ce-322a709e7578/vP1DhP1eT8.lottie",
  "Bruine légère":
    "https://lottie.host/3d813a49-7e5b-4ef7-9616-fb07c2735bc5/gMoKYuZNUJ.lottie",
  "Bruine modérée":
    "https://lottie.host/3d813a49-7e5b-4ef7-9616-fb07c2735bc5/gMoKYuZNUJ.lottie",
  "Bruine forte":
    "https://lottie.host/3d813a49-7e5b-4ef7-9616-fb07c2735bc5/gMoKYuZNUJ.lottie",
  "Pluie faible":
    "https://lottie.host/3d813a49-7e5b-4ef7-9616-fb07c2735bc5/gMoKYuZNUJ.lottie",
  "Pluie modérée":
    "https://lottie.host/3d813a49-7e5b-4ef7-9616-fb07c2735bc5/gMoKYuZNUJ.lottie",
  "Pluie forte":
    "https://lottie.host/23163af9-92dc-4756-afdd-3fa300c34b2f/6I4HAiEMpU.lottie",
  "Neige faible":
    "https://lottie.host/42816e51-8680-4266-88eb-268445961b2d/0UCBzJNKRw.lottie",
  "Neige modérée":
    "https://lottie.host/42816e51-8680-4266-88eb-268445961b2d/0UCBzJNKRw.lottie",
  "Neige forte":
    "https://lottie.host/42816e51-8680-4266-88eb-268445961b2d/0UCBzJNKRw.lottie",
  "Averses légères":
    "https://lottie.host/3d813a49-7e5b-4ef7-9616-fb07c2735bc5/gMoKYuZNUJ.lottie",
  "Averses modérées":
    "https://lottie.host/3d813a49-7e5b-4ef7-9616-fb07c2735bc5/gMoKYuZNUJ.lottie",
  "Averses fortes":
    "https://lottie.host/23163af9-92dc-4756-afdd-3fa300c34b2f/6I4HAiEMpU.lottie",
  Orages:
    "https://lottie.host/316dc6f7-4377-471b-92b3-371490ff7d15/BNgEHOLSzg.lottie",
  "Orages avec grêle légère":
    "https://lottie.host/dd39b0a1-7fdd-4dd8-9387-ef7d485a0427/fL8OIQVGOt.lottie",
  "Orages avec grêle forte":
    "https://lottie.host/dd39b0a1-7fdd-4dd8-9387-ef7d485a0427/fL8OIQVGOt.lottie",
};

// Mettre à jour l'heure en temps réel
function updateDateTime() {
  const now = new Date();

  // Formatage de la date en français
  const optionsDate = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateString = now.toLocaleDateString("fr-FR", optionsDate);

  // Formatage de l'heure en français (HH:MM:SS)
  const optionsTime = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
  const timeString = now.toLocaleTimeString("fr-FR", optionsTime);

  // Mise à jour du DOM
  document.getElementById(
    "date_heure"
  ).textContent = `\uD83D\uDCC5 Nous sommes le ${dateString} et il est ${timeString}`;
}

// Mettre à jour l'heure toutes les secondes
setInterval(updateDateTime, 1000);
updateDateTime();

// Fonction pour récupérer et afficher la météo des villes
async function getWeatherForCities(cities) {
  const cacheKey = "weatherData";
  const cacheDuration = 3600 * 1000; // 1 heure en millisecondes
  const now = Date.now();

  // Récupération du cache s'il existe
  let cachedData = localStorage.getItem(cacheKey);
  if (cachedData) {
    cachedData = JSON.parse(cachedData);
    if (now - cachedData.timestamp < cacheDuration) {
      console.log("Chargement des données depuis le cache...", cachedData.data);
      displayWeather(cachedData.data);
      displaySunTimes(cachedData.data[0].data); // Affiche les données globales depuis le cache
      return;
    }
  }

  try {
    console.log("Récupération des données depuis l'API...");
    const today = new Date().toISOString().split("T")[0]; // ex: "2025-03-21"
    const requests = cities.map((city) =>
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true&hourly=relative_humidity_2m&daily=sunrise,sunset&timezone=Europe/Paris&start=${today}&end=${today}`
      )
        .then((response) => {
          if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
          return response.json();
        })
        .then((data) => {
          console.log(`Réponse pour ${city.name}:`, data);
          return { city, data };
        })
    );

    const results = await Promise.all(requests);

    // Stocker les nouvelles données en cache
    localStorage.setItem(
      cacheKey,
      JSON.stringify({ timestamp: now, data: results })
    );

    displayWeather(results);
    displaySunTimes(results[0].data); // Affiche les données globales pour la première ville (ex: Nantes)
  } catch (error) {
    console.error("Erreur lors de la récupération des données météo :", error);
    alert("Impossible de récupérer la météo. Vérifiez votre connexion.");
  }
}

function getWeatherIcon(weatherCondition) {
  const lottieUrl =
    weatherIcons[weatherCondition] ||
    "https://lottie.host/79e439ba-40aa-449f-82fe-16f39f7808c2/wRg9H6cZdU.lottie";
  return L.divIcon({
    html: `<dotlottie-player src="${lottieUrl}" background="transparent" speed="1" style="width: 70px; height: 70px" loop autoplay></dotlottie-player>`,
    className: "custom-lottie-icon",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
}

// Nouvelle fonction pour afficher les heures de lever et coucher globales
function displaySunTimes(data) {
  const sunrise = data.daily?.sunrise?.[0]
    ? new Date(data.daily.sunrise[0]).toLocaleTimeString("fr-FR")
    : "Non disponible";
  const sunset = data.daily?.sunset?.[0]
    ? new Date(data.daily.sunset[0]).toLocaleTimeString("fr-FR")
    : "Non disponible";

  // Mise à jour des éléments HTML
  const sunriseElement = document.getElementById("sunrise");
  const sunsetElement = document.getElementById("sunset");
  if (sunriseElement)
    sunriseElement.textContent = `\uD83C\uDF1E Lever du soleil : ${sunrise}`;
  if (sunsetElement)
    sunsetElement.textContent = `\uD83C\uDF19 Coucher du soleil : ${sunset}`;
}

function displayWeather(results) {
  const weatherDescriptions = {
    0: "Ciel dégagé",
    1: "Principalement dégagé",
    2: "Partiellement nuageux",
    3: "Couvert",
    45: "Brouillard",
    48: "Brouillard givrant",
    51: "Bruine légère",
    53: "Bruine modérée",
    55: "Bruine forte",
    61: "Pluie faible",
    63: "Pluie modérée",
    65: "Pluie forte",
    71: "Neige faible",
    73: "Neige modérée",
    75: "Neige forte",
    80: "Averses légères",
    81: "Averses modérées",
    82: "Averses fortes",
    95: "Orages",
    96: "Orages avec grêle légère",
    99: "Orages avec grêle forte",
  };

  const meteoContainer = document.getElementById("meteo_container");
  if (meteoContainer) {
    meteoContainer.innerHTML = "";
  }

  results.forEach(({ city, data }) => {
    const temperature = data.current_weather.temperature;
    const windSpeed = data.current_weather.windspeed;
    const weatherCondition =
      weatherDescriptions[data.current_weather.weathercode] || "Inconnu";
    const humidity = data.hourly.relative_humidity_2m[11];

    // Les données de sunrise/sunset ne sont plus dans les popups
    L.marker([city.lat, city.lon], {
      icon: getWeatherIcon(weatherCondition),
    }).addTo(map).bindPopup(`
      <b>${city.name}</b><br>
      🌡 Température: ${temperature} °C<br>
      💨 Vent: ${windSpeed} km/h<br>
      ☁️ Conditions: ${weatherCondition}<br>
      💧 Humidité : ${humidity} %
    `);
  });
}
// localStorage.clear();

// Appel de la fonction
getWeatherForCities(cities);

// Ajuster la taille de la carte lors du redimensionnement de la fenêtre
window.addEventListener("resize", () => {
  map.invalidateSize();
});

async function getMaree() {
  const apiKey = "c88ca459-11c8-464d-8723-440c53dd35b7";
  const lat = 46.4963; // Latitude des Sables-d'Olonne
  const lon = -1.7831; // Longitude des Sables-d'Olonne
  const url = `https://www.worldtides.info/api/v3?heights&lat=${lat}&lon=${lon}&length=86400&key=${apiKey}`;

  const lastFetched = localStorage.getItem("lastFetched");
  const now = Date.now();

  if (lastFetched && now - lastFetched < 86400000) {
      // Utilise les données stockées si elles sont encore valides
      const storedData = JSON.parse(localStorage.getItem("mareeData"));
      updateMareeUI(storedData);
  } else {
      try {
          const response = await fetch(url);
          const data = await response.json();

          if (data.heights && data.heights.length > 0) {
              let mareeHaute = "Non trouvé";
              let mareeBasse = "Non trouvé";

              // Trier les hauteurs pour trouver les plus hautes et plus basses
              data.heights.sort((a, b) => b.height - a.height);
              mareeHaute = new Date(data.heights[0].dt * 1000).toLocaleTimeString("fr-FR");
              mareeBasse = new Date(data.heights[data.heights.length - 1].dt * 1000).toLocaleTimeString("fr-FR");

              // Sauvegarder les données dans le localStorage
              const mareeData = { mareeHaute, mareeBasse };
              localStorage.setItem("mareeData", JSON.stringify(mareeData));
              localStorage.setItem("lastFetched", now);

              // Mettre à jour l'interface utilisateur avec les nouvelles données
              updateMareeUI(mareeData);
          } else {
              console.error("Aucune donnée de marée trouvée.");
          }
      } catch (error) {
          console.error("Erreur lors de la récupération des marées :", error);
      }
  }
}

// Met à jour l'interface utilisateur avec les données de marée
function updateMareeUI(data) {
  document.getElementById("maree-haute").textContent = `Marée haute : ${data.mareeHaute}`;
  document.getElementById("maree-basse").textContent = `Marée basse : ${data.mareeBasse}`;
}

// Exécuter la fonction au chargement
document.addEventListener("DOMContentLoaded", getMaree);

// Ajout des tuiles OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Fonction pour styliser les départements
function styleDepartement(feature) {
  return {
    color: "#3388FF", // Couleur de la bordure (bleu)
    weight: 1, // Épaisseur de la bordure
    fillColor: "#0096C7", // Couleur de remplissage (bleu)
    fillOpacity: 0.7, // Opacité du remplissage (transparent)
  };
}

// Fonction pour gérer le survol d'un département
function highlightFeature(e) {
  const layer = e.target;
  layer.setStyle({
    weight: 2,
    color: "#666",
    fillColor: "#0077B6", // Couleur de surbrillance
    fillOpacity: 0.7,
  });
}

// // Fonction pour réinitialiser le style d'un département
// function resetHighlight(e) {
//   e.target.setStyle(styleDepartement(e.target.feature));
// }

// // Fonction pour zoomer sur un département lors du clic
// function zoomToFeature(e) {
//   map.fitBounds(e.target.getBounds());
// }

// // Fonction asynchrone pour charger et ajouter un département à la carte
// async function ajouterDepartement(nomFichier) {
//   try {
//     const response = await fetch(nomFichier);
//     if (!response.ok) {
//       throw new Error(
//         `Erreur lors du chargement du fichier GeoJSON : ${nomFichier}`
//       );
//     }
//     const data = await response.json();
//     L.geoJSON(data, {
//       style: styleDepartement,
//       onEachFeature: (feature, layer) => {
//         // Lier un tooltip affichant le nom du département
//         if (feature.properties && feature.properties.nom) {
//           layer.bindTooltip(feature.properties.nom, {
//             permanent: false, // s'affiche uniquement au survol
//             direction: 'top', // positionne le tooltip au-dessus du curseur
//             sticky: true, // le tooltip suit le curseur
//             offset: L.point(0, -10)
//           });
//         }

//         // Gestion des événements de survol et de clic
//         layer.on({
//           mouseover: highlightFeature,
//           mouseout: resetHighlight,
//           click: zoomToFeature,
//         });
//       },
//     }).addTo(map);
//   } catch (error) {
//     console.error(error);
//   }
// }

// // Liste des fichiers GeoJSON des départements
// const departements = [
//   "sarthe.geojson",
//   "maine_et_loire.geojson",
//   "loire_atlantique.geojson",
//   "mayenne.geojson",
//   "vendee.geojson",
// ];

// // Chargement de chaque département
// departements.forEach(ajouterDepartement);

// // Création d'une couche masque vide avec les options désirées
// const maskLayer = L.mask(null, {
//   fitBounds: true, // Ajuste la vue pour englober le masque
//   restrictBounds: true, // Restreint la navigation aux limites du masque
//   color: "#3388FF", // Couleur de la bordure (bleu)
//   weight: 2, // Épaisseur de la bordure
//   fillColor: "#F6F6F6", // Couleur de remplissage du masque (cachant l'extérieur)
//   fillOpacity: 1, // Opacité complète pour masquer l'extérieur
// });

// // Ajout de la couche masque à la carte
// maskLayer.addTo(map);

// // Fonction asynchrone pour charger le fichier GeoJSON de la région et appliquer le mask
// async function chargerRegion() {
//   try {
//     const response = await fetch("region_pays_de_la_loire.geojson");
//     if (!response.ok) {
//       throw new Error(
//         "Erreur lors du chargement du fichier GeoJSON de la région"
//       );
//     }
//     const data = await response.json();
//     console.log("Données GeoJSON de la région :", data);
//     // Ajout des données au masque
//     maskLayer.addData(data);
//     // Ajustement de la vue pour englober la région
//     const bounds = L.geoJSON(data).getBounds();
//     map.fitBounds(bounds);
//   } catch (error) {
//     console.error(
//       "Erreur lors du chargement du fichier GeoJSON de la région :",
//       error
//     );
//   }
// }

// // Chargement du fichier GeoJSON de la région
// chargerRegion();

// // Ajout d'un EventListener pour réajuster la taille de la carte lors du redimensionnement
// window.addEventListener("resize", () => {
//   map.invalidateSize();
// });
