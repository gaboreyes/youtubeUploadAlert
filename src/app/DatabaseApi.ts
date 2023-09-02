import "dotenv/config.js";
import mongoose from 'mongoose';
import { YoutubeResult } from "../models/YoutubeResult.ts";
import { IVideoToBeStored } from "../interfaces/interfaces.ts";

class DatabaseApi{
  private dbUser: string;
  private dbName: string;
  private dbPassword: string;

  constructor() {
    this.dbUser = process.env.DATABASE_USER;
    this.dbName = process.env.DATABASE_NAME;
    this.dbPassword = process.env.DATABASE_PASSWORD;
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

  private async closeConnection() {
    console.log('DB connection closed!')
    await mongoose.disconnect()
  }

  public async insertVideoFlow(latestVideo: IVideoToBeStored) {
    if(process.env.ENABLE_CONNECTING_WITH_DB === 'true' && latestVideo.videoUrl) {
      const connection = await this.stablishConnection()
      const result = await this.findVideoGivenVideoId(latestVideo.videoId)
      if(!result) await this.saveVideo(latestVideo)
      this.closeConnection()
    }
  }
}

export { DatabaseApi }