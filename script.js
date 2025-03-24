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
  { name: "Saint-Nazaire", lat: 47.27, lon: -2.2 },
  { name: "Les Sables-d'Olonne", lat: 46.5, lon: -1.78 },
  { name: "La Tranche-sur-mer", lat: 46.343, lon: -1.4391 },
];

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
  ).textContent = `Nous sommes le ${dateString} et il est ${timeString}`;
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
    sunriseElement.textContent = `Lever du soleil : ${sunrise}`;
  if (sunsetElement)
    sunsetElement.textContent = `Coucher du soleil : ${sunset}`;
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

// Affichage des marees
async function fetchTideExtremes() {
  const tideData = {};

  if (isDataFresh()) {
    console.log("Données déjà en cache");
    const storedData = JSON.parse(localStorage.getItem("tideData"));
    console.log("Données en cache:", storedData); // Debug
    displayTideData(storedData);
    return;
  }

  const now = new Date();
  const start = now.toISOString().split(".")[0] + "Z";
  const end =
    new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split(".")[0] + "Z";

  for (const city of ville) {
    const url = `https://api.stormglass.io/v2/tide/extremes/point?lat=${
      city.lat
    }&lng=${city.lon}&start=${encodeURIComponent(
      start
    )}&end=${encodeURIComponent(end)}`;
    console.log(`Requête pour ${city.name}: ${url}`);

    const response = await fetch(url, {
      headers: {
        Authorization:
          "be092528-03fa-11f0-b8ac-0242ac130003-be0925aa-03fa-11f0-b8ac-0242ac130003",
      },
    });

    if (!response.ok) {
      console.error(
        `Erreur HTTP pour ${city.name}: ${response.status} ${response.statusText}`
      );
      const errorData = await response.json();
      console.error("Détails de l'erreur:", errorData);
      continue;
    }

    const jsonData = await response.json();
    if (!jsonData.data) {
      console.error(
        `Pas de 'data' dans la réponse pour ${city.name}:`,
        jsonData
      );
      continue;
    }

    tideData[city.name] = jsonData.data.map((event) => ({
      time: event.time,
      height: event.height,
      type: event.type,
    }));
  }

  localStorage.setItem("tideData", JSON.stringify(tideData));
  localStorage.setItem("lastUpdate", Date.now().toString());
  displayTideData(tideData);
}

function isDataFresh() {
  const lastUpdate = localStorage.getItem("lastUpdate");
  if (!lastUpdate) return false;
  const now = Date.now();
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  return now - parseInt(lastUpdate) < oneWeek;
}

function displayTideData(data) {
  console.log("Données à afficher:", data); // Debug
  affichageMarees.textContent = "";

  if (isDataFresh()) {
    affichageMarees.textContent += "Données déjà en cache\n\n";
  }

  Object.keys(data).forEach((city) => {
    affichageMarees.textContent += `${city}:\n`;
    data[city].forEach((event) => {
      const date = new Date(event.time);
      const heightRounded = event.height.toFixed(2); // Erreur ici si height est undefined
      affichageMarees.textContent += `Heure: ${date.toLocaleString()}, ${
        event.type === "high" ? "Pleine mer" : "Basse mer"
      }: ${heightRounded}m\n`;
    });
    affichageMarees.textContent += "\n";
  });
}
//fetchTideExtremes();

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