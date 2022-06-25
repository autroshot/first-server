import http from 'http';
import mysql from 'mysql2/promise';
import { URL } from 'url';
import { readFile, readdir, writeFile, rename, unlink } from 'node:fs/promises';
import { indexHtml } from './src/indexHtml'
import { articleHtml } from './src/articleHtml';
import { createFormHtml } from './src/createFormHtml';
import { updateFormHtml } from './src/updateFormHtml';

const DOMAIN = 'localhost';
const PORT = 3000;
const connectionConfig = {
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'opentutorials'
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', `http://localhost:3000`);
  const pathName = url.pathname;
  const method = request.method ?? 'GET';
  
  if (pathName === '/') {
    if (url.searchParams.get('id') === null) {
      const ul = await createTopicLinkList();

      response.statusCode = 200;
      response.end(indexHtml(ul));
    } else {
      // const id = url.searchParams.get('id') as string;
      // connection.query(`SELECT * FROM topic WHERE id = ${id}`, (error, topics) => {
      //   if (error) throw error;
  
      //   const ul = createTopicLinkList();
  
      //   response.statusCode = 200;
      //   response.end(indexHtml(ul));
      // });
    }
  } else if (pathName === '/create' && method === 'GET') {
    // const files = await readdir('./data/')
    // const ul = createLinkList(files);

    // response.statusCode = 200;
    // response.end(createFormHtml(ul));
  } else if (pathName === '/create' && method === 'POST') {
    let body = '';

    request.on('data', function (data) {
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

async function createTopicLinkList(): Promise<string> {
  let result = '';
  
  const connection = await mysql.createConnection(connectionConfig);

  const [topics, fields] = await connection.query<mysql.RowDataPacket[]>('SELECT * FROM topic');

  const lis = topics.reduce((previousValue: string, currentTopic) => {
    return previousValue + `<li><a href="/?id=${currentTopic.id}">${currentTopic.title}</a></il>`;
  }, '');

  result += `<ul>${lis}</ul>`;

  await connection.end();

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

function createFuncLink(queryStringId: queryParam): string {
  let result = '<a href="/create">create</a>';

  if (queryStringId !== null) {
    result += `
      <a href="/update?id=${queryStringId}">update</a> 
      <form action="/delete" method="post">
        <input type="hidden" name="id" value="${queryStringId}">
        <input type="submit" value="delete">
      </form>
    `
  }

  return result;
}