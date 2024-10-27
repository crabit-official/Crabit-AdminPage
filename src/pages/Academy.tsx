import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { css } from '@emotion/react';
import useAcademy from '@hooks/useAcademy.ts';
import useDebounce from '@hooks/useDebounce.ts';
import useGetInfinitePendingAcademyList from '@hooks/useGetInfinitePendingAcademyList.ts';
import Button from '@shared/Button.tsx';
import Flex from '@shared/Flex.tsx';
import ListRow from '@shared/ListRow.tsx';
import Spacing from '@shared/Spacing.tsx';
import TextField from '@shared/TextField.tsx';

function AcademyPage() {
  const [academyName, setAcademyName] = useState('');
  const debouncedValue = useDebounce(academyName, 300);

  const { data: academies, isFetching, hasNextPage, fetchNextPage } = useGetInfinitePendingAcademyList(5, debouncedValue);
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const { acceptAcademyMutation, rejectAcademyMutation } = useAcademy();

  const handleChangeAcademyName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setAcademyName(e.target.value);
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
        <TextField value={academyName} onChange={handleChangeAcademyName} placeholder="학원 이름을 입력해주세요!" />
        <Spacing size={18} />
      </div>
      {academies?.pages
        ?.map((page) => page.result.pendingAcademyList)
        .flat()
        .map((academy) => {
          return (
            <ListRow
              key={academy.academy.academyId}
              contents={<ListRow.Texts title={`${academy.academy.name} | ${academy.academy.studentCount}명`} subTitle={academy.academy.contactNumber} />}
              right={
                <Flex css={buttonContainer}>
                  <Button
                    onClick={() => {
                      acceptAcademyMutation.mutate({ academyId: academy.academy.academyId });
                    }}
                  >
                    승인
                  </Button>
                  <Button onClick={() => rejectAcademyMutation.mutate({ academyId: academy.academy.academyId })} color="error">
                    거절
                  </Button>
                </Flex>
              }
            />
          );
        })}
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

const buttonContainer = css`
  gap: 10px;
`;

export default AcademyPage;
