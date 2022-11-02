import fs from 'fs';
import path from 'path';

import { getDirectoriesList, readEntityFromFile, readMetaFile } from '@app/utils';
import { CACHE_FOLDER_PATH } from '@app/config';
import { META_FILE_NAME } from '@app/constants';
import type { File } from '@app/types/file';
import { IOErrors } from '@app/constants/io-errors';

export const getFiles = async (): Promise<Record<File['_id'], File>> => {
  const filesMetaFilePath = path.join(CACHE_FOLDER_PATH, META_FILE_NAME);

  if (!fs.existsSync(filesMetaFilePath)) {
    return Promise.resolve({});
  }

  const metaJson: Record<string, string> = readMetaFile(filesMetaFilePath);
  const dirsList = await getDirectoriesList(CACHE_FOLDER_PATH);

  const filesMap: Record<File['_id'], File> = {};
  dirsList.forEach((fileId) => {
    if (metaJson[fileId]) {
      filesMap[fileId] = { _id: fileId, path: metaJson[fileId] };
    }
  });

  return filesMap;
};

export const getFile = async (fileId: File['_id']): Promise<File | null> => {
  const filesMetaFilePath = path.join(CACHE_FOLDER_PATH, META_FILE_NAME);

  try {
    const metaJson = await readEntityFromFile<Record<string, string>>(filesMetaFilePath);
    return { _id: fileId, path: metaJson[fileId] };
  } catch (err: any) {
    if (err?.code === IOErrors.EntryNotFound) {
      return null;
    }

    throw err;
  }
};
