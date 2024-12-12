import { client } from '../helpers/axios';
import { sanitizeFileName } from '../helpers/url';
import {
  TRequestPresignedURLRequest,
  TRequestPresignedURLResponse,
} from '../types/image';

export const requestPresignedURL = async ({
  fileName,
  s3Folder,
}: TRequestPresignedURLRequest): Promise<TRequestPresignedURLResponse> => {
  const { data } = await client.post(`/api/v1/s3/presigned/upload`, {
    fileName: sanitizeFileName(fileName),
    s3Folder,
  });

  return data;
};
