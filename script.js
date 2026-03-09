var map = L.map('map').setView([20,0],2);

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
attribution:'© OpenStreetMap'
}).addTo(map);

var portLayer = L.layerGroup().addTo(map);
var airportLayer = L.layerGroup().addTo(map);

fetch("ports.json")
.then(res => res.json())
.then(data => {

data.forEach(function(port){

var marker = L.marker([port.lat,port.lng])
.bindPopup(
"<b>🚢 Port:</b> "+port.name+
"<br><b>Country:</b> "+port.country
);

portLayer.addLayer(marker);

});

});


fetch("airports.json")
.then(res => res.json())
.then(data => {

data.forEach(function(airport){

var marker = L.circleMarker(
[airport.lat,airport.lng],
{radius:6,color:"red"}
)
.bindPopup(
"<b>✈ Airport:</b> "+airport.name+
"<br><b>Country:</b> "+airport.country
);

airportLayer.addLayer(marker);

});

});


function showPorts(){

map.addLayer(portLayer);
map.removeLayer(airportLayer);

}

function showAirports(){

map.addLayer(airportLayer);
map.removeLayer(portLayer);

}
