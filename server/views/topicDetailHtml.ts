import { getTopicById } from "../models/topic";
import { articleHtmlParams } from "../types/articleHtmlParams";
import { createCUDLink, createTopicLinkUl } from "./library";

export async function topicDetailHtml(id: number): Promise<string> {
  let result = '';

  const topic = await getTopicById(id);
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
    <p>${topic.description}</p>
  </body>
  </html>
  `;

  return result;
}