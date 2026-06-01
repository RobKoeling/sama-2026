export const buildSupabaseError = async (response) => {
  const error = await response.json().catch(() => ({}));

  return {
    status: response.status,
    code: error.code,
    message: error.message,
    details: error.details,
    hint: error.hint,
  };
};

export const fetchSupabaseRows = async ({
  endpoint,
  supabaseAnonKey,
  select,
  order,
  pageSize = 1000,
}) => {
  const rows = [];

  for (let offset = 0; ; offset += pageSize) {
    const url = new URL(endpoint);
    url.searchParams.set("select", select);
    url.searchParams.set("limit", String(pageSize));
    url.searchParams.set("offset", String(offset));

    if (order) {
      url.searchParams.set("order", order);
    }

    const response = await fetch(url, {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw await buildSupabaseError(response);
    }

    const page = await response.json();
    rows.push(...page);

    if (page.length < pageSize) {
      break;
    }
  }

  return rows;
};
