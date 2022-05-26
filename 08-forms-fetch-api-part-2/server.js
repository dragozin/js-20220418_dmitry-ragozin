const http = require('http');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const express = require('express');

const app = express();
const httpServer = http.createServer(app);

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

console.log(path.join(__dirname, './public'));

app.use('/static', express.static('public'));

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, './public'));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(36);
      cb(null, `${file.fieldname}-${uniqueSuffix}.png`);
    },
  }),
});

app.options('/upload', (req, res) => {
  console.log('start options');
  res
    .set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Max-Age': '3600',
    })
    .status(200)
    .end();
});

app.post('/upload', upload.single('avatarFile'), (req, res) => {
  if (!req.body?.['userEmail']) {
    res
      .set({
        'Access-Control-Allow-Origin': '*',
      })
      .status(400)
      .contentType('text/plain')
      .end('Email is required');

    return;
  }

  res
    .set({ 'Access-Control-Allow-Origin': '*' })
    .status(200)
    .json({
      id: Math.ceil(Math.random() * 1e10),
      avatarUrl: req.file?.path
        ? `http://127.0.0.1:3000/static/${path.basename(req.file.path)}`
        : null,
      isAdmin: req.body?.['isAdmin'] || false,
      userName: req.body?.['userName'] || '',
      userGroup: req.body?.['userGroup'] || null,
      userEmail: req.body['userEmail'],
    });
});
