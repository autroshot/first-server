import { getAllAuthors } from "../models/author";
import { AuthorRowDataPacket } from "../types/author";
import { createAuthorOptions, createTopicLinkUl } from "./library";

export async function createFormHtml(): Promise<string> {
  let result = '';
  
  const ul = await createTopicLinkUl();
  const options = await createAuthorOptions();

  result += `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - Create</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${ul}
      <form action="/create" method="post">
        <select name="author_id">
          ${options}
        </select>
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