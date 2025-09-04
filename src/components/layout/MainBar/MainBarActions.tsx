import { HiOutlineMoon } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";
import styled from "styled-components";
import { useAuthentication } from "../../../services/hooks/authentication/useAuthentication";
import { useDarkMode } from "../../../utils/hooks/useDarkMode.ts";
import { AppColorMode } from "../../../utils/projectTypes.ts";
import { toggleHTMLElementColorMode } from "../../../utils/utils.ts";

const StyledMainBarActions = styled.div.attrs({ role: "group" })`
    display: flex;
    column-gap: 0.8rem;

    & > svg {
        width: 2.4rem;
        height: 2.4rem;
        transition: var(--duration-fast) ease-out;
        stroke: var(--color-font-primary);
        fill: var(--color-font-primary);

        &:hover {
            cursor: pointer;
            transform: scale(110%);
        }
    }
`;

const MainBarActions = () => {
    const { logout } = useAuthentication();
    const { setAppMode } = useDarkMode();

    const toggleMode = () => {
        setAppMode((prevMode) => (prevMode === AppColorMode.DARK ? AppColorMode.LIGHT : AppColorMode.DARK));
        toggleHTMLElementColorMode();
    };

    return (
        <StyledMainBarActions role="group" className="flex gap-y-2 items-center">
            <HiOutlineMoon onClick={toggleMode} />
            <IoLogOutOutline
                onClick={() => {
                    logout.mutate();
                }}
            />
        </StyledMainBarActions>
    );
};

export default MainBarActions;
