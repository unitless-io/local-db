import { FunctionType } from '@app/constants';

export interface FunctionDto {
  filePath: string;
  type: FunctionType;
  name: string;
  content: string;
}

export interface FunctionMeta {
  type: FunctionType;
  content: string;
}

export interface Function {
  type: FunctionType;
  name: string;
  contentChangedAt: string;
}
