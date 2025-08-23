import type { tooltipPlacement } from "../../../utils/projectTypes.ts";
import { GoTriangleDown, GoTriangleLeft, GoTriangleRight, GoTriangleUp } from "react-icons/go";

export const getTooltipTriangleIcon = (placement?: tooltipPlacement) => {
    switch (placement) {
        case "left":
            return GoTriangleRight;
        case "right":
            return GoTriangleLeft;
        case "bottom":
            return GoTriangleUp;
        case "top":
        default:
            return GoTriangleDown;
    }
};
