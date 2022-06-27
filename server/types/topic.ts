import { RowDataPacket } from "mysql2";

export interface TopicRowDataPacket extends RowDataPacket {
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

export interface TopicUpdateForm {
  topic_id: number;
  title: string;
  description: string;
}