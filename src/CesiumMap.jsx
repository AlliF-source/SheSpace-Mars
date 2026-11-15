
import { useEffect, useRef, useState } from 'react'
import {
  Viewer,
  ImageryLayer,
  SingleTileImageryProvider,
  UrlTemplateImageryProvider,
  GeographicTilingScheme,
  Ellipsoid,
  ScreenSpaceEventType,
  Math as CesiumMath,
  Cartographic,
  Color,
  Cartesian2,
} from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'

function CesiumMap({ onLocationSelect }) {
  const containerRef = useRef(null)
  const clearRouteRef = useRef(null)
  const undoRouteRef = useRef(null)

const layersRef = useRef({
  viking: null,
  mola: null,
})

const [activeLayer, setActiveLayer] = useState('viking')

  const [coordinates, setCoordinates] = useState(null)
  const [points, setPoints] = useState([])
  const marsEllipsoid = new Ellipsoid(
  3396200,
  3396200,
  3376200
)

  useEffect(() => {
    const viewer = new Viewer(containerRef.current, {
      ellipsoid: marsEllipsoid,
      baseLayer: false,
      baseLayerPicker: false,
      geocoder: false,
      animation: false,
      timeline: false,
    })

    const marsLayer = ImageryLayer.fromProviderAsync(
      SingleTileImageryProvider.fromUrl('/Mars.jpg')
    )

    viewer.imageryLayers.add(marsLayer)

const nasaMarsLayer = new UrlTemplateImageryProvider({
  url: 'https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0/default/default028mm/{z}/{y}/{x}.jpg',
  tilingScheme: new GeographicTilingScheme({
  ellipsoid: marsEllipsoid,
}),
  maximumLevel: 7,
  credit: 'NASA Mars Trek - Viking'
})

const vikingLayer = viewer.imageryLayers.addImageryProvider(nasaMarsLayer)

const molaProvider = new UrlTemplateImageryProvider({
  url: 'https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_ClrShade_merge_global_463m/1.0.0/default/default028mm/{z}/{y}/{x}.jpg',
  tilingScheme: new GeographicTilingScheme({
    ellipsoid: marsEllipsoid,
  }),
  maximumLevel: 7,
  credit: 'NASA Mars Trek - MOLA',
})

const molaLayer = viewer.imageryLayers.addImageryProvider(molaProvider)

molaLayer.show = false

layersRef.current = {
  viking: vikingLayer,
  mola: molaLayer,
}

let markerCount = 0
const routePositions = []
const routeEntities = []


viewer.screenSpaceEventHandler.setInputAction((click) => {
  const position = viewer.camera.pickEllipsoid(
    click.position,
    marsEllipsoid
  )

  if (position) {

    markerCount++
    routePositions.push(position)
    const marker = viewer.entities.add({
      name: `Point ${markerCount}`,
      position: position,
      point: {
        pixelSize: 12,
        color: Color.RED,
        outlineColor: Color.WHITE,
        outlineWidth: 2,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
      },
        label: {
    text: `${markerCount}`,
    font: '16px sans-serif',
    fillColor: Color.WHITE,
    pixelOffset: new Cartesian2(0, -25),
  },
})
routeEntities.push(marker)
    const location = Cartographic.fromCartesian(
      position,
      marsEllipsoid
    )

    const latitude = CesiumMath.toDegrees(
      location.latitude
    )

    const longitude = CesiumMath.toDegrees(
      location.longitude
    )

    
setCoordinates({
  latitude: latitude.toFixed(4),
  longitude: longitude.toFixed(4),
})

onLocationSelect?.({
  latitude: latitude,
  longitude: longitude,
})

setPoints((previousPoints) => [
  ...previousPoints,
  {
    id: markerCount,
    latitude: latitude.toFixed(4),
    longitude: longitude.toFixed(4),
  },
])


if (routePositions.length >= 2) {
  const routeLine = viewer.entities.add({
    name: `Route ${markerCount - 1} to ${markerCount}`,
    polyline: {
      positions: [
        routePositions[routePositions.length - 2],
        routePositions[routePositions.length - 1],
      ],
      width: 4,
      material: Color.YELLOW,
    },
  })
  routeEntities.push(routeLine)
}


  }
}, ScreenSpaceEventType.LEFT_CLICK)




clearRouteRef.current = () => {
  routeEntities.forEach((entity) => {
    viewer.entities.remove(entity)
  })

  routeEntities.length = 0
  routePositions.length = 0
  markerCount = 0

  setCoordinates(null)
  setPoints([])
}

undoRouteRef.current = () => {
  if (routePositions.length === 0) return

  if (routePositions.length >= 2) {
    const lastLine = routeEntities.pop()
    viewer.entities.remove(lastLine)
  }

  const lastMarker = routeEntities.pop()
  viewer.entities.remove(lastMarker)

  routePositions.pop()
  markerCount--

  setPoints((previousPoints) => previousPoints.slice(0, -1))
  setCoordinates(null)
}

    return () => {
      viewer.destroy()
    }
  }, [])


const changeLayer = (layerName) => {
  const layers = layersRef.current

  if (!layers.viking || !layers.mola) {
    return
  }

  layers.viking.show = layerName === 'viking'
  layers.mola.show = layerName === 'mola'

  setActiveLayer(layerName)
}
  
  return (
    <div>

    <div style={{ marginBottom: '15px' }}>
      <h3>Mars Map Layers</h3>

      <button
        className="map-btn layer-btn"
        onClick={() => changeLayer('viking')}
        disabled={activeLayer === 'viking'}
      >
        Viking Imagery
      </button>

      <button
        className="map-btn layer-btn"
        onClick={() => changeLayer('mola')}
        disabled={activeLayer === 'mola'}
      >
        MOLA Topography
      </button>
    </div>

    <div style={{ marginBottom: '15px' }}>
    <div className="map-controls">
  <button
    className="map-btn clear-btn"
    onClick={() => clearRouteRef.current?.()}
  >
     Clear Route
  </button>

  <button
    className="map-btn clear-btn"
    onClick={() => undoRouteRef.current?.()}
  >
    Undo Last Point
  </button>

</div>
    </div>
      <div
        ref={containerRef}
        style={{ width: '100%', height: '500px' }}
      />

      <div>
        <h3>Selected Location</h3>

        {coordinates ? (
          <p>
            Latitude: {coordinates.latitude}°
            <br />
            Longitude: {coordinates.longitude}°
          </p>
        ) : (
          <p>Click anywhere on Mars to see coordinates.</p>
        )}
      </div>
      
<div>
  <h3>Selected Points</h3>

  {points.length === 0 ? (
    <p>No points selected yet.</p>
  ) : (
    <ul>
      {points.map((point) => (
        <li key={point.id}>
          Point {point.id}:
          Latitude {point.latitude}°,
          Longitude {point.longitude}°
        </li>
      ))}
    </ul>
  )}
</div>
    </div>
  )
}

export default CesiumMap
