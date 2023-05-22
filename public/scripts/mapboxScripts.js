async function setupMapBox() {

    const token_res = await fetch("/campgrounds/mapbox/token");

    // get the id from the url
    let values = window.location.href.split("/");
    let id = values[values.length - 1];

    // append the id to the query string
    const camp_geometry_data_res = await fetch("/campgrounds/mapbox/campgrounds?id="+id);


    // get the token from the response
    const mapToken = await token_res.json();
    // get the camp_data from the response
    const camp_geometry_data = await camp_geometry_data_res.json();


    


    mapboxgl.accessToken = mapToken.token;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: camp_geometry_data[0].geometry.coordinates, // starting position [lng, lat]
        zoom: 4 // starting zoom
    });
    map.addControl(new mapboxgl.NavigationControl());


    const marker = new mapboxgl.Marker({ color: 'red' })
        .setLngLat(camp_geometry_data[0].geometry.coordinates)
        .addTo(map);
}

// defer the setup of the map to let the page load first
setTimeout(() => setupMapBox(), 1000);