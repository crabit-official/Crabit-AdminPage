import { S3_FOLDER } from '../enum';
import { TCommonResponse } from './common';

export type TRequestPresignedURLRequest = {
  fileName: string;
  s3Folder: S3_FOLDER;
};

export type TRequestPresignedURLResponse = TCommonResponse<{
  url: string;
  keyName: string;
}>;
