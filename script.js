const cities = [
  { name: "Saint-Nazaire", lat: 47.27, lng: -2.2 },
  { name: "Les Sables-d'Olonne", lat: 46.5, lng: -1.78 },
  // { name: "Pornic", lat: 47.11, lng: -2.1 },
];

async function fetchTideExtremes() {
  const tideData = {};

  if (isDataFresh()) {
    console.log("Données déjà en cache");
    const storedData = JSON.parse(localStorage.getItem("tideData"));
    displayTideData(storedData);
    return;
  }

  const start = "2025-03-19T00:00:00Z";
  const end = "2025-03-26T00:00:00Z";

  for (const city of cities) {
    const url = `https://api.stormglass.io/v2/tide/extremes/point?lat=${
      city.lat
    }&lng=${city.lng}&start=${encodeURIComponent(
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
  Object.keys(data).forEach((city) => {
    console.log(`\n${city}:`);
    data[city].forEach((event) => {
      const date = new Date(event.time);
      const heightRounded = event.height.toFixed(2);
      console.log(
        `Heure: ${date.toLocaleString()}, ${
          event.type === "high" ? "Pleine mer" : "Basse mer"
        }: ${heightRounded}m`
      );
    });
  });
}
localStorage.clear();
fetchTideExtremes();
