import { pool } from '../dbConnection';
import { AuthorRowDataPacket } from '../types/author';

export async function getAuthorById(id: number) {
  const [rows] = await pool.execute<AuthorRowDataPacket[]>(`
    SELECT 
      * 
    FROM 
      author 
    WHERE 
      author_id = ?`, 
    [id]);
  
  return rows[0];
}