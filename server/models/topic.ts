import { connectionConfig } from '../dbConnectionConfig';
import mysql from 'mysql2/promise';

export async function getAllTopics() {
  const connection = await mysql.createConnection(connectionConfig);

  const [rows] = await connection.query<mysql.RowDataPacket[]>('SELECT * FROM topic');

  await connection.end();

  return rows
}