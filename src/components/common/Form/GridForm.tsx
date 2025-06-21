import type { GridLayoutProps } from "../../../utils/projectTypes";
import { Button } from "../../layout/Button";
import { GridLayout } from "../Grid/GridLayout";

interface Props extends GridLayoutProps {
    onSubmit: (event: React.SyntheticEvent) => Promise<void>;
    children: React.ReactNode;
}

export const GridForm = ({ onSubmit, children, ...gridProps }: Props) => {
    return (
        <form onSubmit={(event: React.SyntheticEvent) => void onSubmit(event)}>
            <GridLayout {...gridProps}>{children}</GridLayout>
            <Button type="submit">Save</Button>
        </form>
    );
};
