import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import { fetchEmailSignups } from "./lib/emailSignup";
import { fetchSiteEvents } from "./lib/siteAnalytics";
import "./styles.css";

const ADMIN_PASSWORD = "SamaBrighton2026!";
const UNLOCK_KEY = "sama-admin-unlocked";
const HOSTED_ANALYTICS_HOST = "samaiff.com";

const isHostedAnalyticsEvent = (event) => {
  const pageMatches =
    typeof event.page === "string" && event.page.includes(`${HOSTED_ANALYTICS_HOST}/`);
  const hostMatches =
    typeof event.site_host === "string" && event.site_host.endsWith(HOSTED_ANALYTICS_HOST);

  return pageMatches || hostMatches;
};

const formatDateTime = (value) => {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

function AdminPage() {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(
    () => typeof window !== "undefined" && window.sessionStorage.getItem(UNLOCK_KEY) === "true",
  );
  const [unlockError, setUnlockError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [signups, setSignups] = useState([]);
  const [subject, setSubject] = useState("Sama Brighton update");
  const [message, setMessage] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const [analyticsEvents, setAnalyticsEvents] = useState([]);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsError, setAnalyticsError] = useState("");
  const pagePath = typeof window !== "undefined" ? window.location.pathname : "/admin.html";

  const recipientEmails = useMemo(
    () => signups.map((signup) => signup.email).filter(Boolean),
    [signups],
  );

  const analyticsSummary = useMemo(() => {
    const pageViews = analyticsEvents.filter(
      (event) => event.event_name === "page_view" && isHostedAnalyticsEvent(event),
    );
    const clickEvents = analyticsEvents.filter(
      (event) => event.event_name !== "page_view" && isHostedAnalyticsEvent(event),
    );
    const uniqueVisitors = new Set(pageViews.map((event) => event.visitor_id)).size;
    const interactionCounts = new Map();

    for (const event of clickEvents) {
      const key = `${event.section ?? "Other"}|||${event.label ?? event.event_name}`;
      interactionCounts.set(key, (interactionCounts.get(key) ?? 0) + 1);
    }

    const topInteractions = [...interactionCounts.entries()]
      .map(([key, count]) => {
        const [section, label] = key.split("|||");
        return { section, label, count };
      })
      .sort((a, b) => b.count - a.count);

    return {
      pageViews: pageViews.length,
      uniqueVisitors,
      clickEvents: clickEvents.length,
      topInteractions,
      allInteractions: topInteractions,
    };
  }, [analyticsEvents]);

  const topThreeInteractions = analyticsSummary.topInteractions.slice(0, 3);

  const mailtoHref = useMemo(() => {
    if (!recipientEmails.length) {
      return "";
    }

    return `mailto:?bcc=${encodeURIComponent(recipientEmails.join(","))}&subject=${encodeURIComponent(subject.trim())}&body=${encodeURIComponent(message.trim())}`;
  }, [message, recipientEmails, subject]);

  const loadSubscribers = async () => {
    setIsLoading(true);
    setLoadError("");

    try {
      const rows = await fetchEmailSignups();
      setSignups(rows);
    } catch (error) {
      const suffix = error?.status ? ` (Supabase returned ${error.status})` : "";
      setLoadError(
        error?.message ||
          `We couldn’t load the subscriber list${suffix}. If this persists, rerun the updated Supabase SQL so the read policy is in place.`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const loadAnalytics = async () => {
    setAnalyticsLoading(true);
    setAnalyticsError("");

    try {
      const rows = await fetchSiteEvents();
      setAnalyticsEvents(rows);
    } catch (error) {
      const suffix = error?.status ? ` (Supabase returned ${error.status})` : "";
      setAnalyticsError(
        error?.message ||
          `We couldn’t load the site stats${suffix}. If this persists, run the analytics SQL so the read policy is in place.`,
      );
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const loadDashboard = async () => {
    await Promise.all([loadSubscribers(), loadAnalytics()]);
  };

  useEffect(() => {
    if (isUnlocked) {
      void loadDashboard();
    }
  }, [isUnlocked]);

  const handleUnlock = (event) => {
    event.preventDefault();

    if (password !== ADMIN_PASSWORD) {
      setUnlockError("Incorrect password.");
      return;
    }

    window.sessionStorage.setItem(UNLOCK_KEY, "true");
    setPassword("");
    setUnlockError("");
    setIsUnlocked(true);
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem(UNLOCK_KEY);
    setIsUnlocked(false);
    setPassword("");
    setMessage("");
    setSubject("Sama Brighton update");
    setSelectedFileName("");
    setCopyStatus("");
    setLoadError("");
    setAnalyticsError("");
  };

  const handleImportDocument = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      const text = await file.text();
      setMessage(text);
      setSelectedFileName(file.name);
      setCopyStatus(`Loaded ${file.name}.`);
    } catch {
      setCopyStatus("We couldn’t read that file.");
    } finally {
      event.target.value = "";
    }
  };

  const copyToClipboard = async (text, successMessage) => {
    if (!navigator.clipboard?.writeText) {
      setCopyStatus("Clipboard access is unavailable in this browser.");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus(successMessage);
    } catch {
      setCopyStatus("We couldn’t copy that right now.");
    }
  };

  const openMailDraft = () => {
    if (!mailtoHref) {
      setCopyStatus("There are no subscriber emails yet.");
      return;
    }

    window.location.href = mailtoHref;
  };

  if (!isUnlocked) {
    return (
      <div className="app-shell admin-shell">
        <header className="site-header">
          <a className="brand" href="index.html" aria-label="Sama Brighton home">
            <span className="brand-mark">Sama Brighton</span>
            <span className="brand-year">2026</span>
          </a>
          <a className="button button-secondary" href="index.html">
            Back to site
          </a>
        </header>
        <main className="admin-main">
          <section className="panel admin-login">
            <p className="eyebrow">Mailing List</p>
            <h1>Mailing List</h1>
            <p className="admin-intro">
              This is a simple password gate for the team email tools. Once unlocked, you can load the current
              subscriber list from Supabase and prepare an update message.
            </p>
            <form className="signup-form" onSubmit={handleUnlock}>
              <label className="signup-field" htmlFor="admin-password">
                Password
                <input
                  id="admin-password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                />
              </label>
              {unlockError ? <p className="signup-message signup-message-error">{unlockError}</p> : null}
              <div className="signup-actions">
                <button type="submit" className="button button-primary">
                  Unlock
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="app-shell admin-shell">
      <header className="site-header">
        <a className="brand" href="index.html" aria-label="Sama Brighton home">
          <span className="brand-mark">Sama Brighton</span>
          <span className="brand-year">2026</span>
        </a>
        <div className="admin-header-actions">
          <a className="button button-secondary" href="index.html">
            Back to site
          </a>
          <button type="button" className="button button-secondary" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </header>

      <main className="admin-main">
        <section className="panel admin-dashboard">
          <div className="admin-dashboard-header">
            <div>
              <p className="eyebrow">Mailing List</p>
              <h1>Mailing List</h1>
              <p className="admin-intro">
                Compose a short update here or import a text document, then open your email client with the current
                subscriber list in BCC.
              </p>
            </div>
            <div className="admin-stats">
              <div className="admin-stat">
                <strong>{analyticsSummary.pageViews}</strong>
                <span>Visits</span>
              </div>
              <div className="admin-stat">
                <strong>{analyticsSummary.uniqueVisitors}</strong>
                <span>Visitors</span>
              </div>
              <div className="admin-stat">
                <strong>{analyticsSummary.clickEvents}</strong>
                <span>Button clicks</span>
              </div>
              <div className="admin-stat">
                <strong>{recipientEmails.length}</strong>
                <span>Subscribers</span>
              </div>
            </div>
            <div className="admin-top-buttons">
              <p className="eyebrow">Top clicked buttons</p>
              <div className="admin-top-button-row">
                {topThreeInteractions.length ? (
                  topThreeInteractions.map((item) => (
                    <div key={`${item.section}-${item.label}`} className="admin-top-button" role="group" aria-label={`${item.label}, ${item.count} clicks`}>
                      <span className="admin-top-button-label">{item.label}</span>
                      <span className="admin-top-button-count">{item.count}</span>
                    </div>
                  ))
                ) : (
                  <p className="signup-helper">No tracked button clicks yet.</p>
                )}
              </div>
            </div>
          </div>

          <div className="admin-grid">
            <section className="admin-card">
              <p className="eyebrow">Compose</p>
              <label className="signup-field" htmlFor="admin-subject">
                Subject
                <input
                  id="admin-subject"
                  name="subject"
                  type="text"
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                />
              </label>
              <label className="signup-field" htmlFor="admin-message">
                Message
                <textarea
                  id="admin-message"
                  name="message"
                  rows="12"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Write the update you want to send..."
                />
              </label>
              <label className="signup-field admin-file-field" htmlFor="admin-import">
                Import plain text document
                <input
                  id="admin-import"
                  name="import"
                  type="file"
                  accept=".txt,.md,.html,.htm,.eml,.text"
                  onChange={handleImportDocument}
                />
              </label>
              {selectedFileName ? <p className="admin-file-name">Loaded: {selectedFileName}</p> : null}
              <div className="signup-actions">
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => copyToClipboard(recipientEmails.join("\n"), "Recipient list copied to clipboard.")}
                >
                  Copy recipient list
                </button>
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => copyToClipboard(message, "Message copied to clipboard.")}
                >
                  Copy message
                </button>
                <button type="button" className="button button-primary" onClick={openMailDraft}>
                  Open mail draft
                </button>
              </div>
              {copyStatus ? <p className="signup-message signup-message-success">{copyStatus}</p> : null}
              <p className="signup-helper">
                The draft uses BCC for all current subscribers. If you want a true one-click sender later, we can wire
                this to an email service.
              </p>
            </section>

            <section className="admin-card">
              <div className="admin-list-header">
                <p className="eyebrow">Subscribers</p>
                <button type="button" className="button button-secondary button-inline" onClick={loadDashboard}>
                  Refresh
                </button>
              </div>
              {loadError ? <p className="signup-message signup-message-error">{loadError}</p> : null}
              {analyticsError ? <p className="signup-message signup-message-error">{analyticsError}</p> : null}
              {isLoading ? <p className="signup-helper">Loading subscribers…</p> : null}
              {analyticsLoading ? <p className="signup-helper">Loading stats…</p> : null}
              {!loadError ? (
                <p className="signup-helper">
                  If the list stays empty, check that the updated Supabase SQL has been run and the read policy is
                  enabled.
                </p>
              ) : null}
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Signed up</th>
                    </tr>
                  </thead>
                  <tbody>
                    {signups.length ? (
                      signups.map((signup) => (
                        <tr key={signup.id}>
                          <td>{signup.name || "—"}</td>
                          <td>{signup.email}</td>
                          <td>{formatDateTime(signup.created_at)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="admin-empty">
                          {isLoading ? "Loading…" : "No subscribers yet."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
          <section className="admin-card admin-overview-card">
            <details className="admin-overview">
              <summary>Complete click overview</summary>
              {analyticsSummary.allInteractions.length ? (
                <ul className="admin-interaction-list">
                  {analyticsSummary.allInteractions.map((item) => (
                    <li key={`${item.section}-${item.label}`}>
                      <strong>{item.label}</strong>
                      <span>
                        {item.section} • {item.count}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="signup-helper">No tracked button clicks yet.</p>
              )}
            </details>
          </section>
        </section>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AdminPage />
  </React.StrictMode>,
);
