import http from 'http';
import fs from 'fs';
import url from 'url';
import util from 'util'

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(async (request, response) => {
  const requestUrl = request.url ?? '/';
  const queryData = url.parse(requestUrl, true).query;
  const pathName = url.parse(requestUrl, true).pathname;

  if (pathName === '/') {
    let title: string;
    let description: string;

    if (queryData.id === undefined) {
      title = 'Welcome';
      description = 'Hello, Node.js';
    } else {
      title = queryData.id as string;

      description = await new Promise((resolve) => {fs.readFile(`./data/${queryData.id}`, 'utf-8', (err, data) => {
        if (err) throw err;

        resolve(data);
      });})
    }

    const outPut = await new Promise((resolve) => {
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

        resolve(template);
      });
      
    });
    response.statusCode = 200;
    response.end(outPut);
  } else {
    response.statusCode = 404;
    response.end('Not found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});