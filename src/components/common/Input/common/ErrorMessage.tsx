import styled from "styled-components";
import { IoIosInformationCircleOutline } from "react-icons/io";

const StyledErrorMessage = styled.span.attrs({ role: "alert" })`
    font-size: 1.2rem;
    color: var(--color-red-700);
    margin-top: 0.8rem;
    margin-left: 0.6rem;
    display: flex;
    align-items: center;
    column-gap: 0.2rem;
    height: 1.9rem;

    & > svg {
        width: 1.8rem;
        height: 1.8rem;
    }
`;

export const ErrorMessage = ({ error }: { error: string | null }) => {
    return (
        <StyledErrorMessage>
            {error && (
                <>
                    <IoIosInformationCircleOutline />
                    <span>{error}</span>
                </>
            )}
        </StyledErrorMessage>
    );
};
