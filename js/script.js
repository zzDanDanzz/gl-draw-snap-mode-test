let map;
// copied from https://docs.mapbox.com/mapbox-gl-js/example/mapbox-gl-rtl-text/
mapboxgl.setRTLTextPlugin(
  "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
  null,
  true // Lazy load the plugin
);

function initializeMap() {
  map = new mapboxgl.Map({
    container: "map",
    // tiles for the base map
    style: "https://dev.map.ir/vector/styles/main/mapir-xyz-light-style.json",
    center: [51.404887883449874, 35.703222244402],
    zoom: 12,
    hash: true,
    transformRequest: (url) => {
      // add api key to header when requesting base map tiles
      if (url.startsWith("https://map.ir")) {
        return {
          url,
          headers: {
            // YOUR API KEY
            "x-api-key":
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijk2Y2YyNDVhOTMzMWRkYWQ2MDkwZjJmYzg4Y2VjOWU2YWYzNDgwYjRhMGJkN2Q5OGJhMWNmOThkYTlhZTBkMjY3MzgxYWJhYWU0NzYwOGYwIn0.eyJhdWQiOiIzODUiLCJqdGkiOiI5NmNmMjQ1YTkzMzFkZGFkNjA5MGYyZmM4OGNlYzllNmFmMzQ4MGI0YTBiZDdkOThiYTFjZjk4ZGE5YWUwZDI2NzM4MWFiYWFlNDc2MDhmMCIsImlhdCI6MTY4NjQ2OTYyNSwibmJmIjoxNjg2NDY5NjI1LCJleHAiOjE2ODkwNjE2MjUsInN1YiI6IiIsInNjb3BlcyI6WyJiYXNpYyJdfQ.E7EHynfAvu5SCFtdg23ZSnxuPJfEy2MdIoMyRLg-HZ02FxdL9h3j9uUJ70B9MIXHSNdGQRMHNYKznUO5s22lMQop3dBM2mlr6gnOp8aA5KnfgePewOhJisHyAPRbBVBLVwT-IHvxzK6LUYaAP-UFqFiEjmkVtyJs2ue030Ly17xwwONS-n-ikxNSznvYEh_9VK7U_Lp3_V0Ny4u06TpJocV3DzMuAoAz4HVeNGAh9ltt6kxHveiKFGZDQdbqmMD2hKJUNddk-7ps2RMhtvGT-DRAtZ5q5CSdbKR08MDmkWw0th5Gnuw93QHTwGQl1GJrdED2t5Aj9UyYqZLzZRHAnA",
          },
        };
      }

      return {
        url,
      };
    },
  });

  map.on("load", initializeGlDraw);
}

function initializeGlDraw() {
  const draw = new MapboxDraw({
    modes: {
      ...MapboxDraw.modes,
      draw_point: mapboxGlDrawSnapMode.SnapPointMode,
      draw_polygon: mapboxGlDrawSnapMode.SnapPolygonMode,
      draw_line_string: mapboxGlDrawSnapMode.SnapLineMode,
      direct_select: mapboxGlDrawSnapMode.SnapDirectSelect,
    },
    styles: mapboxGlDrawSnapMode.SnapModeDrawStyles,
    userProperties: true,
    snap: false,
    guides: false,
  });

  map.addControl(draw, "top-right");

  const SnapOptionsBar = new ExtendDrawBarCheckboxes({
    draw: draw,
    checkboxes: [
      {
        on: "change",
        action: (e) => {
          draw.options.snap = e.target.checked;
        },
        classes: ["snap_mode", "snap"],
        title: "Snap when Draw",
        // initialState: "checked",
      },
    ],
  });

  map.addControl(SnapOptionsBar, "top-right");
}

initializeMap();
