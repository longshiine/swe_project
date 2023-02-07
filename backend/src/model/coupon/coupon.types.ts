import { Document } from 'mongoose';

interface ISchemaCoupon extends Document {
  code: string;
  campaign: string;
  index: number;
  points: number;
  used: boolean;
  created_at?: Date;
}

export { ISchemaCoupon };
