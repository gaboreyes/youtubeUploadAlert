import { YoutubeApi } from '../../src/app/YoutubeApi.ts'

test('should return a the base url for the youtube v3 api', () => {
  const youtubeApi = new YoutubeApi()
  expect(youtubeApi.baseUrl).toBe('https://youtube.googleapis.com/youtube/v3/search?&part=snippet')
});