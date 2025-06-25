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

const PaginationNavigationButton = styled(Button)`
    background-color: var(--color-gray-200);
`;

const dropdownItems = [10, 20, 50, 100];

const TableDataPagination = () => {
    const { tableDataState, dispatch, itemsCount } = useTableDataContext();
    const { selectedPage, selectedPaginationSize } = tableDataState;
    const maxAllowedPage = Math.ceil((itemsCount ?? 0) / selectedPaginationSize);
    const shouldDisableNextPageButton = maxAllowedPage === selectedPage;

    const setPreviousPageHander = () => {
        dispatch({ type: TableDataActionsEnum.SET_PREVIOUS_PAGE });
    };
    const setNextPageHander = () => {
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
                <PaginationNavigationButton onClick={setPreviousPageHander}>Previous</PaginationNavigationButton>
                <span>{selectedPage}</span>
                <PaginationNavigationButton disabled={shouldDisableNextPageButton} onClick={setNextPageHander}>
                    Next
                </PaginationNavigationButton>
            </PaginationNavigation>
        </div>
    );
};

export default TableDataPagination;
