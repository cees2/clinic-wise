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
        font-family: "Inter Tight", sans-serif;
        line-height: 1.5;
        font-weight: var(--font-weight-default);
        font-size: 1.6rem;
        color: var(--color-gray-700);
        background-color: var(color-gray-50);
    }

    html{
        --color-gray-50: #f9fafb;
        --color-gray-100: #f3f4f6;
        --color-gray-200: #e5e7eb;
        --color-gray-300: #d1d5db;
        --color-gray-400: #9ca3af;
        --color-gray-500: #6b7280;
        --color-gray-600: #4b5563;
        --color-gray-700: #374151;
        --color-gray-800: #1f2937;
        --color-gray-900: #111827;
        --color-gray-950: #030712;

        --color-primary: #16a34a;
        --color-primary-light: #dcfce7;

        --border-radius-sm: 0.4rem;
        --border-radius-md: 0.8rem;
        --border-radius-bg: 1.2rem;

        --font-weight-light: 300;
        --font-weight-default: 400;
        --font-weight-normal: 500;
        --font-weight-bold: 600;
        --font-weight-x-bold: 700;

        --duration-fast: 200ms;
        --duration-default: 300ms;
        --duration-slow: 400ms;
    }

    input:focus{
        box-shadow: 0px 0px 15px 0px rgba(22, 163, 74, 1);
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
`;

export default GlobalStyles;
