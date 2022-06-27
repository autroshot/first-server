import { getTopicById } from "../models/topic";
import { createTopicLinkUl } from "./library";

export async function updateFormHtml(id: number): Promise<string> {
  let result = '';

  const ul = await createTopicLinkUl();
  const description = await getTopicById(id);
  
  result += `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - Update ${id}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${ul}
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