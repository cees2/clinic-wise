import { IoIosInformationCircleOutline } from "react-icons/io";
import styled from "styled-components";

interface Props {
    icon?: React.ReactNode;
    caption: string;
}

const StyledEmptyPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1.2rem;
    font-size: 2rem;

    & > svg {
        width: 6rem;
        height: 6rem;
        fill: var(--color-primary);
    }
`;

export const EmptyPage = ({ caption, icon }: Props) => {
    return (
        <StyledEmptyPage>
            {icon ?? <IoIosInformationCircleOutline />}
            <span>{caption}</span>
        </StyledEmptyPage>
    );
};
