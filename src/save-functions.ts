import fs from 'fs';
import path from 'path';

import { CACHE_FOLDER_PATH } from '@app/config';
import { CALLS_FOLDER_NAME, FunctionType, META_FILE_NAME } from '@app/constants';
import type { FunctionMeta } from '@app/types';
import { writeMetaFile } from '@app/utils';

export const saveFunctions = (
  functions: {
    type: FunctionType;
    name: string;
    content: string;
    id: string;
  }[]
) => {
  functions.forEach(({ content, id, type }) => {
    const functionMeta: FunctionMeta = { content, type };

    fs.mkdirSync(path.join(CACHE_FOLDER_PATH, id, CALLS_FOLDER_NAME), { recursive: true });

    writeMetaFile(path.join(CACHE_FOLDER_PATH, id, META_FILE_NAME), functionMeta);
  });
};
