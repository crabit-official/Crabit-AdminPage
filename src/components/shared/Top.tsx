import { css } from '@emotion/react';
import Flex from '@shared/Flex.tsx';
import Text from '@shared/Text.tsx';

interface ITop {
  title: string;
  subTitle: string;
}

function Top({ title, subTitle }: ITop) {
  return (
    <Flex direction="column" css={containerStyles}>
      <Text bold typography="t4">
        {title}
      </Text>
      <Text typography="t7" color="gray400">
        {subTitle}
      </Text>
    </Flex>
  );
}

const containerStyles = css`
  padding: 24px;
`;

export default Top;
