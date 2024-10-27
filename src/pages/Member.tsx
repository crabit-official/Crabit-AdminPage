import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { css } from '@emotion/react';
import useDebounce from '@hooks/useDebounce.ts';
import useGetInfiniteCrabitMembers from '@hooks/useGetInfiniteCrabitMembers.ts';
import ListRow from '@shared/ListRow.tsx';
import Spacing from '@shared/Spacing.tsx';
import TextField from '@shared/TextField.tsx';

function MemberPage() {
  const [memberName, setMemberName] = useState('');
  const debouncedValue = useDebounce(memberName, 300);

  const { data: members, isFetching, hasNextPage, fetchNextPage } = useGetInfiniteCrabitMembers(5, debouncedValue);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const handleChangeMemberName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setMemberName(e.target.value);
  }, []);

  useEffect(() => {
    if (inView) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <div css={container}>
      <div>
        <TextField value={memberName} onChange={handleChangeMemberName} placeholder="학원 이름을 입력해주세요!" />
        <Spacing size={18} />
      </div>
      {members?.pages
        ?.map((page) => page.result.memberList)
        .flat()
        .map((member) => (
          <ListRow key={member.memberId} contents={<ListRow.Texts title={member.name} subTitle={member.email} />} right={member.deletedAt ? '탈퇴' : '유저'} />
        ))}
      <div ref={ref} css={loadingContainer}>
        {isFetching && <ListRow.Skeleton />}
      </div>
    </div>
  );
}

const container = css`
  padding: 24px;
`;

const loadingContainer = css`
  margin-top: 50px;
  justify-content: center;
  width: 100%;
`;

export default MemberPage;
