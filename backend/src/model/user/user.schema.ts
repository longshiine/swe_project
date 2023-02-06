import mongoose, { Schema } from 'mongoose';
import { ISchemaUser } from './user.types';
import { getCurrentDate } from '../../lib/util';

const UserSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  gender: { type: String, require: true },
  email: { type: String },
  profile_image_url: { type: String },
  created_at: {
    type: Date,
    default: () => getCurrentDate(),
  },
  updated_at: {
    type: Date,
    default: () => getCurrentDate(),
  },
});

export default mongoose.model<ISchemaUser>('User', UserSchema);
