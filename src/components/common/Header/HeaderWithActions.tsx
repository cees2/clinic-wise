import { Header } from "./Header";
import type { KnownTarget } from "styled-components/dist/types";
import type { HeaderActions } from "../../../utils/projectTypes";

interface Props {
    as: KnownTarget;
    title: string;
    actions: HeaderActions[];
}

export const HeaderWithActions = ({ as, title }: Props) => {
    return (
        <div className="flex justify-between">
            <Header as={as} title={title} />
            {/* TODO: Dropdownm */}
        </div>
    );
};
