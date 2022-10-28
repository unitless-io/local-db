import { getFunctionId, parseFunctionId } from './function-id';

describe('getFunctionId', () => {
  test.each`
    fileId                                    | functionName       | expected
    ${'f2f016c7-16c3-5983-b413-a3c5357b31a7'} | ${'testFunction'}  | ${'f2f016c7-16c3-5983-b413-a3c5357b31a7/testFunction'}
    ${'f2f016c7-16c3-5983-b413-a3c5357b31a7'} | ${'testFunction2'} | ${'f2f016c7-16c3-5983-b413-a3c5357b31a7/testFunction2'}
  `(
    'returns Function id: "$expected" when fileId: "$fileId" and functionName: "$functionName"',
    ({ fileId, functionName, expected }) => {
      expect(getFunctionId(fileId, functionName)).toBe(expected);
    }
  );
});

describe('parseFunctionId', () => {
  test.each`
    functionId                                              | expected
    ${'f2f016c7-16c3-5983-b413-a3c5357b31a7/testFunction'}  | ${{ fileId: 'f2f016c7-16c3-5983-b413-a3c5357b31a7', functionName: 'testFunction' }}
    ${'f2f016c7-16c3-5983-b413-a3c5357b31a7/testFunction2'} | ${{ fileId: 'f2f016c7-16c3-5983-b413-a3c5357b31a7', functionName: 'testFunction2' }}
  `('returns fileId and functionName: "$expected" when functionId: "$functionId"', ({ functionId, expected }) => {
    expect(parseFunctionId(functionId)).toEqual(expected);
  });
});
