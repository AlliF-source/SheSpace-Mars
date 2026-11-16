/*
PROYECTO: SHE SPACE
DESAFÍO: NASA Space Apps Challenge 2026

RECONOCIMIENTO DE INTELIGENCIA ARTIFICIAL:
Se utilizó ChatGPT como herramienta de apoyo
para la programación, revisión y resolución de
problemas del código React y JavaScript.

El desarrollo, adaptación y validación del
prototipo corresponden al equipo SHE SPACE.
*/
import { useState } from 'react'
import './App.css'
import CesiumMap from './CesiumMap'
import EnvironmentalData from './EnvironmentalData'


function App() {
  const [language, setLanguage] = useState('ES')
  const [selectedMarsLocation, setSelectedMarsLocation] = useState(null)
  const [mostrarMarte, setMostrarMarte] = useState(false)
  const [mostrarCiencia, setMostrarCiencia] = useState(false)
  const [mostrarSeguridad, setMostrarSeguridad] = useState(false)
  const [mostrarMapa, setMostrarMapa] = useState(false)
  
  const content = {
    ES: {
      inicio: 'Inicio',
      mapa: 'Mapa',
      tituloMapa: 'Explora Marte',
      tarjeta2: 'EXPLORA EL CRÁTER GALE',
      texto2: 'Conoce uno de los lugares más fascinantes de Marte.',
      mision: 'Misión',
      integrantes: 'Integrantes',
      informacion: 'Información',
      etiqueta: 'NASA SPACE APPS CHALLENGE 2026',
      titulo: '¡VÁMONOS',
      planeta: 'A MARTE!',
      subtitulo: 'EXPLORA. DESCUBRE. APRENDE.',
      descripcion: 'Prepárate para una aventura extraordinaria. Descubre el planeta rojo, explora sus paisajes y conoce los secretos de Marte.',
      boton: 'INICIAR MISIÓN',
      saludo: '¡Hola, explorador!',
      tarjetas: 'UN UNIVERSO POR DESCUBRIR',
      descripcionTarjetas: 'Tu aventura espacial comienza aquí.',
      tarjeta1: 'CONOCE MARTE',
      texto1: 'Descubre el planeta rojo y sus características.',
      tarjeta3: 'CENTRO CIENTÍFICO',
      texto3: 'Descubre los datos y avances de la exploración espacial.',
      tarjeta4: 'SEGURIDAD ASTRONAUTA',
      texto4: 'Conoce cómo se preparan los exploradores espaciales.',
      descubrir: 'DESCUBRIR',
      noticias: 'ÚLTIMAS NOTICIAS',
      noticia: 'El futuro de la exploración comienza aquí.',
      newsBadge: '✦ SHE SPACE TRANSMISIÓN',
      newsDescription: 'Descubre las novedades de la exploración espacial y acompáñanos en nuestra aventura hacia Marte.',
      equipo: 'EL EQUIPO DETRÁS DE LA MISIÓN',
      textoEquipo: 'Conoce a quienes hacen posible esta aventura.',
      pendiente: 'Nuestro equipo se está preparando para despegar.',
      crew: 'NUESTRA TRIPULACIÓN · 2026',
      pie: 'EXPLORANDO NUEVOS HORIZONTES',
      volver: '← SALIR Y VOLVER AL INICIO',

      marsLabel: 'SHE SPACE · GUÍA DE MARTE',
      marsTitulo: 'CONOCE MARTE',
      marsDescripcion: 'Descubre ocho curiosidades fascinantes sobre Marte.',
      mars1: 'MONTE OLIMPO',
      mars1Texto: 'Es el volcán más grande conocido del sistema solar.',
      mars2: 'DOS PEQUEÑAS LUNAS',
      mars2Texto: 'Marte tiene dos satélites naturales llamados Fobos y Deimos.',
      mars3: 'UN PLANETA MUY FRÍO',
      mars3Texto: 'Su temperatura puede llegar hasta los -125 °C.',
      mars4: 'ATARDECERES AZULES',
      mars4Texto: 'Aunque Marte es rojo, sus atardeceres pueden verse azules.',
      mars5: 'GRAVEDAD REDUCIDA',
      mars5Texto: 'Su gravedad equivale aproximadamente al 37 % de la terrestre.',
      mars6: 'TORMENTAS GIGANTES',
      mars6Texto: 'Sus tormentas de polvo pueden cubrir todo el planeta durante semanas.',
      mars7: 'UN LARGO VIAJE',
      mars7Texto: 'Viajar desde la Tierra hasta Marte dura aproximadamente entre 6 y 9 meses.',
      mars8: '¿POR QUÉ ES ROJO?',
      mars8Texto: 'Su color se debe al óxido de hierro presente en su superficie.',

      scienceLabel: 'SHE SPACE · CIENCIA ESPACIAL',
      scienceTitulo: 'CENTRO CIENTÍFICO',
      scienceDescripcion: 'Descubre las misiones que hicieron historia en la exploración de Marte.',
      science1: '01 · PERSEVERANCE (2021)',
      science1Texto: 'Llegó a Marte para buscar señales de vida antigua y recoger muestras de rocas.',
      science2: '02 · CURIOSITY (2012)',
      science2Texto: 'Encontró pruebas de que Marte pudo tener condiciones adecuadas para la vida.',
      science3: '03 · INGENUITY (2021)',
      science3Texto: 'Fue el primer aparato en realizar vuelos controlados en otro planeta.',
      science4: '04 · VIKING 1 (1976)',
      science4Texto: 'Fue una de las primeras misiones en aterrizar con éxito en Marte.',

      securityLabel: 'SHE SPACE · SEGURIDAD ESPACIAL',
      securityTitulo: 'SEGURIDAD ASTRONAUTA',
      securityDescripcion: 'Conoce cómo se preparan los exploradores espaciales para sobrevivir y trabajar en el espacio.',
      security1: '01 · TRAJES ESPACIALES',
      security1Texto: 'Les proporcionan oxígeno y los protegen del frío, el calor y el polvo.',
      security2: '02 · AIRE Y AGUA',
      security2Texto: 'Las naves tienen sistemas especiales que limpian y reciclan el aire y el agua.',
      security3: '03 · PROTECCIÓN CONTRA LA RADIACIÓN',
      security3Texto: 'Utilizan materiales protectores y sistemas para controlar la exposición a la radiación.',
      security4: '04 · EJERCICIO DIARIO',
      security4Texto: 'Hacen ejercicios para mantener fuertes sus músculos y huesos.',
      security5: '05 · ENTRENAMIENTO DE EMERGENCIA',
      security5Texto: 'Practican cómo actuar ante incendios, fallas y otros peligros.',
      security6: '06 · ALIMENTACIÓN',
      security6Texto: 'Comen frutas, verduras, arroz, pasta, pollo y alimentos especiales para el espacio.'
    },

    EN: {
      inicio: 'Home',
      mapa: 'Map',
      tituloMapa: 'Explore Mars',
      tarjeta2: 'EXPLORE GALE CRATER',
      texto2: 'Learn about one of the most fascinating places on Mars.',
      mision: 'Mission',
      integrantes: 'Team',
      informacion: 'Information',
      etiqueta: 'NASA SPACE APPS CHALLENGE 2026',
      titulo: 'LET’S GO',
      planeta: 'TO MARS!',
      subtitulo: 'EXPLORE. DISCOVER. LEARN.',
      descripcion: 'Get ready for an extraordinary adventure. Discover the red planet, explore its landscapes and learn the secrets of Mars.',
      boton: 'START MISSION',
      saludo: 'Hello, explorer!',
      destino: 'DESTINATION: MARS',
      tarjetas: 'A UNIVERSE TO DISCOVER',
      descripcionTarjetas: 'Your space adventure starts here.',
      tarjeta1: 'DISCOVER MARS',
      texto1: 'Discover the red planet and its features.',
      tarjeta3: 'SCIENCE CENTER',
      texto3: 'Discover space exploration data and advances.',
      tarjeta4: 'ASTRONAUT SAFETY',
      texto4: 'Learn how space explorers prepare for their missions.',
      descubrir: 'DISCOVER',
      noticias: 'LATEST NEWS',
      noticia: 'The future of exploration starts here.',
      newsBadge: '✦ SHE SPACE TRANSMISSION',
      newsDescription: 'Discover the latest space exploration updates and join us on our adventure to Mars.',
      equipo: 'THE TEAM BEHIND THE MISSION',
      textoEquipo: 'Meet the people making this adventure possible.',
      rolMecatronica: 'Mechatronics Engineering Student',
      rolPrimaria: 'Elementary School Student',
      rolInformatica: 'Computer Engineering Student',
      etiquetaMentora: 'MENTOR',
      tituloMentora: 'Licentiate Degree in Computer Engineering with an Emphasis in Software Development',
      pendiente: 'Our team is getting ready for takeoff.',
      crew: 'OUR CREW · 2026',
      pie: 'EXPLORING NEW HORIZONS',
      volver: '← EXIT AND RETURN HOME',

      marsLabel: 'SHE SPACE · MARS GUIDE',
      marsTitulo: 'DISCOVER MARS',
      marsDescripcion: 'Discover eight fascinating facts about Mars.',
      mars1: 'OLYMPUS MONS',
      mars1Texto: 'It is the largest known volcano in the solar system.',
      mars2: 'TWO SMALL MOONS',
      mars2Texto: 'Mars has two natural satellites called Phobos and Deimos.',
      mars3: 'A VERY COLD PLANET',
      mars3Texto: 'Its temperature can drop to -125 °C.',
      mars4: 'BLUE SUNSETS',
      mars4Texto: 'Although Mars is red, its sunsets can appear blue.',
      mars5: 'LOWER GRAVITY',
      mars5Texto: 'Its gravity is approximately 37% of Earth’s gravity.',
      mars6: 'GIANT DUST STORMS',
      mars6Texto: 'Dust storms can cover the entire planet for weeks.',
      mars7: 'A LONG JOURNEY',
      mars7Texto: 'Traveling from Earth to Mars takes approximately 6 to 9 months.',
      mars8: 'WHY IS IT RED?',
      mars8Texto: 'Its color comes from iron oxide on its surface.',

      scienceLabel: 'SHE SPACE · SPACE SCIENCE',
      scienceTitulo: 'SCIENCE CENTER',
      scienceDescripcion: 'Discover the missions that made history in Mars exploration.',
      science1: '01 · PERSEVERANCE (2021)',
      science1Texto: 'It arrived on Mars to search for signs of ancient life and collect rock samples.',
      science2: '02 · CURIOSITY (2012)',
      science2Texto: 'It found evidence that Mars may once have had conditions suitable for life.',
      science3: '03 · INGENUITY (2021)',
      science3Texto: 'It was the first aircraft to make controlled flights on another planet.',
      science4: '04 · VIKING 1 (1976)',
      science4Texto: 'It was one of the first successful missions to land on Mars.',

      securityLabel: 'SHE SPACE · SPACE SAFETY',
      securityTitulo: 'ASTRONAUT SAFETY',
      securityDescripcion: 'Discover how space explorers prepare to survive and work in space.',
      security1: '01 · SPACE SUITS',
      security1Texto: 'They provide oxygen and protect astronauts from cold, heat and dust.',
      security2: '02 · AIR AND WATER',
      security2Texto: 'Spacecraft have special systems that clean and recycle air and water.',
      security3: '03 · RADIATION PROTECTION',
      security3Texto: 'They use protective materials and systems to control radiation exposure.',
      security4: '04 · DAILY EXERCISE',
      security4Texto: 'Astronauts exercise to keep their muscles and bones strong.',
      security5: '05 · EMERGENCY TRAINING',
      security5Texto: 'They practice how to respond to fires, failures and other hazards.',
      security6: '06 · NUTRITION',
      security6Texto: 'They eat fruits, vegetables, rice, pasta, chicken and special space foods.'
    }
  }

  const t = content[language]

  const volverInicio = () => {
    setMostrarMarte(false)
    setMostrarCiencia(false)
    setMostrarSeguridad(false)
    window.scrollTo(0, 0)
  }

  const cards = [
    { icon: '🌎', number: '01', title: t.tarjeta1, text: t.texto1, open: () => setMostrarMarte(true) },
    { icon: '🧪', number: '02', title: t.tarjeta3, text: t.texto3, open: () => setMostrarCiencia(true) },
    { icon: '🚀', number: '03', title: t.tarjeta4, text: t.texto4, open: () => setMostrarSeguridad(true) }
  ]
  
  if (mostrarMapa) {
    return (
      <main className="home">
        <section id="mapa">
          <div className="section-heading">
            <h2>{t.tituloMapa}</h2>
          </div>

          <div className="map-controls">
            <button
              type="button"
              className="map-btn"
              onClick={() => setMostrarMapa(false)}
            >
              {language === 'ES' ? 'Volver al inicio' : 'Back to home'}
            </button>
          </div>
          
          <CesiumMap onLocationSelect={setSelectedMarsLocation} />
          <EnvironmentalData selectedLocation={selectedMarsLocation} />


        </section>
      </main>
    )
  }
  return (
    <main
      className={
        mostrarMarte
          ? 'home mars-open'
          : mostrarCiencia
          ? 'home science-open'
          : mostrarSeguridad
          ? 'home security-open'
          : 'home'
      }
      id="inicio"
    >

      {/* ENCABEZADO */}
      <header className="navbar">

        <a href="#inicio" className="brand">
          <img src="/images/logo-she-space.jpeg" alt="SHE SPACE" />
          <span>SHE <strong>SPACE</strong></span>
        </a>

        <nav className="navigation">
          <a href="#inicio">
            <span className="nav-icon">⌂</span>
            {t.inicio}
          </a>

         

          <a
            href="#mapa"
            onClick={(event) => {
              event.preventDefault()
              setMostrarMapa(true)
            }}
          >
            <span className="nav-icon">🚀</span>
            {t.mision}
          </a>

          <a href="#integrantes">
            <span className="nav-icon">♙</span>
            {t.integrantes}
          </a>

          <a
            href="#seguridad"
            onClick={(event) => {
              event.preventDefault()
              setMostrarSeguridad(true)
              window.scrollTo(0, 0)
            }}
          >
            <span className="nav-icon">ⓘ</span>
            {t.informacion}
          </a>
        </nav>

        <div className="language">
          <button
            className={language === 'ES' ? 'active' : ''}
            onClick={() => setLanguage('ES')}
          >
            ES
          </button>
          <span>|</span>
          <button
            className={language === 'EN' ? 'active' : ''}
            onClick={() => setLanguage('EN')}
          >
            EN
          </button>
        </div>

      </header>

      {/* PORTADA PRINCIPAL */}
<section className="hero" id="mision">

  <div className="mascot-container">
    <div className="mascot-glow"></div>

    <img
      className="mascot"
      src="/images/pulpo-astronauta.png"
      alt="Pulpo astronauta de SHE SPACE"
    />

    <span className="ai-image-label">
  ✦ REDISEÑADO CON IA
</span>

    <p className="mascot-caption">{t.saludo}</p>
  </div>

        <div className="hero-content">

          <h1>
            {t.titulo}
            <span>{t.planeta}</span>
          </h1>

          <h2>{t.subtitulo}</h2>

          <a
          href="#mapa"
          className="main-button"
          onClick={(event) => {
            event.preventDefault()
            setMostrarMapa(true)
          }}
        >
          <span className="button-rocket">🚀</span>
          {t.boton}
          <span className="button-arrow">↗</span>
        </a>

          <p className="hero-note">{t.destino}</p>

        </div>
      </section>

      {/* TARJETAS INFERIORES */}
      <section className="mission-section" id="explorar">

        <div className="section-heading">
          <p className="eyebrow">SHE SPACE</p>
          <h2>{t.tarjetas}</h2>
          <p>{t.descripcionTarjetas}</p>
        </div>

        <div className="cards">

          {cards.map((card) => (
            <article className="mission-card" key={card.number}>

              <span className="card-number">{card.number}</span>

              <div className="card-icon">{card.icon}</div>

              <h3>{card.title}</h3>

              <p>{card.text}</p>

              {card.link ? (
                <a href={card.link} className="discover-button">
                  {t.descubrir} ↗
                </a>
              ) : (
                <button type="button" onClick={card.open} className="discover-button">
                  {t.descubrir} ↗
                </button>
              )}
            </article>
          ))}

        </div>
      </section>

      {/* NOTICIAS */}
      <section className="news-section" id="noticias">

        <div className="news-content">
          <span className="news-badge">{t.newsBadge}</span>

          <p className="eyebrow">{t.noticias}</p>

          <h2>{t.noticia}</h2>

          <div className="news-line"></div>

          <p className="news-description">
            {t.newsDescription}
          </p>
        </div>

      </section>

      

{/* EQUIPO */}
<section className="team-section" id="integrantes">

  <div className="section-heading">
    <p className="eyebrow">✦ SHE SPACE TEAM ✦</p>
    <h2>{t.equipo}</h2>
    <p>{t.textoEquipo}</p>
  </div>

  <div className="team-container">

    {/* INTEGRANTE 1 */}
    <div className="team-card">
      <img
        src="/images/FOTO-ALLISSON.jpeg"
        alt="Allisson Paulina Fox Zuñiga"
      />

      <div className="team-info">
        <h3>ALLISSON PAULINA FOX ZUÑIGA</h3>
        <p>Estudiante de Ingeniería Mecatrónica</p>
      </div>
    </div>

    {/* INTEGRANTE 2 */}
    <div className="team-card">
      <img
        src="/images/FOTO-SOFI.jpeg"
        alt="Sofia Quesada Paniagua"
      />

      <div className="team-info">
        <h3>SOFIA QUESADA PANIAGUA</h3>
        <p>Estudiante de Primaria</p>
      </div>
    </div>

    {/* INTEGRANTE 3 */}
    <div className="team-card">
      <img
        src="/images/FOTO-FRAN.jpeg"
        alt="Francini Gabriela González Quirós"
      />

      <div className="team-info">
        <h3>FRANCINI GABRIELA GONZÁLEZ QUIRÓS</h3>
        <p>Estudiante de Ingeniería Informática</p>
      </div>
    </div>

 {/* MENTORA */}
<div className="team-card mentor-card">
  <img
    src="/images/FOTO- ALYSON.jpeg"
    alt="Mentora de SHE SPACE"
  />

  <div className="team-info">
    <span className="team-role">MENTORA</span>
    <h3>Allyson Patricia Sandi Chaves</h3>
    <p>Lic. Ingeniería informática con enfacis en desarrollo de software</p>
  </div>
</div>

  </div>

</section>

      {/* PIE DE PÁGINA */}
      <footer className="footer">
        <p>SHE SPACE © 2026</p>
        <p>{t.pie}</p>
      </footer>

      {/* INFORMACIÓN DE MARTE */}
      {mostrarMarte && (
        <section className="mars-info-section" id="marte">

          <p className="mars-label">{t.marsLabel}</p>
          <h1>{t.marsTitulo}</h1>
          <p className="mars-description">{t.marsDescripcion}</p>

          <div className="mars-facts">

            <article className="mars-fact-card">
              <span>🌋</span>
              <h3>{t.mars1}</h3>
              <p>{t.mars1Texto}</p>
            </article>

            <article className="mars-fact-card">
              <span>🌙</span>
              <h3>{t.mars2}</h3>
              <p>{t.mars2Texto}</p>
            </article>

            <article className="mars-fact-card">
              <span>❄️</span>
              <h3>{t.mars3}</h3>
              <p>{t.mars3Texto}</p>
            </article>

            <article className="mars-fact-card">
              <span>🌅</span>
              <h3>{t.mars4}</h3>
              <p>{t.mars4Texto}</p>
            </article>

            <article className="mars-fact-card">
              <span>🧲</span>
              <h3>{t.mars5}</h3>
              <p>{t.mars5Texto}</p>
            </article>

            <article className="mars-fact-card">
              <span>🌪️</span>
              <h3>{t.mars6}</h3>
              <p>{t.mars6Texto}</p>
            </article>

            <article className="mars-fact-card">
              <span>🚀</span>
              <h3>{t.mars7}</h3>
              <p>{t.mars7Texto}</p>
            </article>

            <article className="mars-fact-card">
              <span>🔴</span>
              <h3>{t.mars8}</h3>
              <p>{t.mars8Texto}</p>
            </article>

          </div>

          <button className="discover-button" onClick={volverInicio}>
            {t.volver}
          </button>

        </section>
      )}

      {/* CENTRO CIENTÍFICO */}
      {mostrarCiencia && (
        <section className="science-info-section" id="ciencia">

          <p className="science-label">{t.scienceLabel}</p>
          <h1>{t.scienceTitulo}</h1>
          <p className="science-description">{t.scienceDescripcion}</p>

          <div className="science-facts">

            <article className="science-fact-card">
              <span>🤖</span>
              <h3>{t.science1}</h3>
              <p>{t.science1Texto}</p>
            </article>

            <article className="science-fact-card">
              <span>🔭</span>
              <h3>{t.science2}</h3>
              <p>{t.science2Texto}</p>
            </article>

            <article className="science-fact-card">
              <span>🚁</span>
              <h3>{t.science3}</h3>
              <p>{t.science3Texto}</p>
            </article>

            <article className="science-fact-card">
              <span>🛰️</span>
              <h3>{t.science4}</h3>
              <p>{t.science4Texto}</p>
            </article>

          </div>

          <button className="discover-button" onClick={volverInicio}>
            {t.volver}
          </button>

        </section>
      )}

      {/* SEGURIDAD ASTRONAUTA */}
      {mostrarSeguridad && (
        <section className="security-info-section" id="seguridad">

          <p className="security-label">{t.securityLabel}</p>
          <h1>{t.securityTitulo}</h1>
          <p className="security-description">{t.securityDescripcion}</p>

          <div className="security-facts">

            <article className="security-fact-card">
              <span>🧑‍🚀</span>
              <h3>{t.security1}</h3>
              <p>{t.security1Texto}</p>
            </article>

            <article className="security-fact-card">
              <span>💧</span>
              <h3>{t.security2}</h3>
              <p>{t.security2Texto}</p>
            </article>

            <article className="security-fact-card">
              <span>☢️</span>
              <h3>{t.security3}</h3>
              <p>{t.security3Texto}</p>
            </article>

            <article className="security-fact-card">
              <span>🏋️</span>
              <h3>{t.security4}</h3>
              <p>{t.security4Texto}</p>
            </article>

            <article className="security-fact-card">
              <span>🚨</span>
              <h3>{t.security5}</h3>
              <p>{t.security5Texto}</p>
            </article>

            <article className="security-fact-card">
              <span>🍎</span>
              <h3>{t.security6}</h3>
              <p>{t.security6Texto}</p>
            </article>

          </div>

          <button className="discover-button" onClick={volverInicio}>
            {t.volver}
          </button>

        </section>
      )}

    </main>
  )
}

export default App
