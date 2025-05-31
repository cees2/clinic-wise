import styled from "styled-components";
import { Header } from "./Header";
import type { KnownTarget } from "styled-components/dist/types";
import type { HeaderActions } from "../../../utils/projectTypes";

interface Props {
    as: KnownTarget;
    title: string;
    actions: HeaderActions[];
}

const StyledHeaderWithActions = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const HeaderWithActions = ({ as, title }: Props) => {
    return (
        <StyledHeaderWithActions>
            <Header as={as} title={title} />
            {/* TODO: Dropdownm */}
        </StyledHeaderWithActions>
    );
};
