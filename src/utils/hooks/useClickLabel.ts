import { useState } from "react";

export const useClickLabel = () => {
    const [forceOpenDropdown, setForceOpenDropdown] = useState(false);

    const onClickLabel = () => setForceOpenDropdown(true);

    const onDropdownHide = () => setForceOpenDropdown(false);

    return { forceOpenDropdown, onClickLabel, onDropdownHide };
};
