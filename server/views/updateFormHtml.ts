import { getTopicById } from "../models/topic";
import { createTopicLinkUl } from "./library";

export async function updateFormHtml(id: number): Promise<string> {
  let result = '';

  const ul = await createTopicLinkUl();
  const topic = await getTopicById(id);
  
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
    <form action="/update?id=${id}" method="post">
      <p><input type="text" name="title" placeholder="title" value="${topic.title}"></p>
      <p>
        <textarea name="description" placeholder="description">${topic.description}</textarea>
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