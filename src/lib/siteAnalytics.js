const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://cfdyavdfnwkrhxopdmut.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_K7aRut6hWjbTjcK-xOEgwA_xhOaOno7";
const hostedAnalyticsHost = "brighton.samaiff.com";

const siteEventsEndpoint = supabaseUrl ? `${supabaseUrl}/rest/v1/site_events` : "";
const visitorStorageKey = "sama-visitor-id";
const sessionStorageKey = "sama-session-id";

const getStorageValue = (storage, key) => {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
};

const setStorageValue = (storage, key, value) => {
  try {
    storage.setItem(key, value);
  } catch {
    // Ignore storage failures in private browsing modes.
  }
};

const generateId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const getCurrentHostname = () => {
  if (typeof window === "undefined") {
    return "";
  }

  return window.location.hostname;
};

const shouldTrackAnalytics = () => getCurrentHostname() === hostedAnalyticsHost;
const qualifyPage = (page) => {
  const hostname = getCurrentHostname();

  return hostname ? `${hostname}${page}` : page;
};

const getVisitorId = () => {
  if (typeof window === "undefined") {
    return generateId();
  }

  const existing = getStorageValue(window.localStorage, visitorStorageKey);
  if (existing) {
    return existing;
  }

  const visitorId = generateId();
  setStorageValue(window.localStorage, visitorStorageKey, visitorId);
  return visitorId;
};

const getSessionId = () => {
  if (typeof window === "undefined") {
    return generateId();
  }

  const existing = getStorageValue(window.sessionStorage, sessionStorageKey);
  if (existing) {
    return existing;
  }

  const sessionId = generateId();
  setStorageValue(window.sessionStorage, sessionStorageKey, sessionId);
  return sessionId;
};

export const isAnalyticsConfigured = () => Boolean(supabaseUrl && supabaseAnonKey);

export const recordSiteEvent = async ({ eventName, page, label, section, href }) => {
  if (!isAnalyticsConfigured() || !shouldTrackAnalytics()) {
    return false;
  }

  try {
    const response = await fetch(siteEventsEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        Prefer: "return=minimal",
      },
      keepalive: true,
      body: JSON.stringify({
        event_name: eventName,
        page: qualifyPage(page),
        label: label ?? null,
        section: section ?? null,
        href: href ?? null,
        visitor_id: getVisitorId(),
        session_id: getSessionId(),
      }),
    });

    return response.ok;
  } catch {
    return false;
  }
};

export const trackPageView = (page, label) =>
  recordSiteEvent({
    eventName: "page_view",
    page,
    label,
    section: "page",
  });

export const fetchSiteEvents = async () => {
  if (!isAnalyticsConfigured()) {
    throw new Error("Analytics backend not configured yet.");
  }

  const response = await fetch(
    `${siteEventsEndpoint}?select=id,event_name,page,label,section,href,visitor_id,session_id,created_at&order=created_at.asc`,
    {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw {
      status: response.status,
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    };
  }

  return response.json();
};
