import { pool } from '../dbConnection';
import { Topic } from '../types/topic';

export async function getAllTopics() {
  return pool.query<Topic[]>('SELECT * FROM topic');
}

export async function getTopicById(id: number) {
  return pool.query<Topic[]>(`SELECT * FROM topic WHERE topic_id = ${id}`);
}