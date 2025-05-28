import styled, { css } from "styled-components";
import type { KnownTarget } from "styled-components/dist/types";

interface Props {
  title: string;
  as: KnownTarget;
}

const StyledHeader = styled.h1<{ as: KnownTarget }>`
  ${(props) => {
    switch (props.as) {
      case "h1":
        return css`
          font-size: 4.4rem;
          font-weight: var(--font-weight-bold);
        `;
      case "h2":
        return css`
          font-size: 3.6rem;
          font-weight: var(--font-weight-bold);
        `;
      case "h3":
        return css`
          font-size: 3rem;
          font-weight: var(--font-weight-bold);
        `;
      case "h4":
        return css`
          font-size: 2.4rem;
          font-weight: var(--font-weight-normal);
        `;
    }
  }}

  letter-spacing: 2px;
`;

export const Header = ({ as, title }: Props) => {
  return <StyledHeader as={as}>{title}</StyledHeader>;
};
