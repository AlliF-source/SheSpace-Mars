


import { useEffect, useState } from 'react'
import './EnvironmentalData.css'


function EnvironmentalData({ selectedLocation }) {

  const [temperatureData, setTemperatureData] = useState(null)
  const [elevationData, setElevationData] = useState(null)
  const [radiationData, setRadiationData] = useState(null)

    useEffect(() => {
    fetch('/science-data/temperatura-marte.csv')

        .then((response) => {
          if (!response.ok) {
            throw new Error('No se pudo cargar el CSV de NASA')
          }

          return response.text()
        })
        
.then((csvText) => {
  const lines = csvText.trim().split(/\r?\n/)
  const headers = lines[0].split(',')

  const temperatureIndex = headers.indexOf('ATS_LOCAL_TEMP1')

  if (temperatureIndex === -1) {
    throw new Error('No se encontró el sensor ATS_LOCAL_TEMP1')
  }

  const temperatures = lines
    .slice(1)
    .map((line) => {
      const columns = line.split(',')
      const kelvin = Number(columns[temperatureIndex])

      return kelvin - 273.15
    })
    .filter((temperature) =>
      Number.isFinite(temperature) &&
      temperature > -150 &&
      temperature < 50
    )

        if (temperatures.length === 0) {
          throw new Error('No se encontraron temperaturas válidas')
        }

        const minimum = Math.min(...temperatures)
        const maximum = Math.max(...temperatures)

        const sum = temperatures.reduce(
          (total, temperature) => total + temperature,
          0
        )

        const average = sum / temperatures.length

        setTemperatureData({
          average: average.toFixed(2),
          minimum: minimum.toFixed(2),
          maximum: maximum.toFixed(2),
        })
      })

        .catch((error) => {
          console.error('Error al cargar temperaturas:', error)
        })
    }, [])

    useEffect(() => {
      fetch('/science-data/megt90n000cb.img')
        .then((response) => {
          if (!response.ok) {
            throw new Error('No se pudo cargar el archivo MOLA')
          }

          return response.arrayBuffer()
        })
        
        .then((buffer) => {
          if (buffer.byteLength !== 720 * 1440 * 2) {
            throw new Error('El tamaño del archivo MOLA es incorrecto')
          }

          const view = new DataView(buffer)

          const latitude = selectedLocation?.latitude ?? 18.44
          const longitude = selectedLocation?.longitude ?? 77.45
          console.log('Coordenadas recibidas:', latitude, longitude)

          const row = Math.floor((90 - latitude) * 4)
          
          const normalizedLongitude = ((longitude % 360) + 360) % 360
          const column = Math.floor(normalizedLongitude * 4)

          const index = (row * 1440 + column) * 2

          const elevation = view.getInt16(index, false)

          console.log('Elevación MOLA de prueba:', elevation, 'm')

          setElevationData(elevation)

        })

        .catch((error) => {
          console.error('Error al cargar MOLA:', error)
        })

        }, [selectedLocation])


useEffect(() => {
  fetch('/science-data/radiacion-marte.csv')
    .then((response) => {
      if (!response.ok) {
        throw new Error('No se pudo cargar el CSV de radiación')
      }

      return response.text()
    })
    .then((csvText) => {
      const lines = csvText.trim().split(/\r?\n/)

      console.log('CSV de radiación recibido')
      console.log('Encabezados:', lines[0])
    
      const headerIndex = lines.findIndex((line) =>
        line.startsWith('EPOCH_')
      )


    console.log('Posición de los encabezados:', headerIndex)
    console.log('Encabezados encontrados:', lines[headerIndex])
    console.log('Primeros datos:', lines.slice(headerIndex + 1, headerIndex + 4))

    const headers = lines[headerIndex].split(',')

    const radiationIndex = headers.indexOf(
      'RTG_CORRECTED_DOSE_B_uGray/day_(good_Q)'
    )

    console.log('Índice de radiación:', radiationIndex)

    if (radiationIndex === -1) {
      throw new Error('No se encontró la columna de radiación')
    }

    const radiationValues = lines
      .slice(headerIndex + 1)
      .filter((line) => line.trim() !== '' && !line.startsWith('#'))
      .map((line) => {
        const columns = line.split(',')
        return Number(columns[radiationIndex]?.trim())
      })
      .filter((value) => Number.isFinite(value) && value > 0 && value < 100000)

    if (radiationValues.length === 0) {
      throw new Error('No se encontraron mediciones válidas')
    }

    const minimum = Math.min(...radiationValues)
    const maximum = Math.max(...radiationValues)

    const sum = radiationValues.reduce(
      (total, value) => total + value,
      0
    )

    const average = sum / radiationValues.length

    setRadiationData({
      average: average.toFixed(2),
      minimum: minimum.toFixed(2),
      maximum: maximum.toFixed(2),
    })

    })
    .catch((error) => {
      console.error('Error al cargar radiación:', error)
    })
}, [])


  return (
    
    <section className="environmental-panel">
      <h3>Martian Environmental Data</h3>

      <p>
        Explore scientific information about the
        environmental conditions on Mars.
      </p>

      <div className="environmental-cards">
        <article className="environmental-card">
          <h4>Temperature</h4>
                
      {temperatureData ? (
        <>
          <p><strong>{temperatureData.average} °C</strong></p>
          <p>Min: {temperatureData.minimum} °C</p>
          <p>Max: {temperatureData.maximum} °C</p>
        </>
      ) : (
        <p>Loading temperature data...</p>
      )}

          <span>Jezero Crater · Sol 1859</span>
          <span>May 13–14, 2026</span>
          <span>NASA MEDA · ATS Sensor 1</span>
          <span>Historical measurements</span>
        </article>
                
        <article className="environmental-card">
          <h4>Elevation</h4>

          {elevationData !== null ? (
            <p><strong>{elevationData} m</strong></p>
          ) : (
            <p>Loading elevation data...</p>
          )}

          <span>
            {selectedLocation ? 'Selected Location' : 'Jezero Crater'}
          </span>

          <span>
            Latitude: {(selectedLocation?.latitude ?? 18.44).toFixed(4)}°
          </span>

          <span>
            Longitude: {(selectedLocation?.longitude ?? 77.45).toFixed(4)}°
          </span>
          
          <span>NASA MOLA · MEGDR</span>
          <span>0.25° grid resolution</span>
        </article>

        <article className="environmental-card">
          <h4>Radiation</h4>

          {radiationData ? (
            <>
              <p><strong>{radiationData.average} µGy/day</strong></p>
              <p>Min: {radiationData.minimum} µGy/day</p>
              <p>Max: {radiationData.maximum} µGy/day</p>
            </>
          ) : (
            <p>Loading radiation data...</p>
          )}

          <span>Gale Crater · Curiosity</span>
          <span>January 1, 2024</span>
          <span>NASA RAD · Detector B</span>
          <span>MMRTG-corrected · Historical measurements</span>
          <span>Absorbed dose rate · Not real-time</span>
        </article>

      </div>
    </section>
  )
}

export default EnvironmentalData
