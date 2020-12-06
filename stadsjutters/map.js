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
    const radius = Number(record.fields.radius.match(/\((\d+)m\)/)[1]);
    const colors = { 25: '#102046', 75: '#04283f', 250: '#012524', 500: '#0b1d05' };
    const fillColors = { 25: '#cfdfff', 75: '#d0f0fd', 250: '#c2f5e9', 500: '#d1f7c4' };
    L.circle([record.fields.Latitude, record.fields.Longitude], {
      color: colors[radius],
      fillColor: fillColors[radius],
      fillOpacity: 0.3,
      radius: Number(record.fields.radius.match(/\((\d+)m\)/)[1]),
      stroke: true,
      weight: 1,
    }).addTo(map);
  });
}

loadMapData();
