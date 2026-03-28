import React from "react";
import ReactDOM from "react-dom/client";
import { about, festival } from "./data/siteData";
import "./styles.css";

function AboutPage() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="index.html" aria-label={`${festival.name} home`}>
          <span className="brand-mark">SAMA</span>
          <span className="brand-year">2026</span>
        </a>
        <nav className="site-nav" aria-label="Primary">
          <a href="index.html#programme">Programme</a>
          <a href="about.html">About</a>
          <a href="index.html#venues">Venues</a>
          <a href="index.html#news">News</a>
          <a href="index.html#visit">Visit</a>
        </nav>
      </header>

      <main>
        <section className="about-page panel">
          <img className="about-hero-image" src={about.imageUrl} alt="SAMA festival about page artwork" />
          <div className="section-heading">
            <p className="eyebrow">About</p>
            <h1 className="about-title">{about.title}</h1>
            <p>{about.intro}</p>
          </div>

          <div className="about-layout">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <p className="about-link-row">
            Mother festival:
            {" "}
            <a href={festival.motherFestivalUrl} target="_blank" rel="noreferrer">
              {festival.motherFestivalUrl}
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AboutPage />
  </React.StrictMode>
);
