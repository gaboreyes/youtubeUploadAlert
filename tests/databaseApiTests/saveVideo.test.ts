import { DatabaseApi } from '../../src/app/DatabaseApi.ts'
import { YoutubeResult } from '../../src/models/YoutubeResult.ts';

test('should return an object with the structure of a YoutubeResult', async () => {
  // Arrange
  const databaseApi = new DatabaseApi()
  const dummyString = 'fooBarBuzz'
  const dummyObjectStructure = {
    videoId: dummyString,
    videoTitle: dummyString,
    videoUrl: dummyString,
    channelId: dummyString,
    channelTitle: dummyString,
  }
  const mockedYoutubeResultModel = jest.spyOn(YoutubeResult.prototype, 'save')
  mockedYoutubeResultModel.mockImplementationOnce(() => Promise.resolve(dummyObjectStructure))
  // Act
  const result = await databaseApi.saveVideo(dummyObjectStructure)
  // Assert
  expect(result).toBe(dummyObjectStructure)
});