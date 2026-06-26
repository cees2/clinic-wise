import { MdOutlineFileUpload } from "react-icons/md";
import styled from "styled-components";
import { StyledMainNavigationAnchor } from "../Navigation/MainNavigationItem.tsx";
import type { MainNavigationState } from "../../../utils/projectTypes.ts";

const StyledFakerItem = styled(StyledMainNavigationAnchor)``;

interface Props {
    title: string;
    onClick: () => void;
    navigationState: MainNavigationState;
}

const FakerItem = ({ title, onClick, navigationState }: Props) => {
    return (
        <li className="w-full">
            <StyledFakerItem $navigationState={navigationState} as="div" onClick={onClick}>
                <MdOutlineFileUpload />
                <span className="nav-item">{title}</span>
            </StyledFakerItem>
        </li>
    );
};

export default FakerItem;
