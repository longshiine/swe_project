import mongoose, { Schema } from 'mongoose';
import { ISchemaCoupon } from './coupon.types';
import { getCurrentDate } from '../../lib/util';

const CouponSchema: Schema = new Schema({
  code: { type: String, required: true },
  campaign: { type: String, required: true },
  index: { type: Number, required: true },
  points: { type: Number, required: true },
  used: { type: Boolean, default: false },
  created_at: {
    type: Date,
    default: () => getCurrentDate(),
  },
});

export default mongoose.model<ISchemaCoupon>('Coupon', CouponSchema);
