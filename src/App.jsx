import { useMemo, useState } from "react";
import { festival, films, newsItems, programme, venues } from "./data/siteData";

const socialBase = {
  x: "https://twitter.com/intent/tweet?text=",
  facebook: "https://www.facebook.com/sharer/sharer.php?u=",
  linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=",
};

function App() {
  const [selectedEventId, setSelectedEventId] = useState(programme[0].id);
  const [selectedVenue, setSelectedVenue] = useState("All venues");

  const selectedEvent = useMemo(
    () => programme.find((event) => event.id === selectedEventId) ?? programme[0],
    [selectedEventId]
  );

  const filteredProgramme = useMemo(() => {
    if (selectedVenue === "All venues") {
      return programme;
    }

    return programme.filter((event) => event.venue === selectedVenue);
  }, [selectedVenue]);

  const venueOptions = ["All venues", ...venues.map((venue) => venue.name)];
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
          <a href="#venues">Venues</a>
          <a href="#news">News</a>
          <a href="#visit">Visit</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero panel">
          <div className="hero-copy">
            <p className="eyebrow">{festival.strapline}</p>
            <h1>{festival.name}</h1>
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
                    <span>{event.dayLabel}</span>
                    <strong>{event.venue}</strong>
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
            <p className="stat">{festival.defaultStartTime}</p>
            <p className="label">default start time</p>
          </article>
          <article>
            <p className="stat">{venues.length}</p>
            <p className="label">Brighton venues</p>
          </article>
        </section>

        <section id="programme" className="programme panel">
          <div className="section-heading">
            <p className="eyebrow">Programme</p>
            <h2>Structured now, ready for richer film metadata next</h2>
            <p>
              The programme is driven from a single data source, so incoming venue notes and film
              identification details can populate this schedule without changing the page structure.
            </p>
          </div>

          <div className="programme-tools">
            <label className="filter-label" htmlFor="venue-filter">
              Filter by venue
            </label>
            <select
              id="venue-filter"
              value={selectedVenue}
              onChange={(event) => setSelectedVenue(event.target.value)}
            >
              {venueOptions.map((venue) => (
                <option key={venue} value={venue}>
                  {venue}
                </option>
              ))}
            </select>
          </div>

          <div className="programme-layout">
            <div className="programme-grid">
              {filteredProgramme.map((event) => (
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
                <div className="film-detail">
                  <img
                    className="film-poster"
                    src={primaryFilm.artworkUrl}
                    alt={`${primaryFilm.title} poster artwork`}
                  />
                  <div className="film-copy">
                    <p className="film-director">Directed by {primaryFilm.director}</p>
                    <p>{primaryFilm.description}</p>
                    <div className="source-links">
                      {primaryFilm.sourceLinks.map((link) => (
                        <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                          {link.label}
                        </a>
                      ))}
                    </div>
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
                        <p className="short-director">Directed by {film.director}</p>
                        <p>{film.description}</p>
                        <div className="source-links">
                          {film.sourceLinks.map((link) => (
                            <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                              {link.label}
                            </a>
                          ))}
                        </div>
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
            <h2>Venue data is now isolated from presentation</h2>
            <p>
              Each venue card is driven by data rather than hard-coded copy, so later updates can
              flow into schedules, maps, and visitor guidance consistently.
            </p>
          </div>
          <div className="venues-grid">
            {venues.map((venue) => (
              <article key={venue.name}>
                <p className="venue-type">{venue.type}</p>
                <h3>{venue.name}</h3>
                <p>{venue.note}</p>
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

        <section id="visit" className="visit panel">
          <div className="visit-card">
            <p className="eyebrow">Visit</p>
            <h2>Built for growth beyond a single static page</h2>
            <p>
              The app is now set up so programme, venues, films, and news can evolve independently.
              That is the right foundation for future social syndication, ticket links, and interactive festival tools.
            </p>
            <a className="button button-primary" href="mailto:hello@sama2026.com">
              Contact Festival Team
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
