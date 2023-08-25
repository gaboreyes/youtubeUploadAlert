import "dotenv/config.js";
import mongoose from 'mongoose';
import { YoutubeResult } from "../models/YoutubeResult.ts";

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

  public async saveEntry(latestVideoResponse: any) {
    await this.stablishConnection()
    const newYoutubeResult = new YoutubeResult(latestVideoResponse);
    const result = await newYoutubeResult.save();
    if(result._id){
      console.log('Entry saved sucessfully!')
    }
  }

  public async closeConnection() {
    await mongoose.disconnect()
  }
}

export { DatabaseApi }