import { IoIosInformationCircleOutline } from "react-icons/io";
import styled from "styled-components";
import type { EmptyPageAction } from "../../utils/projectTypes.ts";
import { Button } from "../layout/Button.tsx";
import { useNavigate } from "react-router-dom";

interface Props {
    icon?: React.ReactNode;
    caption: string;
    className?: string;
    actions?: EmptyPageAction[];
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

const EmptyPageActions = ({ actions }: { actions?: EmptyPageAction[] }) => {
    const navigate = useNavigate();
    const clickHandler = async (path?: string, action?: () => void) => {
        if (path) {
            await navigate(path);
        }

        action?.();
    };

    if (!actions) return null;

    return (
        <div className="flex gap-x-2">
            {actions.map(({ title, action, path }) => {
                return (
                    <Button onClick={() => void clickHandler(path, action)} key={title}>
                        {title}
                    </Button>
                );
            })}
        </div>
    );
};

export const EmptyPage = ({ caption, icon, className, actions }: Props) => {
    return (
        <StyledEmptyPage className={className}>
            {icon ?? <IoIosInformationCircleOutline />}
            <span>{caption}</span>
            <EmptyPageActions actions={actions} />
        </StyledEmptyPage>
    );
};
