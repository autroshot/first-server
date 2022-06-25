export function updateFormHtml(id: string, description: string, lists: string): string {
  let result = '';
  
  result += `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - Update ${id}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${lists}
    <h2>${id}</h2>
    <p>${description}</p>
    <form action="/update?id=${id}" method="post">
      <p><input type="text" name="title" placeholder="title" value="${id}"></p>
      <p>
        <textarea name="description" placeholder="description">${description}</textarea>
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