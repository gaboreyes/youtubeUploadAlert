import { YoutubeApi } from '../../src/app/YoutubeApi.ts'

test('should return a youtube video url given a dummy text', () => {
  const youtubeApi = new YoutubeApi()
  const dummyText = 'foobarbuzz'
  const baseString = 'https://www.youtube.com/watch?v='
  const result = youtubeApi.generateVideoUrl(dummyText)
  expect(result).toBe(`${baseString}${dummyText}`)
});