module.exports = {
  mount: {
    'client/public': '/',
    'client/src': '/_dist_',
  },
  plugins: ['@snowpack/plugin-react-refresh', '@snowpack/plugin-dotenv'],
  install: [
    /* ... */
  ],
  installOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
  proxy: {
    '/api': 'http://localhost:4000/api',
  },
  alias: {
    /* ... */
  },
};
