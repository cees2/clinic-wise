import { useTableDataContext } from "../../utils/TableDataContext.tsx";
import { TextInputSimple } from "../../../../common/Input/TextInput/TextInputSimple.tsx";
import { IoSearchSharp } from "react-icons/io5";
import { TableDataActionsEnum } from "../../../../../utils/projectTypes.ts";
import { type ChangeEvent, type KeyboardEventHandler, useState } from "react";

const TableDataSearch = () => {
    const [searchState, setSearchState] = useState("");
    const {
        dispatch,
        tableDataState: { search },
    } = useTableDataContext();

    const dispatchSearchAction = () => {
        const newValueDiffersFromOldOne = searchState !== search;
        if (newValueDiffersFromOldOne) {
            dispatch({ type: TableDataActionsEnum.SET_SEARCH, payload: searchState });
        }
    }

    const keyDownHandler: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === "Enter") {
            dispatchSearchAction();
        }
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
       setSearchState(event.target.value)
    };

    return (
        <TextInputSimple
            id="search"
            placeholder="Search..."
            icon={<IoSearchSharp />}
            onChange={onChange}
            onBlur={dispatchSearchAction}
            value={searchState}
            onKeyDown={keyDownHandler}
        />
    );
};

export default TableDataSearch;
