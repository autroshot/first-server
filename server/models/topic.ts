import { ResultSetHeader } from 'mysql2';
import { pool } from '../dbConnection';
import { TopicRowDataPacket, TopicCreateForm, TopicUpdateForm } from '../types/topic';

export async function getAllTopics() {
  const [rows] = await pool.query<TopicRowDataPacket[]>('SELECT * FROM topic');
  
  return rows;
}

export async function getTopicById(id: number) {
  const [rows] = await pool.execute<TopicRowDataPacket[]>('SELECT * FROM topic WHERE topic_id = ?', [id]);
  
  return rows[0];
}

export async function insertTopic(form: TopicCreateForm) {
  const promise = await pool.execute<ResultSetHeader>(`
    INSERT INTO TOPIC (title, description, topic_created_date, author_id) 
    VALUES (?, ?, now(), ?)`, 
    [form.title, form.description, form.author_id]);

  return promise;
}

export async function updateTopic(newTopic: TopicUpdateForm) {
  const oldTopic = await getTopicById(newTopic.topic_id);

  const promise = await pool.execute<ResultSetHeader>(`
    UPDATE topic 
    SET 
      title = ?, 
      description = ?, 
      topic_created_date = ?, 
      author_id = ? 
    WHERE topic_id = ?`, 
    [newTopic.title, 
      newTopic.description, 
      oldTopic.topic_created_date, 
      oldTopic.author_id, 
      oldTopic.topic_id]);

  return promise;
}

export async function deleteTopic(id: number) {
  const promise = await pool.execute<ResultSetHeader>(`
    DELETE FROM topic 
    WHERE
        topic_id = ?`, 
    [id]);

  return promise;
}