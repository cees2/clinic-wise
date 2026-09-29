import styled from "styled-components";

export const ContentLayout = styled.div`
    --content-layout-vertical-margin: 1.2rem;
    margin: var(--content-layout-vertical-margin) 2.4rem;
    display: flex;
    flex-direction: column;
    row-gap: 2.4rem;
    max-width: 140rem;

    @media (min-width: 40em) {
        --content-layout-vertical-margin: 2.4rem;
        margin: var(--content-layout-vertical-margin) 3.2rem;
    }
`;
