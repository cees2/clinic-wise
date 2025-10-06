import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

export const Spinner = styled.div.attrs({ className: "spinner" })`
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

const StyledSpinnerText = styled.span<{ $forceDarkText?: true }>`
    text-align: center;
    font-size: 2rem;
    font-weight: var(--font-weight-medium);
    ${({ $forceDarkText }) => {
        return $forceDarkText
            ? css`
                  color: var(--color-gray-800);
              `
            : css`
                  color: var(--color-font-primary);
              `;
    }}
`;

const StyledLoadingSpinner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1.2rem;
    margin-top: 2.4rem;
`;

export const LoadingSpinner = ({ forceDarkText }: { forceDarkText?: true }) => {
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
            <StyledSpinnerText $forceDarkText={forceDarkText}>{loadingCaption}</StyledSpinnerText>
        </StyledLoadingSpinner>
    );
};
