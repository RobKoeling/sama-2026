import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { about, festival } from "./data/siteData";
import { recordSiteEvent } from "./lib/siteAnalytics";
import "./styles.css";

function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const pagePath = typeof window !== "undefined" ? window.location.pathname : "/about.html";

  const handleAnalyticsClickCapture = (event) => {
    const target = event.target.closest("[data-analytics-event]");

    if (!target) {
      return;
    }

    void recordSiteEvent({
      eventName: target.dataset.analyticsEvent,
      page: pagePath,
      label: target.dataset.analyticsLabel || null,
      section: target.dataset.analyticsSection || null,
      href: target.getAttribute("href"),
    });
  };

  return (
    <div className="app-shell" onClickCapture={handleAnalyticsClickCapture}>
      <header className="site-header">
        <a className="brand" href="index.html" aria-label={`${festival.name} home`} data-analytics-event="button_click" data-analytics-label="Brand: Sama Brighton 2026" data-analytics-section="Header">
          <span className="brand-mark">Sama Brighton</span>
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
          <a href="index.html#programme" onClick={closeMenu} data-analytics-event="button_click" data-analytics-label="Navigation: Programme" data-analytics-section="Header">Programme</a>
          <a href="about.html" onClick={closeMenu} data-analytics-event="button_click" data-analytics-label="Navigation: About" data-analytics-section="Header">About</a>
          <a href="index.html#venues" onClick={closeMenu} data-analytics-event="button_click" data-analytics-label="Navigation: Venues" data-analytics-section="Header">Venues</a>
          <a href="index.html#news" onClick={closeMenu} data-analytics-event="button_click" data-analytics-label="Navigation: News" data-analytics-section="Header">News</a>
          <a href="index.html#contact" onClick={closeMenu} data-analytics-event="button_click" data-analytics-label="Navigation: Contact" data-analytics-section="Header">Contact</a>
        </nav>
      </header>

      <main>
        <section className="about-page panel">
          <img className="about-page-logo" src={about.logoUrl} alt="Sama Brighton main logo" />
          <img className="about-hero-image" src={about.imageUrl} alt="Sama festival about page artwork" />
          <div className="section-heading">
            <p className="eyebrow">{about.eyebrow}</p>
            <h1 className="about-title">{about.title}</h1>
            <p>{about.intro}</p>
          </div>

          <div className="about-layout">
            {about.paragraphs.map((paragraph, index) => {
              if (typeof paragraph === "string") {
                return <p key={paragraph}>{paragraph}</p>;
              }

              return (
                <p key={`${paragraph.link.label}-${index}`}>
                  {paragraph.prefix ?? ""}
                  <a href={paragraph.link.url} target="_blank" rel="noreferrer">
                    {paragraph.link.label}
                  </a>
                  {paragraph.suffix ?? ""}
                </p>
              );
            })}
          </div>

          <section className="about-section">
            <p className="eyebrow">See More</p>
            <div className="about-links-list">
              {about.links.map((link) => (
                <p key={link.url} className="about-link-row">
                <a href={link.url} target="_blank" rel="noreferrer" data-analytics-event="button_click" data-analytics-label={link.label} data-analytics-section="About Links">
                    {link.label}
                  </a>
                </p>
              ))}
            </div>
          </section>

          <section className="about-section">
            <p className="eyebrow">Production Team</p>
            <div className="team-grid">
              {about.team.map((member) => {
                const isSupport = member.role === "Support";
                const NameTag = isSupport ? "h4" : "h3";

                return (
                  <article
                    key={member.name}
                    className={`team-card${isSupport ? " team-card-support" : ""}`}
                  >
                    <NameTag>{member.name}</NameTag>
                    <p className="team-role">{member.role}</p>
                    <p>{member.bio}</p>
                  </article>
                );
              })}
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
          <div className="footer-stories">
            <p className="footer-stories-text">Sama Brighton 2026 is brought to you by Stories from Nowhere CIC.</p>
            <img
              className="footer-stories-logo"
              src={`${import.meta.env.BASE_URL}Artwork/stories-from-nowhere-logo.png`}
              alt="Stories from Nowhere logo"
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
