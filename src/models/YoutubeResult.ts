import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const YoutubeResultSchema = new Schema({
  videoId: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 30
  },
  videoTitle: {
    type: String,
    required: true,
    lowercase: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
}, { collection: 'YoutubeResults' });

const YoutubeResult = mongoose.model('YoutubeResult', YoutubeResultSchema);

export { YoutubeResult } 
