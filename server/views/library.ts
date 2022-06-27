import { getAllAuthors } from "../models/author";
import { getAllTopics } from "../models/topic";

export function createCUDLink(id: number): string {
  let result = '<a href="/create">create</a>';

  result += `
    <a href="/update?id=${id}">update</a> 
    <form action="/delete" method="post">
      <input type="hidden" name="id" value="${id}">
      <input type="submit" value="delete">
    </form>
  `

  return result;
}

export async function createTopicLinkUl(): Promise<string> {
  let result = '';
  
  let topics = await getAllTopics();

  const lis = topics.reduce((previousValue: string, currentTopic) => {
    return previousValue + `<li><a href="/?id=${currentTopic.topic_id}">${currentTopic.title}</a></il>`;
  }, '');
  result += `<ul>${lis}</ul>`;

  return result;
}

export async function createAuthorOptions(selectedAuthorId?: number) {
  let result = '';

  const authors = await getAllAuthors();

  if (!selectedAuthorId) {
    result += authors.reduce((previousValue, author) => {
      return previousValue + `<option value="${author.author_id}">${author.name}</option>`;
    }, '');
  } else {
    result += authors.reduce((previousValue, author) => {
      return (previousValue + `
        <option 
          value="${author.author_id}" 
          ${(author.author_id === selectedAuthorId) ? 'selected' : ''}
        >
          ${author.name}
        </option>
      `);
    }, '');
  }

  return result;
}