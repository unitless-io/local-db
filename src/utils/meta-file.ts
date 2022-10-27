import fs from 'fs';

export const readMetaFile = <T>(path: string): T => JSON.parse(fs.readFileSync(path, 'utf8'));

export const writeMetaFile = <T extends object>(path: string, data: T) => {
  fs.writeFileSync(path, JSON.stringify(data));
};
