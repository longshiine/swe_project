import { Document } from 'mongoose';

interface ISchemaUser extends Document {
  id: string;
  password: string;
  name?: string;
  gender?: string;
  email?: string;
  profile_image_url?: string;
  created_at?: Date;
  updated_at?: Date;
}

export { ISchemaUser };
