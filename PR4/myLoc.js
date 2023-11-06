document.addEventListener("DOMContentLoaded", getMyLocation)

let watchId = null;

const collegeCoords = {
    latitude: 48.943053,
    longitude: 24.733754
};

function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
        var watchButton = document.getElementById('watch');
        watchButton.onclick = watchLocation;
        var clearWatchButton = document.getElementById('clearWatch');
        clearWatchButton.onclick = clearWatch;
    }
    else { alert("Ooops, no getlocation support") }
}

function displayLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let timestamp = position.timestamp; 
    let div = document.getElementById("location");
    div.innerHTML = `You are at Latitude: ${latitude}, Longitude: ${longitude}`;
    div.innerHTML += `(with ${position.coords.accuracy} meters accuracy)`;
    let km = computeDistance(position.coords, collegeCoords);
    let distance = document.getElementById("distance");
    distance.innerHTML = `You are ${km} km from the College`;

    var userMarker = L.marker([latitude, longitude]).addTo(map);
    userMarker.bindPopup(`Your Location: ${latitude}, ${longitude}`);
    userMarker.openPopup();
    addLocationMarker(latitude, longitude, timestamp);

    map.setView([latitude, longitude], 13);
}

function displayError(error) {
    const errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    const errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage = errorMessage + "" + error.message;
    }
    let div = document.getElementById("location");
    div.innerHTML = errorMessage;
}

function computeDistance(startCoords, destCoords) {
    let startLatRads = degreesToRadians(startCoords.latitude);
    let startLongRads = degreesToRadians(startCoords.longitude);
    let destLatRads = degreesToRadians(destCoords.latitude);
    let destLongRads = degreesToRadians(destCoords.longitude);
    let Radius = 6371; 

    let distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
        Math.cos(startLatRads) * Math.cos(destLatRads) *
        Math.cos(startLongRads - destLongRads)) * Radius;
    return distance;
}

function degreesToRadians (degrees) {
    let radians = (degrees * Math.PI) / 180;
return radians;
}

function watchLocation() {
    watchId = navigator.geolocation.watchPosition(displayLocation, displayError);
}

function clearWatch() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}

var map = L.map('map').setView([0, 0], 13);
var markersLayer = L.layerGroup().addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

function addLocationMarker(lat, lng, timestamp) {
    var marker = L.marker([lat, lng]).addTo(markersLayer);
    marker.bindPopup("Coordinates: " + lat + ", " + lng + "<br>Timestamp: " + new Date(timestamp).toLocaleString());
}

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(displayLocation);
}

var goToDestinationButton = document.getElementById("go-to-destination");
goToDestinationButton.addEventListener("click", function () {
    var destinationLatInput = document.getElementById("destination-lat").value;
    var destinationLngInput = document.getElementById("destination-lng").value;

    var destinationLat = parseFloat(destinationLatInput);
    var destinationLng = parseFloat(destinationLngInput);

    if (!isNaN(destinationLat) && !isNaN(destinationLng)) {
        map.setView([destinationLat, destinationLng], 18);
    } else {
        alert("Please enter valid destination coordinates.");
    }
});