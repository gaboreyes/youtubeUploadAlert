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

  public async stablishConnection() {
    try {
      const connectionString = `mongodb+srv://${this.dbUser}:${this.dbPassword}@${this.dbName}.i25e8au.mongodb.net/${this.dbName}?retryWrites=true&w=majority`
      await mongoose.connect(connectionString);
      console.log('Connected to DB!')
    } catch (error) {
      console.log('Failed to connect to DB!')
    }
  }

  public async findEntry(videoId: string) {
    const result = await YoutubeResult.findOne({ videoId });
    if(result) return true 
    return false
  }

  public async saveEntry(latestVideo: IVideoToBeStored) {
    const newYoutubeResult = new YoutubeResult(latestVideo);
    const result = await newYoutubeResult.save();
    if(result._id) console.log('Entry saved sucessfully!')
  }

  public async closeConnection() {
    console.log('DB connection closed!')
    await mongoose.disconnect()
  }
}

export { DatabaseApi }