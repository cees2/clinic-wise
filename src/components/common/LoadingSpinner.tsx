import { useEffect, useRef, useState } from "react";
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
    text-align: center;
    font-size: 2rem;
    font-weight: var(--font-weight-medium);
`;

const StyledLoadingSpinner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1.2rem;
    margin-top: 2.4rem;
`;

export const LoadingSpinner = () => {
    const [loadingCaption, setLoadingCaption] = useState("Loading");
    const intervalID = useRef<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
        let dotsCounter = 0;

        intervalID.current = setInterval(() => {
            dotsCounter++;

            const currentNumberOfDotsToRender = dotsCounter % 4;
            const newCaption = `Loading${".".repeat(currentNumberOfDotsToRender)}`;
            setLoadingCaption(newCaption);
        }, 400);

        return () => {
            clearInterval(intervalID.current);
        };
    }, []);

    return (
        <StyledLoadingSpinner>
            <Spinner />
            <StyledSpinnerText>{loadingCaption}</StyledSpinnerText>
        </StyledLoadingSpinner>
    );
};
