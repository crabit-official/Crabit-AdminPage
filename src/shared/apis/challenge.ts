import { client } from '../helpers/axios';
import {
  TCreateCrabitChallengeRequest,
  TCreateCrabitChallengeResponse,
} from '../types/challenge';

// 크래빗 챌린지 생성
export const createCrabitChallenge = async ({
  title,
  content,
  thumbnailImageUrl,
  fileUrl,
  challengeCategory,
  challengeLogType,
}: TCreateCrabitChallengeRequest): Promise<TCreateCrabitChallengeResponse> => {
  const { data } = await client.post(
    `/api/v1/admin/challenges/challenge-core`,
    {
      title,
      content,
      thumbnailImageUrl,
      fileUrl,
      challengeCategory,
      challengeLogType,
    }
  );

  return data;
};
