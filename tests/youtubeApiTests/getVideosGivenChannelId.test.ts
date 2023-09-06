import { YoutubeApi } from '../../src/app/YoutubeApi.ts'

test('should return an error if theres an error in the internal http request', () => {
  const youtubeApi = new YoutubeApi()
  const dummyDate = '2023-01-01T$12%3A30%3A$30Z'
  const dummyChannelId = 'fooBarBuzz'
  const mockedHttpResponse = {
    error: {
      errors: [
        {
          message: 'Oops something went wrong!'
        }
      ]
    }
  }
  const mockedMakeHttpRequest = jest.spyOn(YoutubeApi.prototype as any, 'makeHttpRequest');
  mockedMakeHttpRequest.mockImplementation(async () => mockedHttpResponse);

  expect(async () => {
    await youtubeApi.getVideosGivenChannelId(dummyChannelId, dummyDate)
  }).rejects.toThrow();
  mockedMakeHttpRequest.mockRestore();
});