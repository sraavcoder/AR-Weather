let latitude, longitude, destination;

(img1 = document.querySelector("#charminar")),
  (img2 = document.querySelector("#golconda")),
  (img3 = document.querySelector("#ramoji-film-city")),
  (img4 = document.querySelector("#salar-jung-museum")),
  (img5 = document.querySelector("#qutub-shahi-tombs")),
  (img6 = document.querySelector("#birla-mandir"));

$(document).ready(function () {
  alert("Please make sure that your decive allows location!");
  initGrolocation();
});

$(function () {
  $("#weather-button").click(function () {
      window.location.href = `weatherPage/ar_weather.html?source=${latitude};${longitude}&destination=${destination.lat};${destination.lng}`
  })
})

function initGrolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success);
  } else {
    alert("Sorry, your browser does not support Geolocation services!!");
  }
}

function success(position) {
  console.log(position);

  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  mapboxgl.accessToken =
    "pk.eyJ1Ijoic3JhYXZnYW1lciIsImEiOiJja3g5MTdrbnYzNHk3MnJwenJ2d2Uwbnh5In0.oh8gBC_V5peJBZEgp1I6Og";

  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [longitude, latitude],
    zoom: 12.5,
  });

  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    })
  );

  map.addControl(
    new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    }).on("result", function (e) {
      destination = e.result.center;
    })
  );

  map.on("click", function(e){
      destination = e.lngLat;
      console.log(e)
  })

  makeMarker([78.47470534119732, 17.36182516424881], img1);
  makeMarker([78.40100988170957, 17.38353424202751], img2);
  makeMarker([78.68239849714566, 17.31216633385955], img3);
  makeMarker([78.48034322130201, 17.371412823447564], img4);
  makeMarker([78.39663927698683, 17.398281917134643], img5);
  makeMarker([78.46901718199236, 17.406369776020004], img6);

  function makeMarker(coordinates, img) {
    new mapboxgl.Marker({ element: img }).setLngLat(coordinates).addTo(map);
  }
}
