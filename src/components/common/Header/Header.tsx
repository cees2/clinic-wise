import styled, { css } from "styled-components";
import type { KnownTarget } from "styled-components/dist/types";
import type { HeaderProps } from "../../../utils/projectTypes";
import { Button } from "../../layout/Button";
import { useNavigate } from "react-router-dom";

export const StyledHeader = styled.h1<{ as: KnownTarget }>`
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

    & > h1,
    & > h2,
    & > h3,
    & > h4,
    & > h5,
    & > h6 {
        letter-spacing: 1px;
    }

    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const HeaderButtons = styled.div.attrs({ role: "group" })`
    display: flex;
    column-gap: 1.2rem;
`;

export const Header = ({ as, title, buttons }: HeaderProps) => {
    const navigate = useNavigate();

    return (
        <StyledHeader as={as}>
            {title}
            {buttons && (
                <HeaderButtons>
                    {buttons.map((button) => {
                        const { title, path, onClick, visible } = button;

                        if (!visible) {
                            return null;
                        }

                        const onClickInternal = async () => {
                            if (path) {
                                await navigate(path);
                            }

                            onClick?.();
                        };

                        return (
                            <Button key={title} onClick={() => void onClickInternal()}>
                                {title}
                            </Button>
                        );
                    })}
                </HeaderButtons>
            )}
        </StyledHeader>
    );
};
