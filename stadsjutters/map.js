async function loadMapData() {
  const map = L.map('map').setView([51.59, 4.78], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.stadsjuttersbreda.nl">Stadsjutters Breda</a> | <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(map);

  // show the scale bar on the lower left corner
  L.control.scale().addTo(map);

  const res = await fetch('https://stadsjuttersbreda.pelle.workers.dev/');
  const json = await res.json();

  json.records.forEach((record) => {
    L.circle([record.fields.Latitude, record.fields.Longitude], {
      color: '#0b1d05',
      fillColor: '#d1f7c4',
      fillOpacity: 0.3,
      radius: 100,
      stroke: true,
      weight: 1,
    }).addTo(map);
  });
}

loadMapData();
