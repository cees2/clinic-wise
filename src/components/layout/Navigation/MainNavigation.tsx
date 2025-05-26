import styled from "styled-components";
import MainNavigationItem from "./MainNavigationItem";
import type { MainNavigationConfigItem } from "../../../utils/projectTypes";
import {
  MdOutlineCalendarMonth,
  MdOutlineRoomPreferences,
} from "react-icons/md";
import { LuChartNoAxesCombined, LuUsers } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";

const StyledNavigation = styled.header`
  display: flex;
  flex-direction: column;
  grid-column: 1 / 2;
  grid-row: 1 / -1;
  align-items: center;
  row-gap: 8rem;
`;

const Image = styled.img.attrs({ src: "logo.png", alt: "ClinicWise logo" })`
  width: 50%;
`;

const NavigationList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 2.4rem;
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
    icon: <LuUsers />,
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
    </StyledNavigation>
  );
};

export default MainNavigation;
