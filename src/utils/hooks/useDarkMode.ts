import { use } from "react";
import { DarkModeContext } from "../contexts/DarkModeContext.tsx";

export const useDarkMode = () => {
    const darkModeContext = use(DarkModeContext);

    if (!darkModeContext) {
        throw new Error("Dark mode context used outside its scope");
    }

    return darkModeContext;
};
