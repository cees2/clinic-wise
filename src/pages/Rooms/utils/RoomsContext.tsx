import React, { createContext, use, useMemo, useState } from "react";
import type { Children, RoomsContextType, RoomsFilter } from "../../../utils/projectTypes";
import { RoomsFilterIds } from "../../../utils/projectTypes";

const RoomsContext = createContext<RoomsContextType>({
    filters: [{ id: RoomsFilterIds.TODAY }],
    setFilters: () => {},
});

export const RoomsContextProvider = ({ children }: Children) => {
    const [filters, setFilters] = useState<RoomsFilter>([{ id: RoomsFilterIds.TODAY }]);
    const memoizedContextValue = useMemo(() => ({ filters, setFilters }), [filters, setFilters]);

    return <RoomsContext value={memoizedContextValue}>{children}</RoomsContext>;
};

export const useRoomsContext = () => {
    const roomsContext = use(RoomsContext);

    if (!roomsContext) throw new Error("Context used outside the provider");

    return roomsContext;
};
