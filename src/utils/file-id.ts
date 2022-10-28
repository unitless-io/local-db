import { v5 as uuidv5 } from 'uuid';

export const getFileId = (filePath: string) => {
  return uuidv5(filePath, uuidv5.URL);
};
