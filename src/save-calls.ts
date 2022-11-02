import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { CACHE_FOLDER_PATH } from '@app/config';
import { writeFile } from '@app/utils';
import { CALLS_FOLDER_NAME } from '@app/constants';
import type { Call } from '@app/types/call';

export const saveCalls = (functionId: string, calls: Pick<Call, 'args' | 'result'>[]) => {
  try {
    const callsWithId = calls.map((call) => ({ ...call, id: uuidv4() }));

    return Promise.all(
      callsWithId.map(({ id, args, result }) =>
        writeFile(path.join(CACHE_FOLDER_PATH, functionId, CALLS_FOLDER_NAME, `${id}.json`), {
          args,
          result,
        })
      )
    );
  } catch (error) {
    console.error(error);
  }
};
