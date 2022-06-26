import { pool } from '../dbConnection';
import { Topic } from '../types/topic';

export async function getAllTopics() {
  const [rows] = await pool.query<Topic[]>('SELECT * FROM topic');
  
  return rows;
}

export async function getTopicById(id: number) {
  const [rows] = await pool.execute<Topic[]>('SELECT * FROM topic WHERE topic_id = ?', [id]);
  
  return rows[0];
}