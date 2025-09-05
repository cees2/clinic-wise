import styled from "styled-components";
import MainNavigationItem from "./MainNavigationItem";
import { UserRole, type MainNavigationConfigItem } from "../../../utils/projectTypes";
import { MdOutlineCalendarMonth, MdOutlineRoomPreferences } from "react-icons/md";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi";
import FakerComponent from "../Faker/Faker";
import { GrUserWorker } from "react-icons/gr";
import { useAuthContext } from "../../../utils/contexts/AuthContext";
import { useMemo } from "react";

const StyledNavigation = styled.aside`
    flex: 0 1 20rem;
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
`;

const Image = styled.img.attrs({ src: "logo.png", alt: "ClinicWise logo" })`
    margin-top: 3.2rem;
    width: 50%;
    align-self: center;
`;

const NavigationList = styled.ul`
    display: flex;
    flex-direction: column;
    row-gap: 0.8rem;
    padding: 0 0.8rem;
`;

const MainNavigation = () => {
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

    return (
        <StyledNavigation>
            <Image />
            <nav>
                <NavigationList>
                    {mainNavigationConfig.map((navigationItem) => (
                        <MainNavigationItem key={navigationItem.title} navigationItem={navigationItem} />
                    ))}
                </NavigationList>
            </nav>
            <FakerComponent />
        </StyledNavigation>
    );
};

export default MainNavigation;
