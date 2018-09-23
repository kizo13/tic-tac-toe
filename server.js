const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

app.get('/*', (req, res) => {
  res.sendFile(getFileForRequest(req.url));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500)
    .send({
      status: err.status || 500,
      message: err.code
    });
});

const server = app.listen(port, () => {
  console.info(`Server is listening on port ${server.address().port}`);
});

const getFileForRequest = (url) => {
  const urlSegments = url.split('/');
  const fileName = url.split('/').pop();
  const filePath = path.resolve(__dirname, 'public', ...urlSegments);

  if (fileName && fs.existsSync(filePath)) {
    return filePath;
  }

  return __dirname + '/public/index.html';
}
