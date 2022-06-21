import http from 'http';
import qs from 'querystring';
import { URL } from 'url';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { articleHtml } from './src/articleHtml';
import { formHtml } from './src/formHtml';

const DOMAIN = 'localhost';
const PORT = 3000;

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', `http://localhost:3000`);
  const pathName = url.pathname;
  const method = request.method ?? 'GET';
  
  if (pathName === '/') {
    const searchParams = url.searchParams;
    const title = getTitle(searchParams.get('id'));
    const description = await getDescription(searchParams.get('id'));

    const files = await readdir('./data/')
    const ul = createUlElement(files);

    response.statusCode = 200;
    response.end(articleHtml(title, ul, description));
  } else if (pathName === '/create' && method === 'GET') {
    const title = 'WEB - create';

    const files = await readdir('./data/')
    const ul = createUlElement(files);

    response.statusCode = 404;
    response.end(formHtml(title, ul));
  } else if (pathName === '/create' && method === 'POST') {
    let body = '';

    request.on('data', function (data) {
      body += data;
    });

    request.on('end', function () {
      const searchParams = new URLSearchParams(body);
      
      if (searchParams.get('title') !== '') {
        writeFile(`./data/${searchParams.get('title')}`, searchParams.get('description') ?? '');
      }
    });
  } else {
    response.statusCode = 404;
    response.end('Not found');
  }
});

server.listen(PORT, DOMAIN, () => {
  console.log(`Server running at http://${DOMAIN}:${PORT}/`);
});

function createUlElement(arr: string[]): string {
  let result = '';

  const lis = arr.reduce((previousValue, currentValue) => {
    return previousValue + `<li><a href="/?id=${currentValue}">${currentValue}</a></il>`;
  }, '');
  result += `<ul>${lis}</ul>`;

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