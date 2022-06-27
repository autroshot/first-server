import { RowDataPacket } from "mysql2";

export interface AuthorRowDataPacket extends RowDataPacket {
  author_id: number;
  name: string;
  profile: string;
}