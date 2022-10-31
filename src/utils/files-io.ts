import fs, { promises as fsPromises } from 'fs';
import { META_FILE_NAME } from '@app/constants';

export const readMetaFile = <T>(path: string): T => JSON.parse(fs.readFileSync(path, 'utf8'));

export const writeMetaFile = <T extends object>(path: string, data: T) => {
  fs.writeFileSync(path, JSON.stringify(data));
};

export const getFilesList = async (path: string) => {
  const filesList = await fsPromises.readdir(path, { withFileTypes: true });
  return filesList.filter((node) => node.isFile() && node.name !== META_FILE_NAME).map((node) => node.name);
};

export const getDirectoriesList = async (path: string) => {
  const filesList = await fsPromises.readdir(path, { withFileTypes: true });
  return filesList.filter((node) => node.isDirectory() && node.name !== META_FILE_NAME).map((node) => node.name);
};

export const writeFile = <T extends object>(path: string, data: T) => {
  return fsPromises.writeFile(path, JSON.stringify(data));
};
