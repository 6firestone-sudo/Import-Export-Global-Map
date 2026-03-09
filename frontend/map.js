var map = L.map('map').setView([20,0],2);

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
).addTo(map);


// Ports Layer
var portsLayer = L.layerGroup().addTo(map);

// Airports Layer
var airportsLayer = L.layerGroup();

// Ships Layer
var shipsLayer = L.layerGroup();


// Load Ports

fetch("/api/ports")
.then(r=>r.json())
.then(data=>{

data.forEach(p=>{

L.marker([p.lat,p.lng])
.bindPopup("🚢 "+p.name)
.addTo(portsLayer)

})

})


// Load Airports

fetch("/api/airports")
.then(r=>r.json())
.then(data=>{

data.forEach(a=>{

L.circleMarker(
[a.lat,a.lng],
{radius:6,color:"red"}
)
.bindPopup("✈ "+a.name)
.addTo(airportsLayer)

})

})



// Load Ships

setInterval(()=>{

fetch("/api/ships")
.then(r=>r.json())
.then(data=>{

shipsLayer.clearLayers()

data.forEach(ship=>{

L.marker([ship.lat,ship.lon])
.bindPopup(
"🚢 "+ship.name+
"<br>"+ship.destination
)
.addTo(shipsLayer)

})

})

},15000)
