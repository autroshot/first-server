import http from 'http';
import mysql from 'mysql2/promise';
import { URL } from 'url';
import { readFile, readdir, writeFile, rename, unlink } from 'node:fs/promises';
import { indexHtml } from './server/views/indexHtml'
import { getAllTopics, getTopicById, insertTopic } from './server/models/topic'
import { topicDetailHtml } from './server/views/topicDetailHtml';
import { createFormHtml } from './server/views/createFormHtml';
import { TopicCreateForm } from './server/types/topic';
import { updateFormHtml } from './server/views/updateFormHtml';

const DOMAIN = 'localhost';
const PORT = 3000;

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', `http://localhost:3000`);
  const pathName = url.pathname;
  const urlSearchParams = url.searchParams;
  const method = request.method ?? 'GET';
  
  if (pathName === '/') {
    if (urlSearchParams.get('id') === null) {
      const html = await indexHtml();

      response.statusCode = 200;
      response.end(html);
    } else {
      const id = +(urlSearchParams.get('id') as string);
  
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

    request.on('data', data => {
      body += data;
    });

    request.on('end', async () => {
      const formSearchParams = new URLSearchParams(body);
      
      if (formSearchParams.get('title') !== '') {
        let topicCreateForm: TopicCreateForm = {
          title: formSearchParams.get('title') as string,
          description: formSearchParams.get('description') ?? '',
        };

        try {
          const queryResult = await insertTopic(topicCreateForm);
          
          response.writeHead(302, {Location: `/?id=${queryResult[0].insertId}`});
          response.end();
        } catch (err) {
          response.statusCode = 400;
          response.end(err);
        }
      }
    });
  } else if (pathName === '/update' && method === 'GET') {
    if (urlSearchParams.get('id') === null) {
      response.statusCode = 400;
      response.end('Bad Request');
    } else {
      const id = +(urlSearchParams.get('id') as string);
      const html = await updateFormHtml(id);

      response.statusCode = 200;
      response.end(html);
    }
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