import { createContext, use } from "react";
import type { DashboardContextType } from "./types.ts";

const DashboardContext = createContext<DashboardContextType>({
    dashboardState: {
        selectedFilters: [],
    },
    dispatch: () => {},
});

export const useDashboardContext = () => {
    const context = use(DashboardContext);

    if (!context) throw new Error("Context used outside its scope");

    return context;
};

export default DashboardContext;
