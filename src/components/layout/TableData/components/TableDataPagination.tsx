import styled from "styled-components";
import { Dropdown } from "../../../common/Dropdown/Dropdown";
import { Button } from "../../Button";
import { useTableDataContext } from "../utils/TableDataContext";
import { TableDataActionsEnum } from "../../../../utils/projectTypes";

const PaginationNavigation = styled.div`
    display: flex;
    align-items: center;
    column-gap: 0.6rem;
`;

const dropdownItems = [10, 20, 50, 100];

const TableDataPagination = () => {
    const { tableDataState, dispatch, hasNext } = useTableDataContext();
    const { selectedPage, selectedPaginationSize } = tableDataState;
    const shouldDisablePreviousPageButton = selectedPage === 1;

    const setPreviousPageHandler = () => {
        dispatch({ type: TableDataActionsEnum.SET_PREVIOUS_PAGE });
    };
    const setNextPageHandler = () => {
        if (!hasNext) return;

        dispatch({ type: TableDataActionsEnum.SET_NEXT_PAGE });
    };

    const setPageSizeHandler = (size: number) => {
        dispatch({ type: TableDataActionsEnum.SET_PAGINATION_SIZE, payload: size });
    };

    return (
        <div className="flex items-center justify-between">
            <Dropdown placement="top">
                <Dropdown.Toggle>{selectedPaginationSize}</Dropdown.Toggle>
                <Dropdown.Menu>
                    {dropdownItems.map((item) => (
                        <Dropdown.Item
                            key={item}
                            onClick={() => {
                                setPageSizeHandler(item);
                            }}
                        >
                            {item}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <PaginationNavigation>
                <Button onClick={setPreviousPageHandler} disabled={shouldDisablePreviousPageButton}>
                    Previous
                </Button>
                <span>{selectedPage}</span>
                <Button disabled={!hasNext} onClick={setNextPageHandler}>
                    Next
                </Button>
            </PaginationNavigation>
        </div>
    );
};

export default TableDataPagination;
