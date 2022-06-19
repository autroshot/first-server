const http = require('http');
const fs = require('fs');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const _url = req.url;
  const queryData = url.parse(_url, true).query;
  const pathName = url.parse(_url, true).pathname;

  if (pathName === '/') {
    if (queryData.id === undefined) {
      fs.readdir('./data/', (err, files) => {
        if (err) throw err;

        const title = 'Welcome';
        const description = 'Hello, Node.js';

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
      });

      
    } else {
      fs.readFile(`data/${queryData.id}`, 'utf-8', (err, description) => {
        if (err) throw err;

        let title = queryData.id;
        const template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            <ul>
              <li><a href="/?id=CSS">CSS</a></li>
              <li><a href="/?id=HTML">HTML</a></li>
              <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ul>
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
        `;
    
        res.statusCode = 200;
        res.end(template);
      });
    }
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});