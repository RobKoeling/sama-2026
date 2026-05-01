import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { about, festival } from "./data/siteData";
import "./styles.css";

function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="index.html" aria-label={`${festival.name} home`}>
          <span className="brand-mark">SAMA</span>
          <span className="brand-year">2026</span>
        </a>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          Menu
        </button>
        <nav
          id="primary-navigation"
          className={isMenuOpen ? "site-nav is-open" : "site-nav"}
          aria-label="Primary"
        >
          <a href="index.html#programme" onClick={closeMenu}>Programme</a>
          <a href="about.html" onClick={closeMenu}>About</a>
          <a href="index.html#venues" onClick={closeMenu}>Venues</a>
          <a href="index.html#news" onClick={closeMenu}>News</a>
          <a href="index.html#contact" onClick={closeMenu}>Contact</a>
        </nav>
      </header>

      <main>
        <section className="about-page panel">
          <img className="about-page-logo" src={about.logoUrl} alt="SAMA Brighton main logo" />
          <img className="about-hero-image" src={about.imageUrl} alt="SAMA festival about page artwork" />
          <div className="section-heading">
            <p className="eyebrow">{about.eyebrow}</p>
            <h1 className="about-title">{about.title}</h1>
            <p>{about.intro}</p>
          </div>

          <div className="about-layout">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <section className="about-section">
            <p className="eyebrow">See More</p>
            <div className="about-links-list">
              {about.links.map((link) => (
                <p key={link.url} className="about-link-row">
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                </p>
              ))}
            </div>
          </section>

          <section className="about-section">
            <p className="eyebrow">Production Team</p>
            <div className="team-grid">
              {about.team.map((member) => (
                <article
                  key={member.name}
                  className={`team-card${member.role === "Support" ? " team-card-support" : ""}`}
                >
                  <h2>{member.name}</h2>
                  <p className="team-role">{member.role}</p>
                  <p>{member.bio}</p>
                </article>
              ))}
            </div>
          </section>
        </section>

        <footer className="site-footer panel">
          <p className="footer-thanks">
            With thanks to Chalk Cliff Trust and Enjoolata Foundation for their generous support
          </p>
          <div className="funder-logos" aria-label="Funder logos">
            <img
              className="funder-logo funder-logo-chalk"
              src={`${import.meta.env.BASE_URL}Artwork/chalk-cliff-trust-logo-rgb_full-colour.png`}
              alt="Chalk Cliff Trust logo"
            />
            <img
              className="funder-logo funder-logo-enjoolata"
              src={`${import.meta.env.BASE_URL}Artwork/enjoolata-logo-solid-PRINTING.png`}
              alt="Enjoolata Foundation logo"
            />
          </div>
        </footer>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AboutPage />
  </React.StrictMode>
);
