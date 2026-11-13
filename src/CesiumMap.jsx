
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

function CesiumMap() {
  const containerRef = useRef(null)
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

viewer.imageryLayers.addImageryProvider(nasaMarsLayer)

let markerCount = 0

viewer.screenSpaceEventHandler.setInputAction((click) => {
  const position = viewer.camera.pickEllipsoid(
    click.position,
    marsEllipsoid
  )

  if (position) {
    markerCount++
    viewer.entities.add({
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

setPoints((previousPoints) => [
  ...previousPoints,
  {
    id: markerCount,
    latitude: latitude.toFixed(4),
    longitude: longitude.toFixed(4),
  },
])

  }
}, ScreenSpaceEventType.LEFT_CLICK)




    return () => {
      viewer.destroy()
    }
  }, [])

  
  return (
    <div>
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
