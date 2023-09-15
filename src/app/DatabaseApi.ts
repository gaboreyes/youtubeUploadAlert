import "dotenv/config.js";
import mongoose from 'mongoose';
import { IVideoToBeStored } from "../interfaces/interfaces.ts";
import { YoutubeChannel } from "../models/YoutubeChannel.ts";
import { YoutubeResult } from "../models/YoutubeResult.ts";

class DatabaseApi{
  static instance: DatabaseApi;
  private dbUser: string;
  private dbName: string;
  private dbPassword: string;

  constructor() {
    this.dbUser = process.env.DATABASE_USER;
    this.dbName = process.env.DATABASE_NAME;
    this.dbPassword = process.env.DATABASE_PASSWORD;
  }

  static getInstance() {
    if(!this.instance){
      this.instance = new DatabaseApi()
    }
    return this.instance
  }

  private async stablishConnection() {
    try {
      const connectionString = `mongodb+srv://${this.dbUser}:${this.dbPassword}@${this.dbName}.i25e8au.mongodb.net/${this.dbName}?retryWrites=true&w=majority`
      await mongoose.connect(connectionString);
      console.log('Connected to DB!')
    } catch (error) {
      console.log('Failed to connect to DB!')
    }
  }

  private async closeConnection() {
    console.log('DB connection closed!')
    await mongoose.disconnect()
  }

  public async findVideoGivenVideoId(videoId: string): Promise<IVideoToBeStored>{
    const dbResponse = await YoutubeResult.findOne({ videoId });
    return dbResponse
  }

  public async saveVideo(latestVideo: IVideoToBeStored) {
    const newYoutubeResult = new YoutubeResult(latestVideo);
    const result = await newYoutubeResult.save();
    if(result._id) console.log('Entry saved sucessfully!')
    return result
  }

  public async insertVideoFlow(latestVideoList: IVideoToBeStored[]) {
    if(process.env.ENABLE_CONNECTING_WITH_DB === 'true') {
      const connection = await this.stablishConnection()
      const findVideoPromises = []
      const saveVideoPromises = []
      
      for (let index = 0; index < latestVideoList.length; index++) {
        findVideoPromises.push(this.findVideoGivenVideoId(latestVideoList[index].videoId))
      }
      const results = await Promise.all(findVideoPromises)
      for (let index = 0; index < results.length; index++) {
        if(!results[index]) saveVideoPromises.push(this.saveVideo(latestVideoList[index]))
      }
      await Promise.all(saveVideoPromises)
      this.closeConnection()
    }
  }

  public async getWatchedChannels() {
    const connection = await this.stablishConnection()
    const getChannelsResult = await YoutubeChannel.find({ beingWatched: true });
    this.closeConnection()
    return getChannelsResult
  }

  public async updateWatchedChannels(channelsList: string[]) {
    const connection = await this.stablishConnection()
    const queryBuilder = (channelName: string) => {
      return {
        updateOne: {
          filter: { channelName },
          update: { beingWatched: true },
          upsert: true,
        }
      }
    }
    const queryArray = channelsList.map(queryBuilder)
    const bulkWriteResult = await YoutubeChannel.bulkWrite(queryArray);
    this.closeConnection()
    return bulkWriteResult
  }
}

export { DatabaseApi };
