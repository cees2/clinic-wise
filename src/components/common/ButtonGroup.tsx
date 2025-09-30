import type { Children } from "../../utils/projectTypes.ts";

interface Props extends Children {
    className?: string;
}

export const ButtonGroup = ({ children, className }: Props) => {
    return (
        <div role="group" className={`flex gap-3 ${className ?? ""}`}>
            {children}
        </div>
    );
};
