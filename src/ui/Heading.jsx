/* eslint-disable no-constant-condition */
import styled, { css } from 'styled-components';
const Heading = styled.h1`
  ${(props) =>
    props.as === 'h1' &&
    css`
      font-size: 3rem;
      font-weight: 600;
      padding: 0.8rem 1.2rem;
    `}
  ${(props) =>
    props.as === 'h2' &&
    css`
      font-size: 2rem;
      font-weight: 600;
      padding: 0.8rem 1.2rem;
    `}
  ${(props) =>
    props.as === 'h3' &&
    css`
      font-size: 2rem;
      font-weight: 500;
      padding: 0.8rem 1.2rem;
    `}
  ${(props) =>
    props.as === 'h4' &&
    css`
      font-size: 3rem;
      font-weight: 600;
      padding: 0.8rem 1.2rem;
      text-align: center;
    `}
  line-height: 1.4rem
`;

export default Heading;
