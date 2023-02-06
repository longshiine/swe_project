import { Document } from 'mongoose';
import { ISchemaUser } from '../user';

interface ISchemaPost extends Document {
  index: number;
  writer: ISchemaUser;
  title: string;
  content: string;
  created_at?: Date;
  updated_at?: Date;
}

export { ISchemaPost };
