import { useState } from "react";
import { about, festival, films, newsItems, programme, venues } from "./data/siteData";

const socialBase = {
  x: "https://twitter.com/intent/tweet?text=",
  facebook: "https://www.facebook.com/sharer/sharer.php?u=",
  linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=",
};

function DirectorCredits({ film }) {
  const credits = film.directorCredits ?? [{ name: film.director }];

  return (
    <>
      {credits.map((credit, index) => (
        <span key={`${film.title}-${credit.name}`}>
          {index > 0 ? ", " : ""}
          {credit.wikipediaUrl ? (
            <a href={credit.wikipediaUrl} target="_blank" rel="noreferrer">
              {credit.name}
            </a>
          ) : (
            credit.name
          )}
        </span>
      ))}
    </>
  );
}

function App() {
  const [selectedEventId, setSelectedEventId] = useState(programme[0].id);

  const selectedEvent = programme.find((event) => event.id === selectedEventId) ?? programme[0];
  const selectedFilms = selectedEvent.filmIds?.map((filmId) => films[filmId]).filter(Boolean) ?? [];
  const primaryFilm = selectedFilms[0] ?? null;

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label={`${festival.name} home`}>
          <span className="brand-mark">SAMA</span>
          <span className="brand-year">2026</span>
        </a>
        <nav className="site-nav" aria-label="Primary">
          <a href="#programme">Programme</a>
          <a href="about.html">About</a>
          <a href="#venues">Venues</a>
          <a href="#news">News</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero panel">
          <div className="hero-copy">
            <p className="eyebrow">{festival.strapline}</p>
            <img
              className="hero-logo"
              src="/sama-2026/SAMA2026_Marketing/SAMA%202026%20marketing%20and%20web%20content/SAMA%20logo%20images/SAMA%20Brighton%20main%20logo.jpg"
              alt="SAMA Brighton main logo"
            />
            <p className="hero-text">
              {festival.dateRange} in {festival.city}. {festival.description}
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#programme">
                Explore Programme
              </a>
              <a className="button button-secondary" href="#news">
                Social + News
              </a>
            </div>
          </div>

          <aside className="hero-panel">
            <p className="panel-label">Festival Week</p>
            <ul className="hero-dates">
              {programme.map((event) => (
                <li key={event.id}>
                  <button
                    type="button"
                    className={event.id === selectedEvent.id ? "day-pill is-active" : "day-pill"}
                    onClick={() => setSelectedEventId(event.id)}
                  >
                    <span>
                      {event.dayLabel} • {event.startTime}
                    </span>
                    <strong>{event.title}</strong>
                    <small className="day-pill-venue">{event.venue}</small>
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="highlights">
          <article>
            <p className="stat">{programme.length}</p>
            <p className="label">festival nights</p>
          </article>
          <article>
            <p className="label">Films, Discussion, Music</p>
          </article>
          <article>
            <p className="stat">{venues.length}</p>
            <p className="label">Brighton venues</p>
          </article>
        </section>

        <section id="programme" className="programme panel">
          <div className="section-heading">
            <p className="eyebrow">Programme</p>
          </div>

          <div className="programme-layout">
            <div className="programme-grid">
              {programme.map((event) => (
                <article
                  key={event.id}
                  className={event.id === selectedEvent.id ? "event-card is-selected" : "event-card"}
                >
                  <button
                    type="button"
                    className="event-card-button"
                    onClick={() => setSelectedEventId(event.id)}
                  >
                    <div className="event-topline">
                      <p>{event.fullDate}</p>
                      <span className={event.status === "Confirmed" ? "status live" : "status pending"}>
                        {event.status}
                      </span>
                    </div>
                    <h3>{event.title}</h3>
                    {event.subtitle ? <p className="subtitle">{event.subtitle}</p> : null}
                    <p className="venue">
                      {event.venue} • {event.startTime}
                    </p>
                    <p className="event-copy">{event.summary}</p>
                  </button>
                </article>
              ))}
            </div>

            <aside className="focus-card">
              <p className="eyebrow">Selected Event</p>
              <h3>{selectedEvent.title}</h3>
              <p className="focus-meta">
                {selectedEvent.fullDate} at {selectedEvent.startTime}
              </p>
              <p className="focus-meta">{selectedEvent.venue}</p>
              {selectedEvent.subtitle ? <p className="focus-subtitle">{selectedEvent.subtitle}</p> : null}
              <p>{selectedEvent.summary}</p>
              {selectedFilms.length === 1 && primaryFilm ? (
                <div className={primaryFilm.artworkUrl ? "film-detail" : "film-detail no-poster"}>
                  {primaryFilm.artworkUrl ? (
                    <img
                      className="film-poster"
                      src={primaryFilm.artworkUrl}
                      alt={`${primaryFilm.title} poster artwork`}
                    />
                  ) : null}
                  <div className="film-copy">
                    <p className="film-director">
                      Directed by <DirectorCredits film={primaryFilm} />
                    </p>
                    <p>{primaryFilm.description}</p>
                    {primaryFilm.trailerEmbedUrl ? (
                      <div className="trailer-block">
                        <p className="trailer-label">Trailer</p>
                        <div className="trailer-frame">
                          <iframe
                            src={primaryFilm.trailerEmbedUrl}
                            title={`${primaryFilm.title} trailer`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    ) : null}
                    {primaryFilm.externalLinks?.length ? (
                      <div className="external-links">
                        {primaryFilm.externalLinks.map((link) => (
                          <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                            {link.label}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}
              {selectedFilms.length > 1 ? (
                <div className="shorts-lineup">
                  {selectedFilms.map((film) => (
                    <article key={film.title} className="short-card">
                      <img className="short-poster" src={film.artworkUrl} alt={`${film.title} poster artwork`} />
                      <div>
                        <p className="film-director">{film.title}</p>
                        <p className="short-director">
                          Directed by <DirectorCredits film={film} />
                        </p>
                        <p>{film.description}</p>
                        {film.trailerEmbedUrl ? (
                          <div className="trailer-block">
                            <p className="trailer-label">Trailer</p>
                            <div className="trailer-frame">
                              <iframe
                                src={film.trailerEmbedUrl}
                                title={`${film.title} trailer`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                              />
                            </div>
                          </div>
                        ) : null}
                        {film.externalLinks?.length ? (
                          <div className="external-links">
                            {film.externalLinks.map((link) => (
                              <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                                {link.label}
                              </a>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              ) : null}
              {!selectedFilms.length ? (
                <p className="focus-note">
                  No matching 2025 main-festival film record has been added for this event yet.
                </p>
              ) : (
                <p className="focus-note">
                  Descriptions are paraphrased from the official SAMA 2025 festival materials and linked source pages.
                </p>
              )}
            </aside>
          </div>
        </section>

        <section id="venues" className="venues panel">
          <div className="section-heading">
            <p className="eyebrow">Venues</p>
          </div>
          <div className="venues-grid">
            {venues.map((venue) => (
              <article key={venue.name}>
                <p className="venue-type">{venue.type}</p>
                <h3>{venue.name}</h3>
                <p className="venue-detail">{venue.address}</p>
                {venue.website ? (
                  <p className="venue-link-row">
                    <a href={venue.website} target="_blank" rel="noreferrer">
                      Venue website
                    </a>
                  </p>
                ) : null}
                {venue.phone ? <p className="venue-detail">Phone: {venue.phone}</p> : null}
              </article>
            ))}
          </div>
        </section>

        <section id="news" className="news panel">
          <div className="section-heading">
            <p className="eyebrow">News + Social</p>
            <h2>Prepared for share actions and publishing workflows</h2>
            <p>
              The frontend can already render structured news items and generate share actions.
              Actual automated posting will need a CMS, backend, or automation layer connected later.
            </p>
          </div>
          <div className="news-grid">
            {newsItems.map((item) => {
              const shareText = encodeURIComponent(`${festival.name}: ${item.title}`);
              const shareUrl = encodeURIComponent("https://sama2026.example/news");

              return (
                <article key={item.id} className="news-card">
                  <p className="news-category">{item.category}</p>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <div className="share-row">
                    <a href={`${socialBase.x}${shareText}`} target="_blank" rel="noreferrer">
                      Share to X
                    </a>
                    <a href={`${socialBase.facebook}${shareUrl}`} target="_blank" rel="noreferrer">
                      Facebook
                    </a>
                    <a href={`${socialBase.linkedin}${shareUrl}`} target="_blank" rel="noreferrer">
                      LinkedIn
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="contact" className="visit panel">
          <div className="visit-card">
            <p className="eyebrow">Contact</p>
            <h2>Connect with SAMA Brighton</h2>
            <div className="contact-actions">
              <a className="button button-secondary" href="mailto:hello@sama2026.com">
                Email
              </a>
              <a className="button button-secondary" href="https://twitter.com" target="_blank" rel="noreferrer">
                Twitter
              </a>
              <a className="button button-secondary" href="https://instagram.com" target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a className="button button-secondary" href="https://facebook.com" target="_blank" rel="noreferrer">
                Facebook
              </a>
            </div>
            <a className="button button-primary" href="mailto:hello@sama2026.com">
              Contact Festival Team
            </a>
          </div>
        </section>

        <footer className="site-footer panel">
          <p className="footer-thanks">
            With thanks to Chalk Cliff Trust and Enjoolata Foundation for their generous support
          </p>
          <div className="funder-logos" aria-label="Funder logos">
            <img
              className="funder-logo funder-logo-chalk"
              src="/sama-2026/SAMA2026_Marketing/SAMA%202026%20marketing%20and%20web%20content/Funder%20and%20RW%20logos/chalk-cliff-trust-logo-rgb_full-colour.png"
              alt="Chalk Cliff Trust logo"
            />
            <img
              className="funder-logo funder-logo-enjoolata"
              src="/sama-2026/SAMA2026_Marketing/SAMA%202026%20marketing%20and%20web%20content/Funder%20and%20RW%20logos/enjoolata-logo-solid-PRINTING.png"
              alt="Enjoolata Foundation logo"
            />
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
