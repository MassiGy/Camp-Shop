mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: campCoordinates, // starting position [lng, lat]
    zoom: 2 // starting zoom
});


const marker = new mapboxgl.Marker({ color: 'red' })
    .setLngLat(campCoordinates)
    .addTo(map);