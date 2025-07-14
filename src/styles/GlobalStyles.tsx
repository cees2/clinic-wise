import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root{
        font-size: 62.5%;
    }

    body{
        font-family: "Lato", sans-serif;
        line-height: 1.5;
        font-weight: var(--font-weight-medium);
        font-size: 1.6rem;
        color: var(--color-gray-700);
    }

    html{
        --color-primary: #16a34a;

        --duration-fastest: 100ms;
        --duration-fast: 200ms;
        --duration-default: 300ms;
        --duration-slow: 400ms;
    }

    input:not([id*="react-select"]):focus,
    textarea:focus{
        box-shadow: 0px 0px 3px 0px var(--color-primary);
        border-color: var(--color-primary);
        outline: none
    }

    ul{
        list-style-type: none;
    }

    img{
        max-width: 100%;
    }

    a{
        text-decoration: none;
    }

    input {
        padding: 1.2rem 1.6rem;
        border:none;
        border-radius: var(--radius-xl);
    }
`;

export default GlobalStyles;
