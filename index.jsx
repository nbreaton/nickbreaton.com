import express from 'express';
import React from 'react';
import Router from 'react-router';

import routes from './app/router';

// create express server
let server = express();

// translate environmental variables
let env = process.env.NODE_ENV;
let production = (env == 'production');
let development = (env == 'development');

// define local variables
let port = 3000;

// serve minified files for production
server.use('/assets/', express.static('build'));

// serve all files in public folder
server.use('/', express.static('public'));

// serve react app as default route
server.use((req, res) => {
  // render react app at correct path
  Router.run(routes, req.originalUrl, (Handler) => {
    // determine environment variables
    let app = production ? React.renderToString(<Handler />) : '';
    let host = development ? 'http://localhost:8080' : '';

    // render page
    res.render('index.ejs', { app, host });
  });
});

// create the server on specified port
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
});
