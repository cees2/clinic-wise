import styled from "styled-components";
import { IoIosInformationCircleOutline } from "react-icons/io";
import type { Children } from "../../../../utils/projectTypes.ts";

const StyledErrorMessage = styled.span.attrs({ role: "alert" })`
    font-size: 1.4rem;
    color: var(--color-red-700);
    margin-top: 0.8rem;
    margin-left: 0.6rem;
    display: flex;
    align-items: center;
    column-gap: 0.2rem;

    & > svg {
        width: 1.8rem;
        height: 1.8rem;
    }
`;

export const ErrorMessage = ({ children }: Children) => {
    return (
        <StyledErrorMessage>
            <IoIosInformationCircleOutline />
            <span> {children}</span>
        </StyledErrorMessage>
    );
};
