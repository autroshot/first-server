import { getAuthorById } from "../models/author";
import { getTopicById } from "../models/topic";
import { createCUDLink, createTopicLinkUl } from "./library";

export async function topicDetailHtml(id: number): Promise<string> {
  let result = '';

  const topic = await getTopicById(id);
  const author = await getAuthorById(topic.author_id);
  const CUDLink = createCUDLink(id);
  const topicLinkUl = await createTopicLinkUl();
  
  result += `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${topic.title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${topicLinkUl}
    ${CUDLink}
    <h2>${topic.title}</h2>
    <h5>written by ${author.name}</h5>
    <p>${topic.description}</p>
  </body>
  </html>
  `;

  return result;
}