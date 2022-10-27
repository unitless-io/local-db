import fs from 'fs';
import path from 'path';

import { CACHE_FOLDER_PATH } from '@app/config';
import { META_FILE_NAME } from '@app/constants';
import { readMetaFile, writeMetaFile } from '@app/utils';

export const saveFile = (filePath: string, fileId: string) => {
  const filesMetaFilePath = path.join(CACHE_FOLDER_PATH, META_FILE_NAME);

  fs.mkdirSync(CACHE_FOLDER_PATH, { recursive: true });

  let metaJson: Record<string, string> = {};

  if (fs.existsSync(filesMetaFilePath)) {
    metaJson = readMetaFile(filesMetaFilePath);
  }

  metaJson[fileId] = filePath;

  writeMetaFile(filesMetaFilePath, metaJson);
};
