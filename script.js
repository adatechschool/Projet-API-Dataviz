const meteo = document.getElementById("meteo_container");
const vent = document.getElementById("wind");
const conditions = document.getElementById("conditions_meteo");
const temp = document.getElementById("temperature");

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString();
}

console.log(getCurrentTime()); 

async function getWeather() {
    try {
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${47.2173}&longitude=${-1.5534}&current_weather=true`;

        // Effectuer la requête fetch
        const response = await fetch(apiUrl);

        // Vérifier si la réponse est correcte
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        // Parser la réponse en JSON
        const data = await response.json();

        // Afficher les données météo
        console.log("Météo actuelle à Nantes :");
        console.log("Température :", data.current_weather.temperature, "°C");
        console.log("Vent :", data.current_weather.windspeed, "km/h");
        console.log("Conditions :", data.current_weather.weathercode);
       
        temp.innerHTML=data.current_weather.temperature+" °C";
        vent.innerHTML=data.current_weather.windspeed+" km/h";
        conditions.innerHTML= "conditions : "+data.current_weather.weathercode;

    } catch (error) {
        console.error("Erreur lors de la récupération des données météo :", error);
    }
}
// Appel de la fonction pour obtenir la météo
getWeather();

// Initialiser la carte centrée sur Nantes (Pays de la Loire) avec un zoom de 8
const map = L.map('map').setView([47.2184, -1.5536], 8);

// Ajouter la couche de tuiles OpenStreetMap à la carte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Ajuster la taille de la carte lors du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
  map.invalidateSize();
});

