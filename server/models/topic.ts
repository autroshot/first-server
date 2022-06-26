import { ResultSetHeader } from 'mysql2';
import { pool } from '../dbConnection';
import { Topic, TopicCreateForm } from '../types/topic';

export async function getAllTopics() {
  const [rows] = await pool.query<Topic[]>('SELECT * FROM topic');
  
  return rows;
}

export async function getTopicById(id: number) {
  const [rows] = await pool.execute<Topic[]>('SELECT * FROM topic WHERE topic_id = ?', [id]);
  
  return rows[0];
}

export async function insertTopic(form: TopicCreateForm) {
  const promise = await pool.execute<ResultSetHeader>(`
    INSERT INTO TOPIC (title, description, topic_created_date, author_id) 
    VALUES (?, ?, now(), 1)
  `, [form.title, form.description]);

  return promise;
  // promise.then(() => console.log('INSERT Topic success!'))
  //   .catch(err => console.log('INSERT Topic error: ' + err));
}