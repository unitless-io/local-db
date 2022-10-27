import path from 'path';

// node_modules/.cache/@unitless-io/local-db/files
export const CACHE_FOLDER_PATH = path.resolve(
  __dirname, // dist
  '../../../', // local-db -> @unitless-io -> node_modules
  '.cache',
  '@unitless-io',
  'local-db',
  'files'
);
