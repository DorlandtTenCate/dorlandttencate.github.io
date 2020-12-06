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
      color: '#084',
      fillColor: '#0fa',
      fillOpacity: 0.5,
      radius: Number(record.fields.radius.match(/\((\d+)m\)/)[1]),
      weight: 1,
    }).addTo(map);
  });
}

loadMapData();
