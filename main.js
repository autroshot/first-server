const http = require('http');
const fs = require('fs');
const url = require('url');
const { resolve } = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(async (req, res) => {
  const _url = req.url;
  const queryData = url.parse(_url, true).query;
  const pathName = url.parse(_url, true).pathname;

  if (pathName === '/') {
    let title;
    let description;

    if (queryData.id === undefined) {
      title = 'Welcome';
      description = 'Hello, Node.js';
    } else {
      title = queryData.id;

      await new Promise((resolve) => {fs.readFile(`./data/${queryData.id}`, 'utf-8', (err, data) => {
        if (err) throw err;
        
        description = data;

        resolve();
      });})
    }

    await new Promise((resolve) => {
      fs.readdir('./data/', (err, files) => {
        if (err) throw err;
  
        const lis = files.reduce((previousValue, currentValue) => {
          return previousValue + `<li><a href="/?id=${currentValue}">${currentValue}</a></il>`;
        }, '');
        const list = `<ul>${lis}</ul>`;
        
        const template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
        `;
    
        res.statusCode = 200;
        res.end(template);

        resolve();
      });
    });
    
    
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});