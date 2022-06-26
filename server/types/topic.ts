import { RowDataPacket } from "mysql2";

export interface Topic extends RowDataPacket {
  topic_id: number;
  title: string;
  description: string;
  topic_created_date: Date;
  author_id: number;
}

export interface TopicCreateForm {
  title: string;
  description: string;
}