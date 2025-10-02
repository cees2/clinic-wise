import styled from "styled-components";
import { MdErrorOutline } from "react-icons/md";
import { Button } from "./Button";
import { Link } from "react-router-dom";

const StyledErrorBoundary = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    margin-top: auto;
    justify-content: center;
    align-items: center;

    & > svg {
        width: 4.8rem;
        height: 4.8rem;

        fill: var(--color-red-500);
    }

    & > .heading {
        font-size: 3.2rem;
        margin-bottom: 2.4rem;
    }

    & > button {
        padding: 0.4rem 0.8rem;
        margin-top: 1.2rem;

        > a {
            font-size: 1rem;
            padding: 0;
        }
    }

    & .app-issue-link {
        color: var(--color-green-600);
    }
`;

const ClinicWiseErrorBoundary = () => {
    return (
        <StyledErrorBoundary>
            <MdErrorOutline />
            <h2 className="heading">An error has occurred</h2>
            <p>
                This was an internal problem with the app. Feel free to report it{" "}
                <a
                    className="app-issue-link"
                    href="https://github.com/cees2/clinic-wise/issues/new"
                    target="_blank"
                    rel="noreferrer"
                >
                    here
                </a>
            </p>
            <Button>
                <Link to="/dashboard">Return to the main page</Link>
            </Button>
        </StyledErrorBoundary>
    );
};

export default ClinicWiseErrorBoundary;
