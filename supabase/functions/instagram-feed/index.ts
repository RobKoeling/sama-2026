// Supabase Edge Function scaffold for the Instagram feed carousel.
// Set these secrets in Supabase:
// - INSTAGRAM_USER_ID
// - INSTAGRAM_ACCESS_TOKEN
//
// The frontend should point VITE_INSTAGRAM_FEED_URL at the deployed function URL.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GRAPH_VERSION = "v24.0";

const jsonResponse = (body: unknown, init: ResponseInit = {}) =>
  new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
      ...(init.headers || {}),
    },
  });

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const userId = Deno.env.get("INSTAGRAM_USER_ID");
  const accessToken = Deno.env.get("INSTAGRAM_ACCESS_TOKEN");

  if (!userId || !accessToken) {
    return jsonResponse(
      {
        message: "Instagram feed is not configured yet.",
        details: "Set INSTAGRAM_USER_ID and INSTAGRAM_ACCESS_TOKEN in the Supabase function secrets.",
      },
      { status: 501 },
    );
  }

  const requestUrl = new URL(request.url);
  const limit = Math.min(Math.max(Number(requestUrl.searchParams.get("limit") || 5), 1), 5);

  const graphUrl = new URL(`https://graph.facebook.com/${GRAPH_VERSION}/${userId}/media`);
  graphUrl.searchParams.set(
    "fields",
    "id,caption,media_url,thumbnail_url,media_type,permalink,timestamp",
  );
  graphUrl.searchParams.set("limit", String(limit));
  graphUrl.searchParams.set("access_token", accessToken);

  const response = await fetch(graphUrl.toString());
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    return jsonResponse(
      {
        message: "Instagram Graph API request failed.",
        status: response.status,
        details: payload,
      },
      { status: response.status },
    );
  }

  return jsonResponse(payload);
});
