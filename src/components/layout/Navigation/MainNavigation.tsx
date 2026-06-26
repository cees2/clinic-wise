import styled, { css } from "styled-components";
import MainNavigationItem from "./MainNavigationItem";
import { type MainNavigationConfigItem, MainNavigationState } from "../../../utils/projectTypes";
import { MdKeyboardDoubleArrowLeft, MdOutlineCalendarMonth, MdOutlineRoomPreferences } from "react-icons/md";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi";
import FakerComponent from "../Faker/Faker";
import { GrUserWorker } from "react-icons/gr";
import { useMemo, useState } from "react";
import { UserAuthority } from "../../../services/apiTypes.ts";
import { useAuthentication } from "../../../services/hooks/authentication/useAuthentication.ts";

const StyledNavigation = styled.aside<{ $navigationState: MainNavigationState }>`
    width: 6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1.6rem;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 20;
    grid-column: 1 / 2;
    grid-row: 1 / -1;
    background-color: var(--background-secondary);
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
        transition: var(--default-transition-duration) ease-in;
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

    .nav-group-info {
        font-size: 1.2rem;
        color: var(--font-tertiary);
    }
`;

const Image = styled.img.attrs({ src: "logo.png", alt: "ClinicWise logo" })`
    margin-top: 1.2rem;
    width: 20%;
    align-self: center;
`;

const NavigationList = styled.ul<{ $navigationState: MainNavigationState }>`
    display: flex;
    align-items: start;
    flex-direction: column;
    row-gap: 0.8rem;
    width: 100%;
    padding: 1.6rem 1.2rem 0;

    ${({ $navigationState }) => {
        if ($navigationState === MainNavigationState.CLOSED) {
            return css`
                width: 100%;
                padding: 0;
                row-gap: 1.8rem;
            `;
        }
    }}
`;

const MainNavigation = () => {
    const [navigationState, setNavigationState] = useState<MainNavigationState>(MainNavigationState.CLOSED);
    const { hasAuthority } = useAuthentication();

    const mainNavigationConfig: MainNavigationConfigItem[] = useMemo(
        () => [
            {
                to: "/dashboard",
                title: "Dashboard",
                icon: <LuChartNoAxesCombined />,
                visible: hasAuthority([UserAuthority.DOCTOR]),
            },
            {
                to: "/appointments",
                title: "Appointments",
                icon: <MdOutlineCalendarMonth />,
                visible: hasAuthority([UserAuthority.DOCTOR]),
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
                visible: hasAuthority([UserAuthority.REGISTRATION]),
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
        [],
    );

    const toggleNavigationState = () =>
        setNavigationState((prevState) =>
            prevState === MainNavigationState.OPEN ? MainNavigationState.CLOSED : MainNavigationState.OPEN,
        );

    return (
        <StyledNavigation $navigationState={navigationState}>
            <div className="flex flex-col items-end">
                <MdKeyboardDoubleArrowLeft className="toggle-icon" onClick={toggleNavigationState} />
                {navigationState === MainNavigationState.OPEN && <Image />}
            </div>
            <nav className="flex items-center justify-center">
                <NavigationList $navigationState={navigationState}>
                    {navigationState === MainNavigationState.OPEN && (
                        <li>
                            <span className="nav-group-info">MENU</span>
                        </li>
                    )}
                    {mainNavigationConfig.map((navigationItem) => (
                        <MainNavigationItem
                            key={navigationItem.title}
                            navigationItem={navigationItem}
                            navigationState={navigationState}
                            setNavigationState={setNavigationState}
                        />
                    ))}
                    {navigationState === MainNavigationState.OPEN && (
                        <li>
                            <span className="nav-group-info">FAKE DATA</span>
                        </li>
                    )}
                    <FakerComponent navigationState={navigationState} />
                </NavigationList>
            </nav>
        </StyledNavigation>
    );
};

export default MainNavigation;
