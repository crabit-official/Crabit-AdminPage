import { CHALLENGE_CATEGORY, CHALLENGE_LOG_TYPE } from '../enum';
import { TCommonResponse } from './common';

// 크래빗 챌린지 생성
export type TCreateCrabitChallengeRequest = {
  title: string;
  content: string;
  thumbnailImageUrl: string | null;
  fileUrl: string | null;
  challengeCategory: CHALLENGE_CATEGORY;
  challengeLogType: CHALLENGE_LOG_TYPE;
};

export type TCreateCrabitChallengeResponse = TCommonResponse<{
  challengeCoreId: number;
}>;
