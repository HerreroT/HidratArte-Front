// Home.js
import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">HIDRÁTATE</h1>
        <nav>
          <a href="#" className="home-link">HOME</a>
        </nav>
      </header>

      <main className="home-main">
        <h2 className="home-subtitle">BEBIDAS REFRESCANTES</h2>
        <p className="home-description">
          Encuentra tus bebidas favoritas para mantenerte hidratado.
        </p>
        <button className="home-button">VER BEBIDAS</button>

        <div className="home-images">
          <img src="/img/bottle.png" alt="Botella de agua" />
          <img src="/img/orange-drink.png" alt="Jugo de naranja" />
          <img src="/img/blue-drink.png" alt="Bebida azul" />
          <img src="/img/green-smoothie.png" alt="Smoothie verde" />
          <img src="/img/red-drink.png" alt="Jugo rojo" />
        </div>
      </main>
    </div>
  );
}
