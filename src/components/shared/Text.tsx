import type { CSSProperties } from 'react';
import styled from '@emotion/styled';
import type { Colors } from '@styles/colorPalette';
import { colors } from '@styles/colorPalette';
import type { Typography } from '@styles/typography';
import { typographyMap } from '@styles/typography';

interface IText {
  typography?: Typography;
  color?: Colors;
  // display 속성 받게 지원 가능
  display?: CSSProperties['display'];
  textAlign?: CSSProperties['textAlign'];
  fontWeight?: CSSProperties['fontWeight'];
  bold?: boolean;
}

const Text = styled.span<IText>(
  ({ color = 'black', display, textAlign, fontWeight, bold }) => ({
    color: colors[color], // var(--red)
    display,
    textAlign,
    // bold vs fontWeight -> bold가 더 우선순위가 높음
    fontWeight: bold ? 'bold' : fontWeight,
  }),
  ({ typography = 't5' }) => typographyMap[typography],
);

export default Text;
