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

export default function InstagramCarousel({ items = [], loading = false, error = "", configured = false }) {
  const trackRef = useRef(null);
  const posts = useMemo(() => items.slice(0, 5), [items]);

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
          <h2>Latest from @samabrighton</h2>
        </div>
        <div className="instagram-carousel-nav">
          <button type="button" className="button button-secondary" onClick={() => scroll(-1)} aria-label="Scroll posts left">
            Prev
          </button>
          <button type="button" className="button button-secondary" onClick={() => scroll(1)} aria-label="Scroll posts right">
            Next
          </button>
        </div>
      </div>

      {!configured ? (
        <p className="instagram-feed-empty">
          The feed carousel is ready, but it still needs a small Instagram-backed endpoint to supply the latest five posts.
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
                    <span className="instagram-post-badge">@samabrighton</span>
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
        !loading && !error ? (
          <div className="instagram-feed-empty instagram-feed-empty-card">
            <p className="signup-helper">
              Once the feed endpoint is connected, this carousel will show the latest five Instagram posts.
            </p>
          </div>
        ) : null
      )}
    </div>
  );
}
