// mockDb.js
'use strict';
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

const adapter = new FileSync(path.join(__dirname, 'test.db.json'));
const db = low(adapter);

module.exports = db;
