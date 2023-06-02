# NX (https://nx.dev/core-features/automate-updating-dependencies)

```sh
pnpm nx migrate latest --interactive
```

# DEPS

```sh
pnpm update -i -r --latest
```

```sh
pnpm nx run-many --target=build  --parallel=1 --all
```


CF Workers:

import.meta.env (client)
{
  "PUBLIC_API_URL": "https://nbhr.io/trpc",
  "BASE_URL": "/",
  "MODE": "production",
  "DEV": false,
  "PROD": true,
  "SSR": true,
  "SITE": "https://nbhr.io"
}

process.env (server runtime)
{
  "ASSETS": {},
  "CF_PAGES": "1",
  "CF_PAGES_BRANCH": "main",
  "CF_PAGES_COMMIT_SHA": "d07a21a20ebaf095d44c7156527dcc48cad12a25",
  "CF_PAGES_URL": "https://28a270f7.test-ef9.pages.dev"
}
