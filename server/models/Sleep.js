import mongoose from 'mongoose';

const sleepSchema = new mongoose.Schema({
  user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sleepTime: { type: Date, required: true },
  wakeTime:  { type: Date, required: true },
  quality:   { type: Number, min: 1, max: 5 }, // 1-5 rating
  notes:     { type: String },
}, { timestamps: true });

sleepSchema.virtual('duration').get(function () {
  return (this.wakeTime - this.sleepTime) / 3600000; // hours
});

export default mongoose.model('Sleep', sleepSchema);
