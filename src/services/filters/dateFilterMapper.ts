import type { TableDataDateFilterState } from "../../utils/projectTypes.ts";
import { FILTER_SEPARATOR } from "../constants.ts";

export const dateFilterMapper = (filter: { id: string } & TableDataDateFilterState) => {
    const { id, filterValue, filterCondition } = filter;
    let filterString = `${FILTER_SEPARATOR}${id}|${filterCondition}=`;

    if (filterCondition === "gte" || filterCondition === "lte") {
        filterString += `${filterValue}`;
    }

    return filterString;
};