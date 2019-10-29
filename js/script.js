const venue = [20.9482648, 52.1783039];
const apiToken =
  "pk.eyJ1IjoicGFyaXJhbSIsImEiOiJjazFtYnJyZDcwYTUzM25wNjBycXE3a2lnIn0.SCaVmzN7cSKLaZOH52XTKg";
const spots = {
  centralRailStation:
    "Warszawa Centralna, Aleje Jerozolimskie 54, Warszawa, Mazowieckie 00-024, Poland",
  airport:
    "Warszawa Lotnisko Chopina, WAW Airport, Warszawa, Mazowieckie 02-143, Poland",
  instituteOfAviation:
    "Instytut Lotnictwa, Aleja Krakowska, Warszawa, Mazowieckie 02-256, Poland"
};
mapboxgl.accessToken = apiToken;


const $tab = document.querySelector('.tab');
const $tabAttribute = $tab.getAttribute('data-id');
let containerId = $tabAttribute;

const map = new mapboxgl.Map({
  container: containerId,
  style: "mapbox://styles/mapbox/dark-v9",
  center: venue,
  zoom: 15
});



map.on("load", function (containerId) {
  const directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken
  });
  const geolocation = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  });
  map.addControl(directions, "top-left");
  map.addControl(geolocation);

  const marker = new mapboxgl.Marker({ color: "#fadf1d" })
    .setLngLat(venue)
    .addTo(map);

  switch (containerId) {
    case `map2`:
      directions.setOrigin(`${spots.centralRailStation}`);
      directions.setDestination(`${spots.instituteOfAviation}`);

    case `map3`:
      directions.setOrigin(`${spots.airport}`);
      directions.setDestination(`${spots.instituteOfAviation}`);

  };
}
);







