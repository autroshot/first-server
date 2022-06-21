export function createFormHtml(lists: string): string {
  let result = '';
  
  result += `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - Create</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${lists}
    <form action="/create" method="post">
      <p><input type="text" name="title" placeholder="title"></p>
      <p>
        <textarea name="description" placeholder="description"></textarea>
      </p>
      <p>
        <input type="submit">
      </p>
    </form>
  </body>
  </html>
  `;

  return result;
}