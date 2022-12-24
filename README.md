# Borodutch Book website

This is the website for the Borodutch Book.

## Local launch

1. Install dependencies with `yarn`
2. Add environment variables
3. Run the server with `yarn start`

## Environment variables

| Name               | Description                   |
| ------------------ | ----------------------------- |
| `VITE_ALCHEMY_KEY` | Alchemy API key               |
| `VITE_BACKEND_URL` | URL of the backend            |
| `NODE_ENV`         | `development` or `production` |

Also, please, consider looking at `.env.sample`.

## Available Scripts

- `yarn start` — runs the app in the development mode
- `yarn build` — builds the app for production to the `docs` folder
