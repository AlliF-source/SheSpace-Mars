
import { useEffect, useRef } from 'react'
import {
  Viewer,
  ImageryLayer,
  SingleTileImageryProvider,
  UrlTemplateImageryProvider,
  GeographicTilingScheme,
} from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'

function CesiumMap() {
  const containerRef = useRef(null)

  useEffect(() => {
    const viewer = new Viewer(containerRef.current, {
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
  tilingScheme: new GeographicTilingScheme(),
  maximumLevel: 7,
  credit: 'NASA Mars Trek - Viking'
})

viewer.imageryLayers.addImageryProvider(nasaMarsLayer)


    return () => {
      viewer.destroy()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '500px' }}
    />
  )
}

export default CesiumMap
