import path from 'path';

import { getFileCreatedDate, getFilesList, isPathExist, readEntityFromFile } from '@app/utils';
import { CACHE_FOLDER_PATH } from '@app/config';
import type { File, Function, Call, CallFile } from '@app/types';
import { CALLS_FOLDER_NAME } from '@app/constants';

const getCallFromFile = async (functionDirPath: string, fileName: string): Promise<Call> => {
  const callPath = path.join(functionDirPath, fileName);
  const [fileContent, fileDate] = await Promise.all([
    readEntityFromFile<CallFile>(callPath),
    getFileCreatedDate(callPath),
  ]);

  return {
    _id: fileName.substring(0, fileName.length - 5),
    args: fileContent.args,
    result: fileContent.result,
    createdAt: fileDate,
  };
};

export const getCalls = async ({
  fileId,
  funcName,
  callIds,
}: {
  fileId: File['_id'];
  funcName: Function['name'];
  callIds?: Call['_id'][];
}): Promise<Call[]> => {
  const functionDirectoryPath = path.join(CACHE_FOLDER_PATH, fileId, funcName, CALLS_FOLDER_NAME);
  const isFunctionDirectoryExist = await isPathExist(functionDirectoryPath);

  if (!isFunctionDirectoryExist) {
    return Promise.resolve([]);
  }

  const callsFilesList = callIds
    ? callIds.map((callId) => `${callId}.json`)
    : await getFilesList(functionDirectoryPath);

  return Promise.all(callsFilesList.map((fileName) => getCallFromFile(functionDirectoryPath, fileName)));
};
