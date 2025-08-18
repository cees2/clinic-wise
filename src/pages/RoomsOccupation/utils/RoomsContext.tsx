import { createContext, use, useMemo, useState } from "react";
import type { Children, RoomsContextType, RoomsFilter } from "../../../utils/projectTypes";
import { RoomsFilterIds } from "../../../utils/projectTypes";
import { format, startOfToday } from "date-fns";
import { DB_DATE_FORMAT_WITH_TIME } from "../../../utils/constants";

const RoomsContext = createContext<RoomsContextType>({
    filters: [{ id: RoomsFilterIds.DATE, value: startOfToday().toISOString() }],
    setFilters: () => {},
});

export const RoomsContextProvider = ({ children }: Children) => {
    const [filters, setFilters] = useState<RoomsFilter[]>([
        { id: RoomsFilterIds.DATE, value: format(startOfToday(), DB_DATE_FORMAT_WITH_TIME) },
    ]);
    const memoizedContextValue = useMemo(() => ({ filters, setFilters }), [filters, setFilters]);

    return <RoomsContext value={memoizedContextValue}>{children}</RoomsContext>;
};

export const useRoomsContext = () => {
    const roomsContext = use(RoomsContext);

    if (!roomsContext) throw new Error("Context used outside the provider");

    return roomsContext;
};
