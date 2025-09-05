import styled from "styled-components";
import MainBarActions from "./MainBarActions";
import MainBarUser from "./MainBarUser";

const StyledHeader = styled.header`
    display: flex;
    justify-content: flex-end;
    column-gap: 3.2rem;
    grid-column: 2 / -1;
    grid-row: 1 / 2;
    padding: 1.6rem 3.2rem 1.6rem;
`;

const MainBar = () => {
    return (
        <StyledHeader className="flex justify-end col-start-2 col-end-3 row-start-1 row-end-2 p-4 bg-background-primary">
            <MainBarUser />
            <MainBarActions />
        </StyledHeader>
    );
};

export default MainBar;
