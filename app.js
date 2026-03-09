var map = L.map('map').setView([20,0],2);

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
).addTo(map);


// LAYERS

var ports = L.layerGroup().addTo(map)
var airports = L.layerGroup()
var ships = L.layerGroup()
var companies = L.layerGroup()

// LOAD PORTS

fetch("data/ports.json")
.then(r=>r.json())
.then(data=>{

data.forEach(p=>{

L.marker([p.lat,p.lng])
.bindPopup("🚢 "+p.name+"<br>"+p.country)
.addTo(ports)

})

})


// LOAD AIRPORTS

fetch("data/airports.json")
.then(r=>r.json())
.then(data=>{

data.forEach(a=>{

L.circleMarker([a.lat,a.lng],
{radius:5,color:"red"})
.bindPopup("✈ "+a.name)
.addTo(airports)

})

})


// LOAD SHIPS

fetch("data/ships.json")
.then(r=>r.json())
.then(data=>{

data.forEach(s=>{

L.marker([s.lat,s.lon])
.bindPopup("🚢 "+s.name+"<br>"+s.destination)
.addTo(ships)

})

})


// LOAD COMPANIES

fetch("data/companies.json")
.then(r=>r.json())
.then(data=>{

data.forEach(c=>{

L.marker([c.lat,c.lng])
.bindPopup(
"<b>"+c.company+"</b>"+
"<br>"+c.product+
"<br>"+c.country
)
.addTo(companies)

})

})



// TOGGLE

function toggleLayer(type){

if(type=="ports"){
toggle(ports)
}

if(type=="airports"){
toggle(airports)
}

if(type=="ships"){
toggle(ships)
}

if(type=="companies"){
toggle(companies)
}

}

function toggle(layer){

if(map.hasLayer(layer)){
map.removeLayer(layer)
}else{
map.addLayer(layer)
}

}
