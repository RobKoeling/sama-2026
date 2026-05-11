const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://cfdyavdfnwkrhxopdmut.supabase.co";
const instagramFeedUrl =
  import.meta.env.VITE_INSTAGRAM_FEED_URL || `${supabaseUrl}/functions/v1/instagram-feed`;

const toArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (value && Array.isArray(value.data)) {
    return value.data;
  }

  return [];
};

const normalizePost = (post) => {
  const mediaUrl = post.media_url || post.thumbnail_url || post.image_url || "";
  const caption = typeof post.caption === "string" ? post.caption.trim() : "";
  const title = post.title || post.name || caption.slice(0, 60) || "Instagram post";

  return {
    id: post.id || post.permalink || `${title}-${mediaUrl}`,
    title,
    caption,
    mediaType: (post.media_type || post.type || "IMAGE").toUpperCase(),
    mediaUrl,
    thumbnailUrl: post.thumbnail_url || post.media_url || "",
    permalink: post.permalink || post.url || "",
    timestamp: post.timestamp || post.created_time || post.date || "",
  };
};

export const isInstagramFeedConfigured = () => Boolean(instagramFeedUrl);

export const fetchInstagramFeed = async (limit = 5) => {
  if (!instagramFeedUrl) {
    return [];
  }

  const response = await fetch(`${instagramFeedUrl}${instagramFeedUrl.includes("?") ? "&" : "?"}limit=${limit}`, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw {
      status: response.status,
      message: error.message || "Unable to load the Instagram feed.",
      details: error.details,
      hint: error.hint,
    };
  }

  const payload = await response.json();

  return toArray(payload).map(normalizePost).slice(0, limit);
};
