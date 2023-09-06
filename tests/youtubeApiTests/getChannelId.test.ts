import { YoutubeApi } from '../../src/app/YoutubeApi.ts'

test('should return a youtube channel id given the name of the channel', async () => {
  // Arrange
  const youtubeApi = new YoutubeApi()
  const dummyChannelName = 'dummyName'
  const channelId = 'fooBarBuzz'
  const mockedHttpResponse = {
    items: [
      {
        snippet: {
          channelId: channelId
        }
      }
    ]
  }
  const mockedMakeHttpRequest = jest.spyOn(YoutubeApi.prototype as any, 'makeHttpRequest');
  mockedMakeHttpRequest.mockImplementation(async () => mockedHttpResponse);
  
  // Act
  const result = await youtubeApi.getChannelIdGivenChannelName(dummyChannelName)
  
  // Assert
  expect(result).toBe(channelId)
  mockedMakeHttpRequest.mockRestore();
});