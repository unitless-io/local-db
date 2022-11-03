import path from 'path';

import { getFilesList, removeFile } from '@app/utils';
import { CACHE_FOLDER_PATH } from '@app/config';
import { CALLS_FOLDER_NAME } from '@app/constants';
import { getFiles } from '@app/get-files';
import { getFunctions } from '@app/get-functions';

export const deleteAllCalls = async (): Promise<void> => {
  const files = await getFiles();

  await Promise.all(
    Object.keys(files).map(async (fileId) => {
      const functions = await getFunctions(fileId);

      await Promise.all(
        functions.map(async (funcName) => {
          const functionDirectoryPath = path.join(CACHE_FOLDER_PATH, fileId, funcName, CALLS_FOLDER_NAME);

          const callsFilesList = await getFilesList(functionDirectoryPath);

          await Promise.all(
            callsFilesList.map((callFileName) => removeFile(path.join(functionDirectoryPath, callFileName)))
          );
        })
      );
    })
  );

  return;
};
