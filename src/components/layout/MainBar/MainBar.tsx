import styled from "styled-components";
import MainBarActions from "./MainBarActions";
import MainBarUser from "./MainBarUser";

const StyledHeader = styled.header`
    display: flex;
    justify-content: flex-end;
    column-gap: 3.2rem;
    grid-column: 2 / -1;
    grid-row: 1 / 2;
    padding: var(--main-bar-vertical-padding) 3.2rem var(--main-bar-vertical-padding);
`;

const MainBar = () => {
    return (
        <StyledHeader className="bg-background-primary">
            <MainBarUser />
            <MainBarActions />
        </StyledHeader>
    );
};

export default MainBar;
