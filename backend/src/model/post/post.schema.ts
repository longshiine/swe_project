import mongoose, { Schema } from 'mongoose';
import { ISchemaPost } from './post.types';
import { getCurrentDate } from '../../lib/util';

const PostSchema: Schema = new Schema({
  index: { type: Number, required: true },
  writer: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String },
  content: { type: String },
  created_at: {
    type: Date,
    default: () => getCurrentDate(),
  },
  updated_at: {
    type: Date,
    default: () => getCurrentDate(),
  },
});

export default mongoose.model<ISchemaPost>('Post', PostSchema);
