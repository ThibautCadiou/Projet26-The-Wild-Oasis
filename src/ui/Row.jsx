import styled, { css } from 'styled-components';

const Row = styled.div`
  display: flex;

  ${(propos) =>
    propos.type === 'horizontal' &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  ${(propos) =>
    propos.type === 'vertical' &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = { type: 'vertical' };

export default Row;
