# Apollo Client Test

## Available Scripts

- `npm run dev:client`

  Runs the client app in the development mode.

  Open http://localhost:8080 to view it in the browser.

  The page will reload if you make edits.

  You will also see any lint errors in the console.

  It proxies the api requests to the server,

- `npm run dev:server`

  Runs the graphql server in development mode through nodemon.

  It will run at http://localhost:4000/api/graphql. Graphiql is enabled.

- `npm run build`

  Builds a static copy of your site to the `build/` folder.

  Your app is ready to be deployed! The server will serve it on port 4000,

- `npm run start`

  Runs the server. Remember to build the client first.

**Not Poduction ready - it will work only in a modern browser:** Add a build bundler plugin like "@snowpack/plugin-webpack" to your `snowpack.config.js` config file, for better performance.
