import React from "react";
import './home.css';

function Home() {
  return (
    <div className="home-container">
      <header className="navbar">
        <h1 className="logo">HidratArte</h1>
        <nav>
          <a href="#">Explorar</a>
          <a href="#">Home</a>
          <a href="#">Iniciar sesión</a>
        </nav>
      </header>

      <main className="main-content">
        <h2 className="titulo">BEBIDAS REFRESCANTES</h2>
        <p className="subtitulo">
          Descubre tus bebidas favoritas para mantenerte hidratado.
        </p>
        <input type="text" placeholder="🔍 Buscar productos" className="buscador" />

        <div className="categorias">
          <div className="categoria">
            <img src="/images/agua.png" alt="Agua" />
            <p>Agua</p>
          </div>
          <div className="categoria">
            <img src="/images/jugo.png" alt="Jugo" />
            <p>Jugo</p>
          </div>
          <div className="categoria">
            <img src="/images/gaseosa.png" alt="Gaseosa" />
            <p>Gaseosa</p>
          </div>
          <div className="categoria">
            <img src="/images/alcohol.png" alt="Alcohol" />
            <p>Alcohol</p>
          </div>
        </div>
      </main>
      <footer className="footer">
  <p className="footer-text">&copy; 2025 HidratArte. Todos los derechos reservados.</p>
  <div className="redes">
    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
      <img src="/icons/instagram.png" alt="Instagram" className="icono-red" />
    </a>
    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
      <img src="/icons/facebook.png" alt="Facebook" className="icono-red" />
    </a>
    <a href="mailto:contacto@hidratarte.com">
      <img src="/icons/gmail.png" alt="Gmail" className="icono-red" />
    </a>
  </div>
</footer>



    </div>
  );
}

export default Home;

