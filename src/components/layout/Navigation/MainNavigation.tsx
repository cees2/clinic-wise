import styled, { css } from "styled-components";
import MainNavigationItem from "./MainNavigationItem";
import { type MainNavigationConfigItem, MainNavigationState, UserRole } from "../../../utils/projectTypes";
import { MdOutlineCalendarMonth, MdOutlineRoomPreferences } from "react-icons/md";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi";
import FakerComponent from "../Faker/Faker";
import { GrUserWorker } from "react-icons/gr";
import { useAuthContext } from "../../../utils/contexts/AuthContext";
import { useMemo, useState } from "react";
import { FaAngleDoubleLeft } from "react-icons/fa";

const StyledNavigation = styled.aside<{ $navigationState: MainNavigationState }>`
    width: 20rem;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    row-gap: 8rem;
    height: 100vh;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 20;
    grid-column: 1 / 2;
    grid-row: 1 / -1;
    background-color: var(--background-primary);
    transition: var(--duration-fast) ease-in;

    ${({ $navigationState }) => {
        return (
            $navigationState === MainNavigationState.CLOSED &&
            css`
                width: max-content;
            `
        );
    }}

    svg.toggle-icon {
        height: 1.6rem;
        width: 1.6rem;
        cursor: pointer;
        margin: 2.4rem 2.4rem 0 0;
        transition: var(--duration-fast) ease-in;

        ${({ $navigationState }) => {
            if ($navigationState === MainNavigationState.OPEN) return "transform: rotate(180deg);";

            if ($navigationState === MainNavigationState.CLOSED)
                return css`
                    margin: 3.6rem auto 0;
                `;
        }}
    }
`;

const Image = styled.img.attrs({ src: "logo.png", alt: "ClinicWise logo" })`
    margin-top: 3.2rem;
    width: 50%;
    align-self: center;
`;

const NavigationList = styled.ul`
    display: flex;
    flex-direction: column;
    row-gap: 1.2rem;
    padding: 0 0.8rem;
`;

const MainNavigation = () => {
    const [navigationState, setNavigationState] = useState<MainNavigationState>(MainNavigationState.OPEN);
    const { user } = useAuthContext();

    const mainNavigationConfig: MainNavigationConfigItem[] = useMemo(
        () => [
            {
                to: "/dashboard",
                title: "Dashboard",
                icon: <LuChartNoAxesCombined />,
                visible: user?.user_metadata.role === UserRole.ADMIN || user?.user_metadata.role === UserRole.DOCTOR,
            },
            {
                to: "/appointments",
                title: "Appointments",
                icon: <MdOutlineCalendarMonth />,
                visible: user?.user_metadata.role === UserRole.ADMIN || user?.user_metadata.role === UserRole.DOCTOR,
            },
            {
                to: "/patients",
                title: "Patients",
                icon: <HiOutlineUsers />,
            },
            {
                to: "/employees",
                title: "Employees",
                icon: <GrUserWorker />,
                visible:
                    user?.user_metadata.role === UserRole.ADMIN || user?.user_metadata.role === UserRole.REGISTRATION,
            },
            {
                to: "/room-occupancies",
                title: "Rooms",
                icon: <MdOutlineRoomPreferences />,
            },
            {
                to: "/settings",
                title: "Settings",
                icon: <IoSettingsOutline />,
            },
        ],
        [user?.user_metadata.role],
    );

    const toggleNavigationState = () =>
        setNavigationState((prevState) =>
            prevState === MainNavigationState.OPEN ? MainNavigationState.CLOSED : MainNavigationState.OPEN,
        );

    return (
        <StyledNavigation $navigationState={navigationState}>
            <div className="flex flex-col items-end">
                <FaAngleDoubleLeft className="toggle-icon" onClick={toggleNavigationState} />
                {navigationState === MainNavigationState.OPEN && <Image />}
            </div>
            <nav>
                <NavigationList>
                    {mainNavigationConfig.map((navigationItem) => (
                        <MainNavigationItem
                            key={navigationItem.title}
                            navigationItem={navigationItem}
                            navigationState={navigationState}
                        />
                    ))}
                </NavigationList>
            </nav>
            {navigationState === MainNavigationState.OPEN && <FakerComponent />}
        </StyledNavigation>
    );
};

export default MainNavigation;
