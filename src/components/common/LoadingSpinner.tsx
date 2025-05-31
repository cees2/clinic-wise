import styled from "styled-components";

const Spinner = styled.div`
    @keyframes rotateSpinner {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(1turn);
        }
    }

    width: 6rem;
    height: 6rem;
    border: 1rem solid var(--color-gray-300);
    border-top: 1rem solid var(--color-primary);
    border-radius: 50%;
    animation: rotateSpinner 2s linear infinite;
`;

const StyledSpinnerText = styled.span`
    font-size: 2rem;
    font-weight: var(--font-weight-normal);
`;

const StyledLoadingSpinner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1.2rem;
`;

export const LoadingSpinner = () => {
    return (
        <StyledLoadingSpinner>
            <Spinner />
            <StyledSpinnerText>Loading in progress...</StyledSpinnerText>
        </StyledLoadingSpinner>
    );
};
