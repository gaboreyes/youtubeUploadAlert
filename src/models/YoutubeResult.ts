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
  },
  videoUrl: {
    type: String,
    required: true,
  },
  channelId: {
    type: String,
    required: true
  },
  channelTitle: {
    type: String,
    required: true,
  }
}, { collection: 'YoutubeResults', timestamps: true });

const YoutubeResult = mongoose.model('YoutubeResult', YoutubeResultSchema);

export { YoutubeResult } 
