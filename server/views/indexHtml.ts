import { createTopicLinkUl } from "./library";

export async function indexHtml(): Promise<string> {
  let result = '';

  const ul = await createTopicLinkUl();
  
  result += `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - Index</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${ul}
    <a href="/create">create</a>
    <h2>Welcome</h2>
    <p>Hello, Node.js</p>
  </body>
  </html>
  `;

  return result;
}