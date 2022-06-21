export function articleHtml(title: string, list: string, description: string, funcLink: string): string {
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
    ${list}
    ${funcLink}
    <h2>${title}</h2>
    <p>${description}</p>
  </body>
  </html>
  `;

  return result;
}