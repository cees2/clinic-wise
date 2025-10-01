import styled, { css } from "styled-components";
import type { KnownTarget } from "styled-components/dist/types";
import type { HeaderProps } from "../../../utils/projectTypes";
import { Button } from "../../layout/Button";
import { useNavigate } from "react-router-dom";
import { ButtonGroup } from "../ButtonGroup.tsx";

export const StyledHeader = styled.header`
    color: var(--color-font-2);
    & > h1,
    & > h2,
    & > h3,
    & > h4,
    & > h5,
    & > h6 {
        letter-spacing: 1px;
    }

    color: var(--font-primary);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    column-gap: 4.8rem;
    row-gap: 1.2rem;

    @media (min-width: 40em) {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }

    & div[role="group"] > button {
        flex: 1 1 auto;
    }
`;

const HeaderElement = styled.h1<{ as: KnownTarget }>`
    ${(props) => {
        switch (props.as) {
            case "h1":
                return css`
                    font-size: 4.4rem;
                    font-weight: var(--font-weight-semibold);
                `;
            case "h2":
                return css`
                    font-size: 3.6rem;
                    font-weight: var(--font-weight-semibold);
                `;
            case "h3":
                return css`
                    font-size: 3rem;
                    font-weight: var(--font-weight-semibold);
                `;
            case "h4":
                return css`
                    font-size: 2.4rem;
                    font-weight: var(--font-weight-medium);
                `;
            case "h5":
                return css`
                    font-size: 2rem;
                    font-weight: var(--font-weight-medium);
                `;
            case "h6":
            default:
                return css`
                    font-size: 1.6rem;
                    font-weight: var(--font-weight-medium);
                `;
        }
    }}
`;

export const Header = ({ as, title, buttons, className }: HeaderProps) => {
    const navigate = useNavigate();

    return (
        <StyledHeader className={className}>
            <HeaderElement as={as}>{title}</HeaderElement>
            {buttons && (
                <ButtonGroup className="flex-col flex-wrap gap-y-6 sm:flex-row sm:gap-3">
                    {buttons.map((button) => {
                        const { title, path, onClick, visible, variant } = button;

                        if (visible === false) {
                            return null;
                        }

                        const onClickInternal = async () => {
                            if (path) {
                                await navigate(path);
                            }

                            onClick?.();
                        };

                        return (
                            <Button key={title} onClick={() => void onClickInternal()} variant={variant}>
                                {title}
                            </Button>
                        );
                    })}
                </ButtonGroup>
            )}
        </StyledHeader>
    );
};
