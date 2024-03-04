// index.js
'use strict';
const express = require('express');
const lowdb = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const butterflyRoutes = require('./routes/butterflyRoutes');
const userRoutes = require('./routes/userRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const constants = require('../src/helpers/constants');

async function createApp(dbPath) {
  const app = express();
  app.use(express.json());

  const db = await lowdb(new FileAsync(dbPath));
  await db.read();

  // Butterfly Routes
  app.use('/v1/butterfly', butterflyRoutes(db));

  // User Routes
  app.use('/v1/user', userRoutes(db));

  // Rating Routes
  app.use('/v1/rating', ratingRoutes(db));

  app.get('/', (req, res) => {
    res.json({ message: 'Server is running!' });
  });

  return app;
}

/* istanbul ignore if */
if (require.main === module) {
  (async () => {
    const app = await createApp(constants.DB_PATH);
    const port = process.env.PORT || 8000;

    app.listen(port, () => {
      console.log(`Butterfly API started at http://localhost:${port}`);
    });
  })();
}

module.exports = createApp;
