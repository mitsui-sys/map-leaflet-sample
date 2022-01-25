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

//. 47 都道府県の GeoJSON データを取得
let 
$.ajax({
  url: "./japan.geojson",
  type: "GET",
  success: function (result) {
    if (result && result.features) {
      var jsons = result.features;
      jsons.forEach(function (geojson) {
        var feature = [
          {
            type: "Feature",
            geometry: geojson.geometry,
          },
        ];
        var option = {
          //. なるべく透明に近いスタイルで
          color: "#fff",
          fillColor: "#fff",
          weight: 1,
          opacity: 0.01,
          fillOpacity: 0.01,
        };
        L.geoJson(feature, {
          style: option,
          onEachFeature: function (feature, layer) {
            layer.bindPopup(
              geojson.properties.id + " : " + geojson.properties.nam_ja
            );
          },
        }).addTo(map);
      });
    } else {
    }
  },
  error: function (e0, e1, e2) {
    console.log(e1 + " : " + e2);
  },
});

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
