import { pool } from '../dbConnection';
import { Topic } from '../types/topic';

export async function getAllTopics() {
  return pool.query<Topic[]>('SELECT * FROM topic');
}