import http from 'http';
import fs from 'fs';
import { URL } from 'url';
import { readFile, readdir } from 'node:fs/promises'

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', `http://localhost:3000`);
  const searchParams = url.searchParams;
  const pathName = url.pathname;

  if (pathName === '/') {
    let title: string;
    let description: string;

    if (searchParams.get('id') === null) {
      title = 'Welcome';
      description = 'Hello, Node.js';
    } else {
      title = searchParams.get('id') as string;

      description = await readFile(`./data/${searchParams.get('id')}`, 'utf-8');
    }

    const files = await readdir('./data/')
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

    response.statusCode = 200;
    response.end(template);
  } else {
    response.statusCode = 404;
    response.end('Not found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});