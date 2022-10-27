import path from 'path';
import { nanoid } from 'nanoid';

import { CACHE_FOLDER_PATH } from '@app/config';
import { writeMetaFile } from '@app/utils';
import { CALLS_FOLDER_NAME } from '@app/constants';

export const saveCalls = (functionId: string, calls: { args: string; result: string }[]) => {
  try {
    calls.forEach(({ args, result }) => {
      writeMetaFile(path.join(CACHE_FOLDER_PATH, functionId, CALLS_FOLDER_NAME, `${nanoid()}.json`), {
        args,
        result,
      });
    });
  } catch (error) {
    console.error(error);
  }
};
