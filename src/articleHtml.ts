export function articleHtml(title: string, lists: string, description: string): string {
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
    <a href="/form">create</a>
    <h2>${title}</h2>
    <p>${description}</p>
  </body>
  </html>
  `;

  return result;
}