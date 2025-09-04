import { AppColorMode, type Children, type DarkModeContextType } from "../projectTypes.ts";
import { createContext, useEffect, useMemo, useState } from "react";
import { toggleHTMLElementColorMode } from "../utils.ts";

export const DarkModeContext = createContext<DarkModeContextType>({
    appMode: AppColorMode.LIGHT,
    setAppMode: () => {},
});

export const DarkModeProvider = ({ children }: Children) => {
    const [appMode, setAppMode] = useState<AppColorMode>(() => {
        const isSystemDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        return isSystemDarkMode ? AppColorMode.DARK : AppColorMode.LIGHT;
    });
    const memoizedValue = useMemo(() => ({ appMode, setAppMode }), [appMode, setAppMode]);

    useEffect(() => {
        toggleHTMLElementColorMode();
    }, []);

    return <DarkModeContext.Provider value={memoizedValue}>{children}</DarkModeContext.Provider>;
};
