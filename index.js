var map = L.map(
  "map",
  L.extend(
    {
      zoom: 15,
      center: [35.6707, 139.7852],
    },
    L.Hash.parseHash(location.hash)
  )
);

L.control
  .layers({
    淡色地図: L.tileLayer(
      "https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",
      {
        attribution:
          "<a href='http://maps.gsi.go.jp/development/ichiran.html'>地理院タイル</a>",
      }
    ).addTo(map),
    標準地図: L.tileLayer(
      "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",
      {
        attribution:
          "<a href='http://maps.gsi.go.jp/development/ichiran.html'>地理院タイル</a>",
      }
    ),
    色別標高図: L.tileLayer(
      "https://cyberjapandata.gsi.go.jp/xyz/relief/{z}/{x}/{y}.png",
      {
        attribution:
          "<a href='http://maps.gsi.go.jp/development/ichiran.html'>地理院タイル</a>",
      }
    ),
    写真: L.tileLayer(
      "https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg",
      {
        attribution:
          "<a href='http://maps.gsi.go.jp/development/ichiran.html'>地理院タイル</a>",
      }
    ),
    OpenStreetMap: L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          "&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors",
      }
    ),
  })
  .addTo(map);

map.zoomControl.setPosition("bottomright");

L.control
  .scale({
    imperial: false,
    metric: true,
  })
  .addTo(map);

L.hash(map);

L.marker(map.getCenter()).addTo(map);
