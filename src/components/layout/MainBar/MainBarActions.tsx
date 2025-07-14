import { HiOutlineMoon } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";
import styled from "styled-components";
import { useAuthentication } from "../../../services/hooks/authentication/useAuthentication";

const StyledMainBarActions = styled.div.attrs({ role: "group" })`
    display: flex;
    column-gap: 0.8rem;

    & > svg {
        width: 2.4rem;
        height: 2.4rem;
        transition: var(--duration-fast) ease-out;

        &:hover {
            cursor: pointer;
            transform: scale(110%);
        }
    }
`;

const MainBarActions = () => {
    const { logout } = useAuthentication();

    

    return (
        <StyledMainBarActions role="group" className="flex gap-y-2 items-center">
            <HiOutlineMoon />
            <IoLogOutOutline
                onClick={() => {
                    logout.mutate();
                }}
            />
        </StyledMainBarActions>
    );
};

export default MainBarActions;
