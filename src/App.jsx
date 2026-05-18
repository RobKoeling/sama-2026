import { Fragment, useEffect, useRef, useState } from "react";
import { about, festival, films, programme, sponsorLinks, venues } from "./data/siteData";
import { isSignupConfigured, submitEmailSignup } from "./lib/emailSignup";
import InstagramCarousel from "./components/InstagramCarousel";
import { fetchInstagramFeed, isInstagramFeedConfigured } from "./lib/instagramFeed";
import { recordSiteEvent, trackPageView } from "./lib/siteAnalytics";

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
  ],
  [
    "Film_Materials/Film_Stills/my-childhood-119.webp",
    "Film_Materials/Film_Stills/my-childhood-382.webp",
    "Film_Materials/Film_Stills/my-childhood-451.webp",
    "Film_Materials/Film_Stills/my-childhood-quad.webp",
  ],
  [
    "Film_Materials/Film_Stills/the-knot-01.jpeg",
    "Film_Materials/Film_Stills/the-knot-05.jpeg",
    "Film_Materials/Film_Stills/the-knot-06.jpeg",
    "Film_Materials/Film_Stills/the-knot-07.jpeg",
    "Film_Materials/Film_Stills/the-knot-08.jpeg",
    "Film_Materials/Film_Stills/the-knot-09.jpeg",
  ],
  [
    "Artwork/SAMA%20west%20pier%20artwork.jpg",
    "Artwork/SAMA%20pavilion%20artwork.jpg",
    "Artwork/SAMA%20palace%20pier%20artwork%202.jpg",
    "Artwork/sama-cat-2.png",
    "Artwork/sama-cat-4.png",
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

function NoteContent({ note }) {
  if (!note) {
    return null;
  }

  if (typeof note === "string") {
    return <p>{note}</p>;
  }

  const className = [
    note.emphasis === "strong" ? "note-strong" : "",
    note.emphasis === "italic" ? "note-italic" : "",
  ].filter(Boolean).join(" ");

  return (
    <p className={className}>
      {note.prefix ?? ""}
      {note.link ? (
        <a href={note.link.url} target="_blank" rel="noreferrer">
          {note.link.label}
        </a>
      ) : null}
      {note.suffix ?? ""}
    </p>
  );
}

function App() {
  const [selectedEventId, setSelectedEventId] = useState(programme[0].id);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [heroStillIndex, setHeroStillIndex] = useState(0);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [contactTarget, setContactTarget] = useState(null);
  const [copiedContactEmail, setCopiedContactEmail] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupError, setSignupError] = useState("");
  const [signupStatus, setSignupStatus] = useState("");
  const [isSubmittingSignup, setIsSubmittingSignup] = useState(false);
  const [instagramPosts, setInstagramPosts] = useState([]);
  const [instagramLoading, setInstagramLoading] = useState(false);
  const [instagramError, setInstagramError] = useState("");
  const focusCardRef = useRef(null);

  const selectedEvent = programme.find((event) => event.id === selectedEventId) ?? programme[0];
  const selectedFilms = selectedEvent.filmIds?.map((filmId) => films[filmId]).filter(Boolean) ?? [];
  const primaryFilm = selectedFilms[0] ?? null;
  const heroStill = heroStills[heroStillIndex];
  const signupConfigured = isSignupConfigured();
  const instagramFeedConfigured = isInstagramFeedConfigured();
  const instagramFeedEnabled = import.meta.env.VITE_ENABLE_INSTAGRAM_FEED === "true";
  const pagePath = typeof window !== "undefined" ? window.location.pathname : "/";
  const closeMenu = () => setIsMenuOpen(false);
  const openSignup = () => {
    closeMenu();
    setIsSignupOpen(true);
  };
  const openContactModal = (target) => {
    setContactTarget(target);
    setCopiedContactEmail("");
  };
  const closeContactModal = () => {
    setContactTarget(null);
    setCopiedContactEmail("");
  };
  const closeSignup = () => {
    setIsSignupOpen(false);
    setSignupError("");
    setSignupStatus("");
  };
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

  const handleCopyContactEmail = async (emailAddress) => {
    if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
      setCopiedContactEmail("");
      return;
    }

    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopiedContactEmail(emailAddress);
    } catch {
      setCopiedContactEmail("");
    }
  };

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

  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    const email = signupEmail.trim();
    const name = signupName.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setSignupError("");
    setSignupStatus("");

    if (!emailPattern.test(email)) {
      setSignupError("Please enter a valid email address.");
      return;
    }

    setIsSubmittingSignup(true);

    try {
      await submitEmailSignup({ email, name });
      setSignupStatus("Thanks. You’re signed up for email updates.");
      setSignupName("");
      setSignupEmail("");
    } catch (error) {
      const duplicateSignup =
        error?.code === "23505" ||
        error?.message?.toLowerCase().includes("duplicate key") ||
        error?.details?.toLowerCase().includes("already exists");

      if (!signupConfigured) {
        setSignupError("Signup is not connected yet. Add the Supabase project keys to enable submissions.");
      } else if (duplicateSignup) {
        setSignupError("That email address is already signed up.");
      } else {
        setSignupError("We couldn’t save your signup right now. Please try again.");
      }
    } finally {
      setIsSubmittingSignup(false);
    }
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

  useEffect(() => {
    void trackPageView(pagePath, "Home");
  }, [pagePath]);

  useEffect(() => {
    let cancelled = false;

    if (!instagramFeedEnabled || !instagramFeedConfigured) {
      setInstagramPosts([]);
      setInstagramError("");
      setInstagramLoading(false);
      return undefined;
    }

    const loadFeed = async () => {
      setInstagramLoading(true);
      setInstagramError("");

      try {
        const posts = await fetchInstagramFeed(5);
        if (!cancelled) {
          setInstagramPosts(posts);
        }
      } catch (error) {
        if (!cancelled) {
          setInstagramError(error?.message || "We couldn’t load the Instagram feed.");
        }
      } finally {
        if (!cancelled) {
          setInstagramLoading(false);
        }
      }
    };

    void loadFeed();

    return () => {
      cancelled = true;
    };
  }, [instagramFeedConfigured, instagramFeedEnabled]);

  return (
    <div className="app-shell" onClickCapture={handleAnalyticsClickCapture}>
      <header className="site-header">
        <a className="brand" href="#top" aria-label={`${festival.name} home`} data-analytics-event="button_click" data-analytics-label="Brand: Sama Brighton 2026" data-analytics-section="Header">
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
          <a href="#programme" onClick={closeMenu} data-analytics-event="button_click" data-analytics-label="Navigation: Programme" data-analytics-section="Header">
            Programme
          </a>
          <a href="about.html" onClick={closeMenu} data-analytics-event="button_click" data-analytics-label="Navigation: About" data-analytics-section="Header">
            About
          </a>
          <a href="#venues" onClick={closeMenu} data-analytics-event="button_click" data-analytics-label="Navigation: Venues" data-analytics-section="Header">
            Venues
          </a>
          <a href="#news" onClick={closeMenu} data-analytics-event="button_click" data-analytics-label="Navigation: News" data-analytics-section="Header">
            News
          </a>
          <a href="#contact" onClick={closeMenu} data-analytics-event="button_click" data-analytics-label="Navigation: Contact" data-analytics-section="Header">
            Contact
          </a>
          <button
            type="button"
            className="button button-primary button-inline site-nav-cta"
            onClick={openSignup}
            data-analytics-event="button_click"
            data-analytics-label="Navigation: Sign Up For Updates"
            data-analytics-section="Header"
          >
            Sign Up for Updates
          </button>
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
              {festival.dateRange}.{" "}
              {festival.description.split("\n").map((line, index) => (
                <Fragment key={`${line}-${index}`}>
                  {index > 0 ? <br /> : null}
                  {line}
                </Fragment>
              ))}
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#programme" data-analytics-event="button_click" data-analytics-label="Explore Programme" data-analytics-section="Hero">
                Explore Programme
              </a>
              <a className="button button-secondary" href="#news" data-analytics-event="button_click" data-analytics-label="Social + News" data-analytics-section="Hero">
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
                  <div className={event.id === selectedEvent.id ? "day-pill is-active" : "day-pill"}>
                    <button
                      type="button"
                      className="day-pill-content"
                      onClick={() => selectEvent(event.id)}
                      data-analytics-event="button_click"
                      data-analytics-label={`Festival Week: ${event.heroTitle ?? event.title}`}
                      data-analytics-section="Festival Week"
                    >
                      <span>
                        {event.heroDayLabel ?? event.dayLabel} • {event.heroStartTime ?? event.startTime}
                      </span>
                      <strong>{event.heroTitle ?? event.title}</strong>
                      {(event.heroVenue ?? event.venue) ? (
                        <small className="day-pill-venue">{event.heroVenue ?? event.venue}</small>
                      ) : null}
                    </button>
                    {event.ticketUrl ? (
                      <a
                        className="button button-secondary hero-ticket-button"
                        href={event.ticketUrl}
                        target="_blank"
                        rel="noreferrer"
                        data-analytics-event="button_click"
                        data-analytics-label={`Tickets: ${event.heroTitle ?? event.title}`}
                        data-analytics-section="Festival Week"
                      >
                        Tickets
                      </a>
                    ) : event.ticketPending ? (
                      <button type="button" className="button button-secondary hero-ticket-button is-disabled" disabled>
                        Tickets
                      </button>
                    ) : null}
                  </div>
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
                  data-analytics-event="button_click"
                  data-analytics-label={`Programme: ${event.title}`}
                  data-analytics-section="Programme"
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
                        <NoteContent
                          key={typeof note === "string" ? note : `${note.prefix ?? ""}-${note.link?.label ?? ""}`}
                          note={note}
                        />
                      ))}
                    </div>
                  ) : null}
                  <span className="event-card-mobile-hint">Tap to read more</span>
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
                  <div className="focus-meta-row">
                    <p className="focus-meta">{selectedEvent.venue}</p>
                    {selectedEvent.ticketUrl ? (
                      <a
                        className="button button-secondary focus-ticket-button"
                        href={selectedEvent.ticketUrl}
                        target="_blank"
                        rel="noreferrer"
                        data-analytics-event="button_click"
                        data-analytics-label={`Tickets: ${selectedEvent.title}`}
                        data-analytics-section="Selected Event"
                      >
                        Tickets
                      </a>
                    ) : null}
                  </div>
                  {selectedEvent.subtitle ? <p className="focus-subtitle">{selectedEvent.subtitle}</p> : null}
                  {selectedEvent.detailSummary ?? selectedEvent.summary ? (
                    <p>{selectedEvent.detailSummary ?? selectedEvent.summary}</p>
                  ) : null}
                  {selectedEvent.programmeNotes?.length ? (
                    <div className="film-programme-notes">
                      {selectedEvent.programmeNotes.map((note) => (
                        <NoteContent key={typeof note === "string" ? note : `${note.prefix}-${note.link?.label ?? ""}`} note={note} />
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
                          {primaryFilm.directorMeta ? ` ${primaryFilm.directorMeta}` : ""}
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
                                  className={[
                                    block.type === "label" ? "detail-label" : "",
                                    block.emphasis === "strong" ? "note-strong" : "",
                                  ]
                                    .filter(Boolean)
                                    .join(" ")}
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
                              <NoteContent key={typeof note === "string" ? note : `${note.prefix}-${note.link?.label ?? ""}`} note={note} />
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
                          {film.directorMeta ? ` ${film.directorMeta}` : ""}
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
              <a
                className="focus-card-mobile-return"
                href="#programme"
                data-analytics-event="button_click"
                data-analytics-label="Return to programme"
                data-analytics-section="Selected Event"
              >
                Return to programme
              </a>
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
                  <a href={venue.website} target="_blank" rel="noreferrer" data-analytics-event="button_click" data-analytics-label={`${venue.name} venue website`} data-analytics-section="Venues">
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
            {!instagramFeedEnabled ? <p className="section-placeholder">Under construction</p> : null}
          </div>
          {instagramFeedEnabled ? (
            <InstagramCarousel
              items={instagramPosts}
              loading={instagramLoading}
              error={instagramError}
              configured={instagramFeedConfigured}
            />
          ) : null}
        </section>

        <section id="contact" className="visit panel">
          <div className="visit-card">
            <p className="eyebrow">Contact</p>
            <h2>Connect with SAMA Brighton</h2>
            <div className="contact-actions">
              <button
                type="button"
                className="button button-secondary button-inline"
                onClick={() =>
                  openContactModal({
                    label: "Sama Brighton",
                    email: "brightonsama@proton.me",
                  })
                }
                data-analytics-event="button_click"
                data-analytics-label="Contact Festival Team"
                data-analytics-section="Contact"
              >
                Email
              </button>
              <a className="button button-secondary" href="https://www.instagram.com/samabrighton/" target="_blank" rel="noreferrer" data-analytics-event="button_click" data-analytics-label="Instagram" data-analytics-section="Contact">
                Instagram
              </a>
              <a
                className="button button-secondary"
                href="https://www.facebook.com/events/2206935580137425"
                target="_blank"
                rel="noreferrer"
                data-analytics-event="button_click"
                data-analytics-label="Facebook"
                data-analytics-section="Contact"
              >
                Facebook
              </a>
            </div>
            <div className="contact-cta-row">
              <button
                type="button"
                className="button button-primary button-inline"
                onClick={() =>
                  openContactModal({
                    label: "Sama Brighton",
                    email: "brightonsama@proton.me",
                  })
                }
                data-analytics-event="button_click"
                data-analytics-label="Contact Festival Team"
                data-analytics-section="Contact"
              >
                Contact Festival Team
              </button>
              <button
                type="button"
                className="button button-primary button-inline"
                onClick={() =>
                  openContactModal({
                    label: "Stories from Nowhere",
                    email: "hello@storiesfromnowhere.org",
                  })
                }
                data-analytics-event="button_click"
                data-analytics-label="Contact Stories from Nowhere"
                data-analytics-section="Contact"
              >
                Contact Stories from Nowhere
              </button>
              <button
                type="button"
                className="button button-primary button-inline"
                onClick={openSignup}
                data-analytics-event="button_click"
                data-analytics-label="Open email signup"
                data-analytics-section="Contact"
              >
                Sign Up For Updates
              </button>
            </div>
          </div>
        </section>

        <footer className="site-footer panel">
          <p className="footer-thanks">
            With thanks to{" "}
            <a
              href={sponsorLinks.chalkCliffTrust}
              target="_blank"
              rel="noreferrer"
              data-analytics-event="button_click"
              data-analytics-label="Footer Sponsor: Chalk Cliff Trust"
              data-analytics-section="Footer"
            >
              Chalk Cliff Trust
            </a>{" "}
            and{" "}
            <a
              href={sponsorLinks.enjoolataFoundation}
              target="_blank"
              rel="noreferrer"
              data-analytics-event="button_click"
              data-analytics-label="Footer Sponsor: Enjoolata Foundation"
              data-analytics-section="Footer"
            >
              Enjoolata Foundation
            </a>{" "}
            for their generous support
          </p>
          <div className="funder-logos" aria-label="Funder logos">
            <a
              href={sponsorLinks.chalkCliffTrust}
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Chalk Cliff Trust"
              data-analytics-event="button_click"
              data-analytics-label="Footer Logo: Chalk Cliff Trust"
              data-analytics-section="Footer"
            >
              <img
                className="funder-logo funder-logo-chalk"
                src={assetPath("Artwork/chalk-cliff-trust-logo-rgb_full-colour.png")}
                alt="Chalk Cliff Trust logo"
              />
            </a>
            <a
              href={sponsorLinks.enjoolataFoundation}
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Enjoolata Foundation"
              data-analytics-event="button_click"
              data-analytics-label="Footer Logo: Enjoolata Foundation"
              data-analytics-section="Footer"
            >
              <img
                className="funder-logo funder-logo-enjoolata"
                src={assetPath("Artwork/enjoolata-logo-solid-PRINTING.png")}
                alt="Enjoolata Foundation logo"
              />
            </a>
          </div>
          <div className="footer-stories">
            <p className="footer-stories-text">Sama Brighton 2026 is brought to you by Stories from Nowhere CIC.</p>
            <img
              className="footer-stories-logo"
              src={assetPath("Artwork/stories-from-nowhere-logo-transparent.png")}
              alt="Stories from Nowhere logo"
            />
          </div>
        </footer>
      </main>
      {contactTarget ? (
        <div className="modal-backdrop" role="presentation" onClick={closeContactModal}>
          <div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <p className="eyebrow">Contact</p>
                <h3 id="contact-modal-title">Contact {contactTarget.label}</h3>
              </div>
              <button type="button" className="modal-close" onClick={closeContactModal} aria-label="Close contact details">
                Close
              </button>
            </div>
            <p className="modal-copy">
              Use the email address below to get in touch.
            </p>
            <div className="contact-modal-card">
              <p className="contact-modal-label">Email address</p>
              <p className="contact-modal-email">{contactTarget.email}</p>
              <div className="signup-actions">
                <button
                  type="button"
                  className="button button-primary button-inline"
                  onClick={() => handleCopyContactEmail(contactTarget.email)}
                  data-analytics-event="button_click"
                  data-analytics-label={`Copy email: ${contactTarget.label}`}
                  data-analytics-section="Contact Modal"
                >
                  Copy email address
                </button>
              </div>
              {copiedContactEmail === contactTarget.email ? (
                <p className="signup-message signup-message-success">Email address copied.</p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
      {isSignupOpen ? (
        <div className="modal-backdrop" role="presentation" onClick={closeSignup}>
          <div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="signup-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <p className="eyebrow">Email Updates</p>
                <h3 id="signup-modal-title">Sign up for Sama Brighton updates</h3>
              </div>
              <button type="button" className="modal-close" onClick={closeSignup} aria-label="Close signup form">
                Close
              </button>
            </div>
            <p className="modal-copy">
              Leave your email address below (name optional) to receive occasional festival updates.
            </p>
            <form className="signup-form" onSubmit={handleSignupSubmit}>
              <label className="signup-field" htmlFor="signup-email">
                Email address
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  value={signupEmail}
                  onChange={(event) => setSignupEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </label>
              <label className="signup-field" htmlFor="signup-name">
                Name
                <input
                  id="signup-name"
                  name="name"
                  type="text"
                  value={signupName}
                  onChange={(event) => setSignupName(event.target.value)}
                  placeholder="Optional"
                  autoComplete="name"
                />
              </label>
              {signupError ? <p className="signup-message signup-message-error">{signupError}</p> : null}
              {signupStatus ? <p className="signup-message signup-message-success">{signupStatus}</p> : null}
              {!signupConfigured ? (
                <p className="signup-helper">
                  Supabase integration point is ready, but project keys still need to be added before submissions can be saved.
                </p>
              ) : null}
              <div className="signup-actions">
                <button
                  type="submit"
                  className="button button-primary"
                  disabled={isSubmittingSignup}
                  data-analytics-event="button_click"
                  data-analytics-label="Submit email signup"
                  data-analytics-section="Email Updates"
                >
                  {isSubmittingSignup ? "Submitting..." : "Submit"}
                </button>
                <button type="button" className="button button-secondary" onClick={closeSignup}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
