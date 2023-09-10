import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const YoutubeChannelSchema = new Schema({
  channelName: {
    type: String,
    required: true
  },
  beingWatched: {
    type: Boolean,
    default: true
  },
}, { collection: 'YoutubeChannels', timestamps: true });

const YoutubeChannel = mongoose.model('YoutubeChannel', YoutubeChannelSchema);

export { YoutubeChannel } 
