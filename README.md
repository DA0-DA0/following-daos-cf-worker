# following-daos-cf-worker

A [Cloudflare Worker](https://workers.cloudflare.com/) that manages a wallet's
following list of DAOs.

Used template for [Cosmos wallet
authentication](https://github.com/NoahSaso/cloudflare-worker-cosmos-auth) to
authenticate requests via a [Cosmos](https://cosmos.network) wallet signature.

## Development

### Run locally

```sh
npm run dev
# OR
wrangler dev --local --persist
```

### Configuration

1. Copy `wrangler.toml.example` to `wrangler.toml`.

2. Create KV namespaces for production and development:

```sh
npx wrangler kv:namespace create NONCES
npx wrangler kv:namespace create NONCES --preview

npx wrangler kv:namespace create FOLLOWS
npx wrangler kv:namespace create FOLLOWS --preview
```

3. Update the binding IDs in `wrangler.toml`:

```toml
kv-namespaces = [
  { binding = "NONCES", id = "<INSERT NONCES_ID>", preview_id = "<INSERT NONCES_PREVIEW_ID>" },
  { binding = "FOLLOWS", id = "<INSERT FOLLOWS_ID>", preview_id = "<INSERT FOLLOWS_PREVIEW_ID>" },
]
```

4. Configure secrets:

```sh
echo <VALUE> | npx wrangler secret put INDEXER_WEBHOOK_SECRET
```

## Deploy

```sh
wrangler publish
# OR
npm run deploy
```
