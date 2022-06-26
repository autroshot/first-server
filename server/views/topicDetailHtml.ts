import { articleHtmlParams } from "../types/articleHtmlParams";

export function topicDetailHtml(params: articleHtmlParams): string {
  let result = '';
  
  result += `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${params.title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${params.topicLinkList}
    ${params.funcLink}
    <h2>${params.title}</h2>
    <p>${params.description}</p>
  </body>
  </html>
  `;

  return result;
}