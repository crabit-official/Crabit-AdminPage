import {
  ALLOWED_STATUS,
  APPROVAL_STATUS,
  FREEMIUM_TIER,
  SOCIAL_TYPE,
} from '../enum';

export type TAcademyDTO = {
  academyId: number;
  academyName: string;
  email: string;
  address: string;
  addressDetail: string;
  mainImageUrl: string;
  freemiumTier: FREEMIUM_TIER;
  contactNumber: string;
  approvalStatus: APPROVAL_STATUS;
  createdAt: Date;
  deletedAt: Date;
};

export type TTeacherDTO = {
  academyMemberId: number;
  nickname: string;
  introduction: string;
  profileImageUrl: string;
  createdAt: Date;
  deletedAt: Date;
};

export type TMemberDTO = {
  memberId: number;
  name: string;
  profileImageUrl: string;
  email: string;
  socialType: SOCIAL_TYPE;
  createdAt: Date;
  deletedAt: Date;
  privacyPolicyAllowed: ALLOWED_STATUS;
  termsOfServiceAllowed: ALLOWED_STATUS;
  marketingEmailAllowed: ALLOWED_STATUS;
};
