import { getFileId } from './file-id';

describe('getFileId', () => {
  test.each`
    filePath               | expected
    ${'/test/test.test'}   | ${'1b9f5126-531c-55f4-951e-2b0bfb35b91d'}
    ${'/.test/test.test'}  | ${'954202d1-3c5e-5c2d-9e7d-863585d4ee89'}
    ${'test/test.test.ts'} | ${'465282a7-9568-5cd2-bf88-ddb098a052ae'}
    ${'\\test\\test.test'} | ${'f2f016c7-16c3-5983-b413-a3c5357b31a7'}
  `('returns file id: "$expected" when filePath: "$filePath"', ({ filePath, expected }) => {
    expect(getFileId(filePath)).toBe(expected);
  });
});
