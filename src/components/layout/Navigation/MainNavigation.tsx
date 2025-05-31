import styled from "styled-components";
import MainNavigationItem from "./MainNavigationItem";
import type { MainNavigationConfigItem } from "../../../utils/projectTypes";
import {
    MdOutlineCalendarMonth,
    MdOutlineRoomPreferences,
} from "react-icons/md";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi";
import Faker from "../Faker/Faker";

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
`;

const mainNavigationConfig: MainNavigationConfigItem[] = [
    {
        to: "/dashboard",
        title: "Dashboard",
        icon: <LuChartNoAxesCombined />,
    },
    {
        to: "/appointments",
        title: "Appointments",
        icon: <MdOutlineCalendarMonth />,
    },
    {
        to: "/patients",
        title: "Patients",
        icon: <HiOutlineUsers />,
    },
    {
        to: "/rooms",
        title: "Rooms",
        icon: <MdOutlineRoomPreferences />,
    },
    {
        to: "/settings",
        title: "Settings",
        icon: <IoSettingsOutline />,
    },
];

const MainNavigation = () => {
    return (
        <StyledNavigation>
            <Image />
            <nav>
                <NavigationList>
                    {mainNavigationConfig.map((navigationItem) => (
                        <MainNavigationItem
                            key={navigationItem.title}
                            navigationItem={navigationItem}
                        />
                    ))}
                </NavigationList>
            </nav>
            <Faker />
        </StyledNavigation>
    );
};

export default MainNavigation;
