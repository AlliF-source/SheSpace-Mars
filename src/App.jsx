
import { useState } from 'react'
import './App.css'

function App() {
  const [language, setLanguage] = useState('ES')

  const content = {
    ES: {
      inicio: 'Inicio',
      mapa: 'Mapa',
      mision: 'Misión',
      integrantes: 'Integrantes',
      seguridad: 'Seguridad',
      etiqueta: 'NASA SPACE APPS CHALLENGE 2026',
      titulo: '¡VÁMONOS',
planeta: 'A MARTE!',
      subtitulo: 'EXPLORA. DESCUBRE. APRENDE.',
      descripcion:
        'Prepárate para una aventura extraordinaria. Descubre el planeta rojo, explora sus paisajes y conoce los secretos de Marte.',
      boton: 'INICIAR MISIÓN',
      saludo: '¡Hola, explorador!',
      destino: 'DESTINO: MARTE',
      tarjetas: 'UN UNIVERSO POR DESCUBRIR',
      descripcionTarjetas: 'Tu aventura espacial comienza aquí.',
      tarjeta1: 'CONOCE MARTE',
      texto1: 'Descubre el planeta rojo y sus características.',
      tarjeta2: 'EXPLORA EL CRÁTER GALE',
      texto2: 'Conoce uno de los lugares más fascinantes de Marte.',
      tarjeta3: 'CENTRO CIENTÍFICO',
      texto3: 'Descubre los datos y avances de la exploración espacial.',
      tarjeta4: 'SEGURIDAD ASTRONAUTA',
      texto4: 'Conoce cómo se preparan los exploradores espaciales.',
      noticias: 'ÚLTIMAS NOTICIAS',
      noticia: 'El futuro de la exploración comienza aquí.',
      equipo: 'EL EQUIPO DETRÁS DE LA MISIÓN',
      textoEquipo: 'Conoce a quienes hacen posible esta aventura.',
      pendiente: 'Nuestro equipo se está preparando para despegar.',
      pie: 'EXPLORANDO NUEVOS HORIZONTES'
    },
    EN: {
      inicio: 'Home',
      mapa: 'Map',
      mision: 'Mission',
      integrantes: 'Team',
      seguridad: 'Safety',
      etiqueta: 'NASA SPACE APPS CHALLENGE 2026',
      titulo: 'LET’S GO',
planeta: 'TO MARS!',
      subtitulo: 'EXPLORE. DISCOVER. LEARN.',
      descripcion:
        'Get ready for an extraordinary adventure. Discover the red planet, explore its landscapes and learn the secrets of Mars.',
      boton: 'START MISSION',
      saludo: 'Hello, explorer!',
      destino: 'DESTINATION: MARS',
      tarjetas: 'A UNIVERSE TO DISCOVER',
      descripcionTarjetas: 'Your space adventure starts here.',
      tarjeta1: 'DISCOVER MARS',
      texto1: 'Discover the red planet and its features.',
      tarjeta2: 'EXPLORE GALE CRATER',
      texto2: 'Learn about one of the most fascinating places on Mars.',
      tarjeta3: 'SCIENCE CENTER',
      texto3: 'Discover space exploration data and advances.',
      tarjeta4: 'ASTRONAUT SAFETY',
      texto4: 'Learn how space explorers prepare for their missions.',
      noticias: 'LATEST NEWS',
      noticia: 'The future of exploration starts here.',
      equipo: 'THE TEAM BEHIND THE MISSION',
      textoEquipo: 'Meet the people making this adventure possible.',
      pendiente: 'Our team is getting ready for takeoff.',
      pie: 'EXPLORING NEW HORIZONS'
    }
  }

  const t = content[language]

  
const cards = [
  {
    icon: '🌎',
    number: '01',
    title: t.tarjeta1,
    text: t.texto1,
    link: '#mision'
  },
  {
    icon: '🔭',
    number: '02',
    title: t.tarjeta2,
    text: t.texto2,
    link: '#mapa'
  },
  {
    icon: '🧪',
    number: '03',
    title: t.tarjeta3,
    text: t.texto3,
    link: '#ciencia'
  },
  {
    icon: '🧑‍🚀',
    number: '04',
    title: t.tarjeta4,
    text: t.texto4,
    link: '#seguridad'
  }
]


  return (
    <main className="home" id="inicio">

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

          <a href="#mapa">
            <span className="nav-icon">◎</span>
            {t.mapa}
          </a>

          <a href="#mision">
            <span className="nav-icon">🚀</span>
            {t.mision}
          </a>

          <a href="#integrantes">
            <span className="nav-icon">♙</span>
            {t.integrantes}
          </a>

          <a href="#seguridad">
            <span className="nav-icon">🛡</span>
            {t.seguridad}
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

        {/* MASCOTA A LA IZQUIERDA */}
        <div className="mascot-container">
          <div className="mascot-glow"></div>

          <img
            className="mascot"
            src="/images/pulpo-astronauta.png"
            alt="Pulpo astronauta de SHE SPACE"
          />

          <p className="mascot-caption">{t.saludo}</p>
        </div>

        {/* TEXTO A LA DERECHA */}
        <div className="hero-content">

          <p className="eyebrow">{t.etiqueta}</p>

       

<h1>
  {t.titulo}
  <span>{t.planeta}</span>
</h1>


<h2>{t.subtitulo}</h2>

<p className="description">{t.descripcion}</p>

<a href="#explorar" className="main-button">
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

              <a href={card.link}>DESCUBRIR ↗</a>

            </article>
          ))}

        </div>

      </section>

      {/* NOTICIAS */}
     
<section className="news-section" id="noticias">
  <div className="news-content">
    <span className="news-badge">✦ SHE SPACE TRANSMISIÓN</span>

    <p className="eyebrow">{t.noticias}</p>

    <h2>{t.noticia}</h2>

    <div className="news-line"></div>

    <p className="news-description">
      Descubre las novedades de la exploración espacial
      y acompáñanos en nuestra aventura hacia Marte.
    </p>
  </div>

  <div className="news-planet">
    <span>🔴</span>
  </div>
</section>


      {/* CIENCIA Y SEGURIDAD: DESTINOS DE LAS TARJETAS */}
      <div id="ciencia"></div>
      <div id="mapa"></div>
      <div id="seguridad"></div>

      {/* EQUIPO */}
      <section className="team-section" id="integrantes">

        <div className="section-heading">
          <p className="eyebrow">SHE SPACE TEAM</p>
          <h2>{t.equipo}</h2>
          <p>{t.textoEquipo}</p>
        </div>

        <div className="team-placeholder">
          <div className="team-icon">👩‍🚀</div>
          <h3>SHE SPACE</h3>
          <p>{t.pendiente}</p>
          <span>OUR CREW · 2026</span>
        </div>

      </section>

      {/* PIE DE PÁGINA */}
      <footer className="footer">
        <p>SHE SPACE © 2026</p>
        <p>{t.pie}</p>
      </footer>

    </main>
  )
}

export default App
