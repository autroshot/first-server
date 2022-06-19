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
    const title = getTitle(searchParams.get('id'));
    const description = await getDescription(searchParams.get('id'));

    const files = await readdir('./data/')
    const ul = createUlElement(files);

    response.statusCode = 200;
    response.end(createHtml(title, ul, description));
  } else {
    response.statusCode = 404;
    response.end('Not found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function createUlElement(arr: string[]): string {
  let result = '';

  const lis = arr.reduce((previousValue, currentValue) => {
    return previousValue + `<li><a href="/?id=${currentValue}">${currentValue}</a></il>`;
  }, '');
  result += `<ul>${lis}</ul>`;

  return result;
}

function createHtml(title: string, lists: string, description: string): string {
  let result = '';
  
  result += `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${lists}
    <h2>${title}</h2>
    <p>${description}</p>
  </body>
  </html>
  `;

  return result;
}

type queryParam = string | null;

function getTitle(queryStringId: queryParam): string {
  return queryStringId ?? 'Welcome';
}

async function getDescription(queryStringId: queryParam): Promise<string> {
  let result = 'Hello, Node.js';

  if (queryStringId !== null) {
    try {
      result = await readFile(`./data/${queryStringId}`, 'utf-8');
    } catch (err) {
      console.log(err);
    }
  }

  return result;
}