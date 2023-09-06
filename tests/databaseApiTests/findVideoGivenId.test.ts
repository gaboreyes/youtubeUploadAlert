import { DatabaseApi } from '../../src/app/DatabaseApi.ts'
import { YoutubeResult } from '../../src/models/YoutubeResult.ts';

test('should return an object with the structure of a YoutubeResult', async () => {
  // Arrange
  const databaseApi = new DatabaseApi()
  const dummyString = 'fooBarBuzz'
  const dummyObjectStructure = {
    _id: dummyString,
    videoId: dummyString,
    videoTitle: dummyString,
    videoUrl: dummyString,
    channelId: dummyString,
    channelTitle: dummyString,
    createdAt: dummyString,
    updatedAt: dummyString,
    __v: 0
  }
  YoutubeResult.findOne = jest.fn().mockResolvedValue(dummyObjectStructure)
  // Act
  const result = await databaseApi.findVideoGivenVideoId(dummyString)
  // Assert
  expect(result).toBe(dummyObjectStructure)
});