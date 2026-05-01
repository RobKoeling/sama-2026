import { useEffect, useRef, useState } from "react";
import { about, festival, films, newsItems, programme, venues } from "./data/siteData";

const socialBase = {
  x: "https://twitter.com/intent/tweet?text=",
  facebook: "https://www.facebook.com/sharer/sharer.php?u=",
  linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=",
};

const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`;

const interleaveGroups = (groups) => {
  const queues = groups.map((group) => [...group]).filter((group) => group.length > 0);
  const mixed = [];

  while (queues.some((group) => group.length > 0)) {
    for (const group of queues) {
      if (group.length > 0) {
        mixed.push(group.shift());
      }
    }
  }

  return mixed;
};

const heroStillGroups = [
  [
    "Film_Materials/Film_Stills/Copy%20of%20CHAMPIONSOFTHEGOLDENVALLEY_01.jpeg",
    "Film_Materials/Film_Stills/Copy%20of%20CHAMPIONSOFTHEGOLDENVALLEY_02.jpeg",
    "Film_Materials/Film_Stills/Copy%20of%20CHAMPIONSOFTHEGOLDENVALLEY_03.jpeg",
  ],
  [
    "Film_Materials/Film_Stills/Copy%20of%20Copy%20of%20Still%201%20-%20BAURYNA%20SALU.jpg",
    "Film_Materials/Film_Stills/Copy%20of%20Copy%20of%20Still%202%20-%20BAURYNA%20SALU.jpg",
    "Film_Materials/Film_Stills/Copy%20of%20Copy%20of%20Still%203%20-%20BAURYNA%20SALU%20%281%29.jpg",
  ],
  [
    "Film_Materials/Film_Stills/Copy%20of%20Main%20pic_SimasSong01%C2%A9Ton%20Peters.jpg",
    "Film_Materials/Film_Stills/Copy%20of%20SimasSong02%C2%A9Ton%20Peters.jpg",
    "Film_Materials/Film_Stills/Copy%20of%20SimasSong03%C2%A9Ton%20Peters.JPG",
    "Film_Materials/Film_Stills/Copy%20of%20SimasSong04%C2%A9Ton%20Peters.JPG",
    "Film_Materials/Film_Stills/Copy%20of%20SimasSong05%C2%A9Ton%20Peters.JPG",
    "Film_Materials/Film_Stills/Copy%20of%20SimasSong06%C2%A9Ton%20Peters.JPG",
    "Film_Materials/Film_Stills/Copy%20of%20SimasSong07%C2%A9Ton%20Peters.JPG",
  ],
  [
    "Film_Materials/Film_Stills/Copy%20of%20photo_5881747744262045115_y.jpg",
    "Film_Materials/Film_Stills/Copy%20of%20photo_5881747744262045128_y.jpg",
    "Film_Materials/Film_Stills/Copy%20of%20photo_5881747744262045163_y.jpg",
    "Film_Materials/Film_Stills/Copy%20of%20photo_5881747744262045164_y.jpg",
    "Film_Materials/Film_Stills/Copy%20of%20photo_5881747744262045165_y.jpg",
    "Film_Materials/Film_Stills/Copy%20of%20photo_5936062553522291748_y.jpg",
  ],
  [
    "SAMA2026_Marketing/WEBSITE%20FOLDER%20FOR%20ROB/Specific%20film%20materials/The%20Knot/The%20Knot%20film%20stills/Copy%20of%20image1%20%281%29.jpeg",
    "SAMA2026_Marketing/WEBSITE%20FOLDER%20FOR%20ROB/Specific%20film%20materials/The%20Knot/The%20Knot%20film%20stills/Copy%20of%20image5%20%281%29.jpeg",
    "SAMA2026_Marketing/WEBSITE%20FOLDER%20FOR%20ROB/Specific%20film%20materials/The%20Knot/The%20Knot%20film%20stills/Copy%20of%20image6.jpeg",
    "SAMA2026_Marketing/WEBSITE%20FOLDER%20FOR%20ROB/Specific%20film%20materials/The%20Knot/The%20Knot%20film%20stills/Copy%20of%20image7.jpeg",
    "SAMA2026_Marketing/WEBSITE%20FOLDER%20FOR%20ROB/Specific%20film%20materials/The%20Knot/The%20Knot%20film%20stills/Copy%20of%20image8.jpeg",
    "SAMA2026_Marketing/WEBSITE%20FOLDER%20FOR%20ROB/Specific%20film%20materials/The%20Knot/The%20Knot%20film%20stills/Copy%20of%20image9.jpeg",
  ],
  [
    "SAMA2026_Marketing/WEBSITE%20FOLDER%20FOR%20ROB/SAMA%20logo%20and%20artwork/Copy%20of%20SAMA%20west%20pier%20artwork.jpg",
    "SAMA2026_Marketing/WEBSITE%20FOLDER%20FOR%20ROB/SAMA%20logo%20and%20artwork/Copy%20of%20SAMA%20pavilion%20artwork.jpg",
    "SAMA2026_Marketing/WEBSITE%20FOLDER%20FOR%20ROB/SAMA%20logo%20and%20artwork/Copy%20of%20SAMA%20palace%20pier%20artwork%202.jpg",
    "SAMA2026_Marketing/WEBSITE%20FOLDER%20FOR%20ROB/SAMA%20logo%20and%20artwork/Copy%20of%20SAMA%20Cat%202.png",
    "SAMA2026_Marketing/WEBSITE%20FOLDER%20FOR%20ROB/SAMA%20logo%20and%20artwork/Copy%20of%20SAMA%20Cat%204.png",
  ],
];

const heroStills = interleaveGroups(heroStillGroups);

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [heroStillIndex, setHeroStillIndex] = useState(0);
  const focusCardRef = useRef(null);

  const selectedEvent = programme.find((event) => event.id === selectedEventId) ?? programme[0];
  const selectedFilms = selectedEvent.filmIds?.map((filmId) => films[filmId]).filter(Boolean) ?? [];
  const primaryFilm = selectedFilms[0] ?? null;
  const heroStill = heroStills[heroStillIndex];
  const closeMenu = () => setIsMenuOpen(false);
  const selectEvent = (eventId, { scrollToDetails = false } = {}) => {
    setSelectedEventId(eventId);

    if (!scrollToDetails || typeof window === "undefined") {
      return;
    }

    if (!window.matchMedia("(max-width: 760px)").matches) {
      return;
    }

    window.requestAnimationFrame(() => {
      focusCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  useEffect(() => {
    if (heroStills.length < 2 || typeof window === "undefined") {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setHeroStillIndex((index) => (index + 1) % heroStills.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label={`${festival.name} home`}>
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
          <a href="#programme" onClick={closeMenu}>Programme</a>
          <a href="about.html" onClick={closeMenu}>About</a>
          <a href="#venues" onClick={closeMenu}>Venues</a>
          <a href="#news" onClick={closeMenu}>News</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero panel">
          <div className="hero-copy">
            <p className="eyebrow">{festival.strapline}</p>
            <div className="hero-stills-frame" aria-label="Festival stills slideshow">
              <img
                className="hero-stills-image"
                src={assetPath(heroStill)}
                alt="Festival still from the film materials archive"
              />
            </div>
            <p className="hero-text">
              {festival.dateRange}. {festival.description}
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

          <img
            className="hero-logo hero-logo-float"
            src={assetPath("Artwork/sama-brighton-main-logo-transparent.png")}
            alt="SAMA Brighton main logo"
          />

          <aside className="hero-panel">
            <p className="panel-label">Festival Week - Buy Tickets</p>
            <ul className="hero-dates">
              {programme.map((event) => (
                <li key={event.id}>
                  <button
                    type="button"
                    className={event.id === selectedEvent.id ? "day-pill is-active" : "day-pill"}
                    onClick={() => selectEvent(event.id)}
                  >
                    <span>
                      {event.heroDayLabel ?? event.dayLabel} • {event.heroStartTime ?? event.startTime}
                    </span>
                    <strong>{event.heroTitle ?? event.title}</strong>
                    {(event.heroVenue ?? event.venue) ? (
                      <small className="day-pill-venue">{event.heroVenue ?? event.venue}</small>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="highlights">
          <article className="highlight-logo-card">
            <img
              className="highlight-logo highlight-logo-wide"
              src={assetPath("Artwork/SAMA%20palace%20pier%20artwork%202.jpg")}
              alt="SAMA Palace Pier artwork"
            />
          </article>
          <article className="highlight-logo-card highlight-logo-card-tall">
            <img
              className="highlight-logo highlight-logo-tall"
              src={assetPath("Artwork/SAMA%20pavilion%20artwork.jpg")}
              alt="SAMA Pavilion artwork"
            />
          </article>
          <article className="highlight-logo-card">
            <img
              className="highlight-logo highlight-logo-wide"
              src={assetPath("Artwork/SAMA%20west%20pier%20artwork.jpg")}
              alt="SAMA West Pier artwork"
            />
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
                    onClick={() => selectEvent(event.id, { scrollToDetails: true })}
                  >
                    <div className="event-topline">
                      <p>{event.fullDate}</p>
                    </div>
                    <h3>{event.title}</h3>
                    {event.subtitle ? <p className="subtitle">{event.subtitle}</p> : null}
                    <p className="venue">
                      {event.venue} • {event.startTime}
                    </p>
                    <p className="event-copy">{event.cardSummary ?? event.summary}</p>
                    {(event.cardProgrammeNotes ?? event.programmeNotes)?.length ? (
                      <div className="film-programme-notes">
                        {(event.cardProgrammeNotes ?? event.programmeNotes).map((note) => (
                          <p key={note}>{note}</p>
                        ))}
                      </div>
                    ) : null}
                  </button>
                </article>
              ))}
            </div>

            <aside ref={focusCardRef} className="focus-card">
              <p className="eyebrow">Selected Event</p>
              {selectedFilms.length === 1 && primaryFilm?.detailBlocks ? (
                <div className="event-detail-copy">
                  {primaryFilm.detailBlocks.map((block, index) => {
                    if (block.type === "title") return <h3 key={`${block.type}-${index}`}>{block.text}</h3>;
                    if (block.type === "directors") {
                      return (
                        <p key={`${block.type}-${index}`} className="film-director">
                          Directed by <DirectorCredits film={primaryFilm} />
                        </p>
                      );
                    }
                    if (block.type === "poster" && primaryFilm.artworkUrl) {
                      return (
                        <img
                          key={`${block.type}-${index}`}
                          className="film-poster detail-flow-poster"
                          src={primaryFilm.artworkUrl}
                          alt={`${primaryFilm.title} poster artwork`}
                        />
                      );
                    }
                    if (block.type === "quote") {
                      return (
                        <blockquote key={`${block.type}-${index}`} className="film-quote">
                          <p>“{block.text}”</p>
                          <footer>{block.source}</footer>
                        </blockquote>
                      );
                    }
                    return (
                      <p key={`${block.type}-${index}`} className={block.type === "label" ? "detail-label" : ""}>
                        {block.text}
                      </p>
                    );
                  })}
                </div>
              ) : selectedEvent.detailBlocks ? (
                <div className="event-detail-copy">
                  {selectedEvent.detailBlocks.map((block, index) => {
                    if (block.type === "title") return <h3 key={`${block.type}-${index}`}>{block.text}</h3>;
                    if (block.type === "quote") {
                      return (
                        <blockquote key={`${block.type}-${index}`} className="film-quote">
                          <p>“{block.text}”</p>
                          <footer>{block.source}</footer>
                        </blockquote>
                      );
                    }
                    return (
                      <p key={`${block.type}-${index}`} className={block.type === "label" ? "detail-label" : ""}>
                        {block.text}
                      </p>
                    );
                  })}
                </div>
              ) : (
                <>
                  <h3>{selectedEvent.title}</h3>
                  <p className="focus-meta">
                    {selectedEvent.fullDate} at {selectedEvent.startTime}
                  </p>
                  <p className="focus-meta">{selectedEvent.venue}</p>
                  {selectedEvent.subtitle ? <p className="focus-subtitle">{selectedEvent.subtitle}</p> : null}
                  {selectedEvent.detailSummary ?? selectedEvent.summary ? (
                    <p>{selectedEvent.detailSummary ?? selectedEvent.summary}</p>
                  ) : null}
                  {selectedEvent.programmeNotes?.length ? (
                    <div className="film-programme-notes">
                      {selectedEvent.programmeNotes.map((note) => (
                        <p key={note}>{note}</p>
                      ))}
                    </div>
                  ) : null}
                  {selectedEvent.quotes?.length ? (
                    <div className="film-quote-list">
                      {selectedEvent.quotes.map((quote) => (
                        <blockquote key={quote.source} className="film-quote">
                          {"lines" in quote ? (
                            <p>
                              {quote.lines.map((line, index) => (
                                <span key={`${quote.source}-${index}`}>
                                  {line}
                                  <br />
                                </span>
                              ))}
                            </p>
                          ) : (
                            <p>“{quote.text}”</p>
                          )}
                          <footer>{quote.source}</footer>
                        </blockquote>
                      ))}
                    </div>
                  ) : null}
                </>
              )}
              {selectedFilms.length === 1 && primaryFilm ? (
                <div className={primaryFilm.artworkUrl ? "film-detail" : "film-detail no-poster"}>
                  {primaryFilm.artworkUrl && !primaryFilm.detailBlocks ? (
                    <img
                      className="film-poster"
                      src={primaryFilm.artworkUrl}
                      alt={`${primaryFilm.title} poster artwork`}
                    />
                  ) : null}
                  <div className="film-copy">
                    {!primaryFilm.detailBlocks ? (
                      <>
                        <p className="film-director">
                          Directed by <DirectorCredits film={primaryFilm} />
                        </p>
                        {primaryFilm.description ? <p>{primaryFilm.description}</p> : null}
                        {primaryFilm.detailFlowBlocks?.length ? (
                          <div className="film-flow-blocks">
                            {primaryFilm.detailFlowBlocks.map((block, index) => {
                              if (block.type === "quote") {
                                return (
                                  <blockquote key={`${block.type}-${index}`} className="film-quote">
                                    <p>“{block.text}”</p>
                                    <footer>{block.source}</footer>
                                  </blockquote>
                                );
                              }
                              return (
                                <p
                                  key={`${block.type}-${index}`}
                                  className={block.type === "label" ? "detail-label" : ""}
                                >
                                  {block.text}
                                </p>
                              );
                            })}
                          </div>
                        ) : null}
                        {primaryFilm.programmeNotes?.length ? (
                          <div className="film-programme-notes">
                            {primaryFilm.programmeNotes.map((note) => (
                              <p key={note}>{note}</p>
                            ))}
                          </div>
                        ) : null}
                        {primaryFilm.quotes?.length ? (
                          <div className="film-quote-list">
                            {primaryFilm.quotes.map((quote) => (
                              <blockquote key={quote.text} className="film-quote">
                                <p>“{quote.text}”</p>
                                <footer>{quote.source}</footer>
                              </blockquote>
                            ))}
                          </div>
                        ) : null}
                      </>
                    ) : null}
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
              src={assetPath("Artwork/chalk-cliff-trust-logo-rgb_full-colour.png")}
              alt="Chalk Cliff Trust logo"
            />
            <img
              className="funder-logo funder-logo-enjoolata"
              src={assetPath("Artwork/enjoolata-logo-solid-PRINTING.png")}
              alt="Enjoolata Foundation logo"
            />
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
