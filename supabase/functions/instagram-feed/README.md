# Instagram feed function

This Edge Function returns the latest Instagram posts for the News + Social carousel.

## Secrets

Set these secrets in Supabase:

- `INSTAGRAM_USER_ID`
- `INSTAGRAM_ACCESS_TOKEN`

## Deploy

Deploy the function from the Supabase CLI:

```bash
supabase functions deploy instagram-feed
```

## Frontend

The site can point at:

```text
https://cfdyavdfnwkrhxopdmut.supabase.co/functions/v1/instagram-feed
```

Override it with `VITE_INSTAGRAM_FEED_URL` if you want to use a different deployment.
