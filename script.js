const meteo = document.getElementById("meteo_container");
const vent = document.getElementById("wind");
const conditions = document.getElementById("conditions_meteo");
const temp = document.getElementById("temperature");

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString();
}

console.log(getCurrentTime()); 

// Liste des villes avec leurs coordonnées
const cities = [
    { name: "Nantes", lat: 47.2173, lon: -1.5534 },
    { name: "Angers", lat: 47.4698, lon: -0.5593 },
    { name: "Ancenis", lat: 47.3667, lon: -1.1667 },
    { name: "Saint-Nazaire", lat: 47.2833, lon: -2.2 },
    { name: "Challans", lat: 46.85, lon: -1.8833 },
    { name: "La Roche-sur-Yon", lat: 46.6667, lon: -1.4333 },
    { name: "Montaigu", lat: 46.9833, lon: -1.3167 },
    { name: "Pontchâteau", lat: 47.435, lon: -2.089 },
    { name: "Blain", lat: 47.476, lon: -1.762 },
    { name: "Château Gontier", lat: 47.833, lon: -0.7 },
    { name: "Ernée", lat: 48.297, lon: -0.936 },
    { name: "Mayenne", lat: 48.3, lon: -0.6167 },
    { name: "Le Mans", lat: 48, lon: 0.2 },
    { name: "La Flèche", lat: 47.7, lon: -0.0833 },
    { name: "Doué-la-Fontaine", lat: 47.2, lon: -0.28 },
    { name: "Trelazé", lat: 47.45, lon: -0.4667 },
    { name: "Les Sables-d'Olonne", lat: 46.295, lon: -1.4659 },
    { name: "La Tranche-sur-mer", lat: 46.343, lon: -1.4391 }
];

// Initialisation de la carte Leaflet
const map = L.map("map").setView([47.2173, -1.5534], 6); // Centrée sur Nantes

// Ajouter le fond de carte OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
}).addTo(map);

// Fonction pour récupérer et afficher la météo des villes
async function getWeatherForCities(cities) {
    try {
        for (const city of cities) {
            const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`;
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            const data = await response.json();

            // Mapping des codes météo vers des descriptions compréhensibles
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

            const temperature = data.current_weather.temperature;
            const windSpeed = data.current_weather.windspeed;
            const weatherCondition = weatherDescriptions[data.current_weather.weathercode] || "Inconnu";

            // Ajouter un marqueur avec une popup météo pour chaque ville
            L.marker([city.lat, city.lon]).addTo(map)
                .bindPopup(`
                    <b>${city.name}</b><br>
                    🌡 Température: ${temperature} °C<br>
                    💨 Vent: ${windSpeed} km/h<br>
                    ☁️ Conditions: ${weatherCondition}
                `)
                .openPopup(); // Optionnel : affiche directement la popup au chargement

            // Mettre à jour le conteneur HTML pour afficher les données de la dernière ville
            const meteoContainer = document.getElementById("meteo_container");
            if (meteoContainer) {
                meteoContainer.innerHTML += `
                    <h3>${city.name}</h3>
                    <p>🌡 Température: ${temperature} °C</p>
                    <p>💨 Vent: ${windSpeed} km/h</p>
                    <p>☁️ Conditions: ${weatherCondition}</p>
                    <hr>
                `;
            }
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données météo :", error);
        alert("Impossible de récupérer la météo. Vérifiez votre connexion.");
    }
}

// Appel de la fonction pour récupérer la météo de toutes les villes
getWeatherForCities(cities);

// Ajuster la taille de la carte lors du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
  map.invalidateSize();
});
