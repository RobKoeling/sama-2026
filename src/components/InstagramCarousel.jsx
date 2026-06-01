import { useMemo, useRef } from "react";

const formatInstagramDate = (value) => {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en-GB", {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
};

const excerptCaption = (caption) => {
  if (!caption) {
    return "Recent post from the SAMA Brighton Instagram feed.";
  }

  return caption.length > 150 ? `${caption.slice(0, 147)}…` : caption;
};

export default function InstagramCarousel({
  items = [],
  loading = false,
  error = "",
  configured = false,
  feedEnabled = false,
  handleLabel = "@samabrighton",
  profileUrl = "",
}) {
  const trackRef = useRef(null);
  const posts = useMemo(() => items.slice(0, 5), [items]);
  const showNav = posts.length > 1;
  const fallbackCopy = !feedEnabled
    ? `Follow ${handleLabel} on Instagram while we keep the live feed switched off-site.`
    : !configured
      ? "The account is linked. Add the deployed feed endpoint URL to surface the latest five posts here."
      : error
        ? `The live feed hit a snag, but the Instagram profile is still linked below.`
        : `Once the feed endpoint is connected, this carousel will show the latest five Instagram posts.`;

  const scroll = (direction) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    track.scrollBy({
      left: direction * Math.max(track.clientWidth * 0.82, 280),
      behavior: "smooth",
    });
  };

  return (
    <div className="instagram-feed">
      <div className="instagram-feed-header">
        <div>
          <p className="eyebrow">Instagram</p>
          <h2>Latest from {handleLabel}</h2>
        </div>
        <div className="instagram-carousel-nav">
          {showNav ? (
            <>
              <button type="button" className="button button-secondary" onClick={() => scroll(-1)} aria-label="Scroll posts left">
                Prev
              </button>
              <button type="button" className="button button-secondary" onClick={() => scroll(1)} aria-label="Scroll posts right">
                Next
              </button>
            </>
          ) : null}
          {profileUrl ? (
            <a href={profileUrl} target="_blank" rel="noreferrer" className="button button-secondary">
              Visit profile
            </a>
          ) : null}
        </div>
      </div>

      {!feedEnabled ? (
        <p className="instagram-feed-empty">
          The account is wired in. Turn on the feed endpoint when you want recent posts to appear here automatically.
        </p>
      ) : null}

      {feedEnabled && !configured ? (
        <p className="instagram-feed-empty">
          The feed carousel is ready, but it still needs a deployed endpoint URL before it can fetch any Instagram posts.
        </p>
      ) : null}

      {loading ? <p className="instagram-feed-empty">Loading Instagram posts…</p> : null}
      {error ? <p className="signup-message signup-message-error">{error}</p> : null}

      {posts.length ? (
        <div className="instagram-carousel-track" ref={trackRef}>
          {posts.map((post) => {
            const mediaUrl = post.thumbnailUrl || post.mediaUrl;

            return (
              <article key={post.id} className="instagram-post">
                <a href={post.permalink || mediaUrl} target="_blank" rel="noreferrer" className="instagram-post-link">
                  <div className="instagram-post-media">
                    {mediaUrl ? <img src={mediaUrl} alt={post.caption || post.title} /> : <div className="instagram-post-fallback">Instagram</div>}
                    <span className="instagram-post-badge">{handleLabel}</span>
                  </div>
                  <div className="instagram-post-copy">
                    <div className="instagram-post-meta">
                      <span>{post.mediaType}</span>
                      {post.timestamp ? <span>{formatInstagramDate(post.timestamp)}</span> : null}
                    </div>
                    <h3>{post.title}</h3>
                    <p>{excerptCaption(post.caption)}</p>
                  </div>
                </a>
              </article>
            );
          })}
        </div>
      ) : (
        !loading ? (
          <div className="instagram-feed-empty instagram-feed-empty-card">
            <p className="signup-helper">{fallbackCopy}</p>
            {profileUrl ? (
              <div className="instagram-feed-cta">
                <a href={profileUrl} target="_blank" rel="noreferrer" className="button button-secondary">
                  Follow {handleLabel}
                </a>
              </div>
            ) : null}
          </div>
        ) : null
      )}
    </div>
  );
}
