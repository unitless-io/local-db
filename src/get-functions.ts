import fs from 'fs';
import path from 'path';

import { getDirectoriesList, getFileCreatedDate, readEntityFromFile } from '@app/utils';
import { CACHE_FOLDER_PATH } from '@app/config';
import { META_FILE_NAME } from '@app/constants';
import type { File, Function, FunctionMeta } from '@app/types';

export const getFunctions = async (fileId: File['_id']): Promise<Function['name'][]> => {
  const functionsDir = path.join(CACHE_FOLDER_PATH, fileId);

  if (!fs.existsSync(functionsDir)) {
    return Promise.resolve([]);
  }

  return getDirectoriesList(functionsDir);
};

const getFunctionFromFile = async (funcFilePath: string, funcName: string): Promise<Function> => {
  const functionPath = path.join(funcFilePath);
  const [fileContent, fileDate] = await Promise.all([
    readEntityFromFile<FunctionMeta>(functionPath),
    getFileCreatedDate(functionPath),
  ]);

  return {
    name: funcName,
    type: fileContent.type,
    contentChangedAt: fileDate, // TODO: replace with real content change date
  };
};

export const getFunction = ({
  fileId,
  funcName,
}: {
  fileId: File['_id'];
  funcName: Function['name'];
}): Promise<Function | null> => {
  const functionMetaFilePath = path.join(CACHE_FOLDER_PATH, fileId, funcName, META_FILE_NAME);

  if (!fs.existsSync(functionMetaFilePath)) {
    return Promise.resolve(null);
  }

  return getFunctionFromFile(functionMetaFilePath, funcName);
};
