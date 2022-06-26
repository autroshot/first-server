import http from 'http';
import mysql from 'mysql2/promise';
import { URL } from 'url';
import { readFile, readdir, writeFile, rename, unlink } from 'node:fs/promises';
import { indexHtml } from './server/views/indexHtml'
import { getAllTopics, getTopicById } from './server/models/topic'
import { topicDetailHtml } from './server/views/topicDetailHtml';
import { createFormHtml } from './server/views/createFormHtml';

const DOMAIN = 'localhost';
const PORT = 3000;

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', `http://localhost:3000`);
  const pathName = url.pathname;
  const searchParams = url.searchParams;
  const method = request.method ?? 'GET';
  
  if (pathName === '/') {
    if (searchParams.get('id') === null) {
      const html = await indexHtml();

      response.statusCode = 200;
      response.end(html);
    } else {
      const id = +(searchParams.get('id') as string);
  
      const html = await topicDetailHtml(id);

      response.statusCode = 200;
      response.end(html);
    }
  } else if (pathName === '/create' && method === 'GET') {
    const html = await createFormHtml();

    response.statusCode = 200;
    response.end(html);
  } else if (pathName === '/create' && method === 'POST') {
    let body = '';

    request.on('data', function(data) {
      body += data;
    });

    request.on('end', () => {
      const searchParams = new URLSearchParams(body);
      
      if (searchParams.get('title') !== '') {
        writeFile(`./data/${searchParams.get('title')}`, searchParams.get('description') ?? '', 'utf-8');

        response.writeHead(302, {Location: `/?id=${searchParams.get('title')}`});
        response.end();
      }
    });
  } else if (pathName === '/update' && method === 'GET') {
    // const searchParams = url.searchParams;
    // const description = await getDescription(searchParams.get('id'));
    // const files = await readdir('./data/')
    // const ul = createLinkList(files);

    // response.statusCode = 200;
    // response.end(updateFormHtml(searchParams.get('id') as string, description, ul));
  } else if (pathName === '/update' && method === 'POST') {
    let body = '';

    request.on('data', function (data) {
      body += data;
    });

    request.on('end', async () => {
      const searchParamsUrl = url.searchParams;
      const searchParamsBody = new URLSearchParams(body);

      await writeFile(
        `./data/${searchParamsUrl.get('id')}`, 
        searchParamsBody.get('description') ?? '', 
        'utf-8'
      );
      await rename(`./data/${searchParamsUrl.get('id')}`, `./data/${searchParamsBody.get('title')}`);
      
      response.writeHead(302, {Location: `/?id=${searchParamsBody.get('title')}`});
      response.end();
    });
  } else if (pathName === '/delete' && method === 'POST') {
    let body = '';

    request.on('data', function (data) {
      body += data;
    });

    request.on('end', async () => {
      const searchParamsBody = new URLSearchParams(body);
      console.log('id: ' + searchParamsBody.get('id'));

      await unlink(`./data/${searchParamsBody.get('id')}`);

      response.writeHead(302, {Location: `/`});
      response.end();
    });
  } else {
    response.statusCode = 404;
    response.end('Not found');
  }
});

server.listen(PORT, DOMAIN, () => {
  console.log(`Server running at http://${DOMAIN}:${PORT}/`);
});

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