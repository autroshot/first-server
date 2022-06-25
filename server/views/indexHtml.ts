export function indexHtml(list: string): string {
  let result = '';
  
  result += `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - Index</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    <a href="/create">create</a>
    <h2>Welcome</h2>
    <p>Hello, Node.js</p>
  </body>
  </html>
  `;

  return result;
}