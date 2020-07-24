require('dotenv').config();
const express = require('express');
const next = require('next');
const favicon = require('serve-favicon');
const path = require('path');
const routes = require('./routes');

const port = parseInt(process.env.REACT_APP_PORT, 10) || 3500;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = routes.getRequestHandler(app, ({ req, res, route, query }) => {
  app.render(req, res, route.page, query);
});

app.prepare().then(() => {
  express()
    .use(favicon(path.join(__dirname, 'static', 'favicon.ico')))
    .use(handler)
    .listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
});
