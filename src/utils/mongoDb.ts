import mongoose from 'mongoose';

async function connectToMongoDb(dbUser: string, dbPassword: string, dbName: string) {
  try {
    const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@${dbName}.i25e8au.mongodb.net/?retryWrites=true&w=majority`
    await mongoose.connect(connectionString);
    console.log('Connected to DB!')
    await mongoose.disconnect()
  } catch (error) {
    console.log('Failed to connect to DB!')
  }
}

export { connectToMongoDb }