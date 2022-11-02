export interface CallFile {
  args: string;
  result: string;
}

export type Call = CallFile & {
  _id: string;
  createdAt: string;
};
