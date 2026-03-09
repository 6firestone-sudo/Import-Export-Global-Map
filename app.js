var map = L.map('map').setView([20,0],2);

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
).addTo(map);


// layers

var portsLayer = L.layerGroup().addTo(map);
var airportsLayer = L.layerGroup().addTo(map);
var shipsLayer = L.layerGroup().addTo(map);


// PORTS DATA

fetch("ports.json")
.then(r=>r.json())
.then(data=>{

data.forEach(p=>{

L.marker([p.lat,p.lng])
.bindPopup(
"<b>Port:</b>"+p.name+
"<br>Country:"+p.country
)
.addTo(portsLayer)

})

})


// AIRPORT DATA

fetch("airports.json")
.then(r=>r.json())
.then(data=>{

data.forEach(a=>{

L.circleMarker(
[a.lat,a.lng],
{radius:5,color:"red"}
)
.bindPopup(
"<b>Airport:</b>"+a.name+
"<br>"+a.country
)
.addTo(airportsLayer)

})

})


// LIVE SHIPS

function loadShips(){

fetch("ships.json")

.then(r=>r.json())

.then(data=>{

data.forEach(ship=>{

L.marker([ship.lat,ship.lon])
.bindPopup(
"🚢 "+ship.name+
"<br>"+ship.destination
)
.addTo(shipsLayer)

})

})

}

loadShips()




// TOGGLE FUNCTIONS

function togglePorts(){

if(map.hasLayer(portsLayer))
map.removeLayer(portsLayer)
else
map.addLayer(portsLayer)

}

function toggleAirports(){

if(map.hasLayer(airportsLayer))
map.removeLayer(airportsLayer)
else
map.addLayer(airportsLayer)

}

function toggleShips(){

if(map.hasLayer(shipsLayer))
map.removeLayer(shipsLayer)
else
map.addLayer(shipsLayer)

}
