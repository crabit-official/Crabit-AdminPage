import styled from '@emotion/styled';
import type { Colors } from '@styles/colorPalette';
import { colors } from '@styles/colorPalette';

interface ISpacing {
  size: number;
  direction?: 'vertical' | 'horizontal';
  backgroundColor?: Colors;
}

const Spacing = styled.div<ISpacing>`
  ${({ size, direction = 'vertical' }) =>
    direction === 'vertical'
      ? `
        height: ${size}px;
      `
      : `
        width: ${size}px;
      `}

  ${({ backgroundColor }) => backgroundColor && `background-color: ${colors[backgroundColor]}`}
`;

export default Spacing;
