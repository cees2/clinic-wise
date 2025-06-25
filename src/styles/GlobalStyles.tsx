import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    *,
    *::before,
    *::after{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root{
        font-size: 62.5%;
    }

    body{
        font-family: "Lato", sans-serif;
        line-height: 1.5;
        font-weight: var(--font-weight-default);
        font-size: 1.6rem;
        color: var(--color-gray-700);
    }

    html{
        --color-primary: #16a34a;
        --color-primary-dark: #15803d;
        --color-primary-light: #22c55e;
        --color-primary-light-2: #dcfce7;

        --color-danger: #b91c1c;
        --color-danger-dark: #991b1b;
        --color-danger-light: #fee2e2;

        --border-radius-sm: 0.4rem;
        --border-radius-md: 0.8rem;
        --border-radius-bg: 1.2rem;

        --font-weight-light: 300;
        --font-weight-default: 400;
        --font-weight-normal: 500;
        --font-weight-bold: 600;
        --font-weight-x-bold: 700;

        --duration-fastest: 100ms;
        --duration-fast: 200ms;
        --duration-default: 300ms;
        --duration-slow: 400ms;
    }

    input:focus{
        box-shadow: 0px 0px 15px 0px rgba(22, 163, 74, 1);
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
        border-radius: var(--border-radius-md);
    }
`;

export default GlobalStyles;
