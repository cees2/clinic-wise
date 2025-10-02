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
import { FaAngleDoubleLeft } from "react-icons/fa";
import { useMemo, useState } from "react";

const StyledNavigation = styled.aside<{ $navigationState: MainNavigationState }>`
    width: 6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 6.4rem;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 20;
    grid-column: 1 / 2;
    grid-row: 1 / -1;
    background-color: var(--background-primary);
    transition: all var(--duration-fast) ease-in;
    position: sticky;

    ${({ $navigationState }) => {
        if ($navigationState === MainNavigationState.OPEN) {
            return css`
                position: fixed;
                width: 100%;
                height: 100vh;

                @media (min-width: 48em) {
                    width: 24rem;
                    position: sticky;
                }
            `;
        }
    }}

    svg.toggle-icon {
        height: 2.4rem;
        width: 2.4rem;
        cursor: pointer;
        transition: var(--duration-fast) ease-in;
        margin: 2.4rem auto 0;

        ${({ $navigationState }) => {
            if ($navigationState === MainNavigationState.OPEN)
                return css`
                    margin: 2.4rem 2.4rem 0 0;
                `;

            if ($navigationState === MainNavigationState.CLOSED)
                return css`
                    transform: rotate(180deg);
                    margin: 3.6rem auto 0;
                `;
        }}

        @media(min-width: 48rem) {
            width: 2rem;
            height: 2rem;
        }
    }

    & > nav {
        width: 100%;

        @keyframes moveFromTop {
            0% {
                transform: translateY(-100%);
            }
            70% {
                transform: translateY(50%);
            }
            100% {
                transform: translateY(0);
            }
        }

        animation: moveFromTop var(--duration-slow) ease-in-out;
    }
`;

const Image = styled.img.attrs({ src: "logo.png", alt: "ClinicWise logo" })`
    margin-top: 3.2rem;
    width: 20%;
    align-self: center;
`;

const NavigationList = styled.ul<{ $navigationState: MainNavigationState }>`
    display: flex;
    align-items: start;
    flex-direction: column;
    row-gap: 1.6rem;

    ${({ $navigationState }) => {
        if ($navigationState === MainNavigationState.CLOSED) {
            return css`
                width: 100%;
            `;
        }
    }}
`;

const MainNavigation = () => {
    const [navigationState, setNavigationState] = useState<MainNavigationState>(MainNavigationState.CLOSED);
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
            <nav className="flex items-center justify-center">
                <NavigationList $navigationState={navigationState}>
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
