mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: campCoordinates, // starting position [lng, lat]
    zoom: 4 // starting zoom
});
map.addControl(new mapboxgl.NavigationControl());


const marker = new mapboxgl.Marker({ color: 'red' })
    .setLngLat(campCoordinates)
    .addTo(map);