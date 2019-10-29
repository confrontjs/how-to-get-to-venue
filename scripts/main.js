const venue = [20.9482648, 52.1783039];
const apiToken = "pk.eyJ1IjoicGFyaXJhbSIsImEiOiJjazFtYnJyZDcwYTUzM25wNjBycXE3a2lnIn0.SCaVmzN7cSKLaZOH52XTKg";
const spots = {
    centralRailStation: "Warszawa Centralna, Aleje Jerozolimskie 54, Warszawa, Mazowieckie 00-024, Poland",
    airport: "Warszawa Lotnisko Chopina, WAW Airport, Warszawa, Mazowieckie 02-143, Poland",
    instituteOfAviation: "Instytut Lotnictwa, Aleja Krakowska, Warszawa, Mazowieckie 02-256, Poland"
};

mapboxgl.accessToken = apiToken;

function loadMap(id) {
    console.log('loadMap(id)', id);

    const map = new mapboxgl.Map({
        container: id,
        style: "mapbox://styles/mapbox/dark-v9",
        center: venue,
        zoom: 15
    });

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

    return { directions };
}

function load1(id) {
    const { directions } = loadMap(id);
    directions.setOrigin(`${spots.centralRailStation}`);
    directions.setDestination(`${spots.instituteOfAviation}`);
}

function load2(id) {
    const { directions } = loadMap(id);
    directions.setOrigin(`${spots.centralRailStation}`);
    directions.setDestination(`${spots.instituteOfAviation}`);
}

function load3(id) {
    const { directions } = loadMap(id);
    directions.setOrigin(`${spots.centralRailStation}`);
    directions.setDestination(`${spots.instituteOfAviation}`);
}

function selectMap(id) {
    console.log('selectMap', id);

    const strategies = new Map();
    strategies.set('map1', load1);
    strategies.set('map2', load2);
    strategies.set('map3', load3);

    const strategy = strategies.get(id);

    if (strategy) {
        strategy(id);
    }
}

function main() {
    const $tabs = document.querySelectorAll('[name=tabset]');
    const $tabsCollection = Array.from($tabs);
    const $initTab = $tabsCollection.find($tab => $tab.checked);

    if (!$initTab) {
        console.warn('Please set attr "checked" in HTML');
        return;
    }

    $tabsCollection.forEach(($tab) => {
        $tab.addEventListener('change', () => {
            const id = $tab.dataset.id;
            selectMap(id);
        });
    })

    const initId = $initTab.dataset.id;
    selectMap(initId);
}

main();
