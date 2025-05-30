import styled from "styled-components";
import { Dropdown } from "../../../common/Dropdown/Dropdown";
import { Button } from "../../Button";
import { useTableDataContext } from "../utils/TableDataContext";
import { TableDataActionsEnum } from "../../../../utils/projectTypes";

const StyledTableDataPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

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
  const { tableDataState, dispatch } = useTableDataContext();
  const { selectedPage, selectedPaginationSize } = tableDataState;

  const setPreviousPageHander = () => {
    dispatch({ type: TableDataActionsEnum.SET_PREVIOUS_PAGE });
  };
  const setNextPageHander = () => {
    dispatch({ type: TableDataActionsEnum.SET_NEXT_PAGE });
  };

  return (
    <StyledTableDataPagination>
      <Dropdown>
        <Dropdown.Toggle>{selectedPaginationSize}</Dropdown.Toggle>
        <Dropdown.Menu>
          {dropdownItems.map((item) => (
            <Dropdown.Item key={item}>{item}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <PaginationNavigation>
        <PaginationNavigationButton onClick={setPreviousPageHander}>
          Previous
        </PaginationNavigationButton>
        <span>{selectedPage}</span>
        <PaginationNavigationButton onClick={setNextPageHander}>
          Next
        </PaginationNavigationButton>
      </PaginationNavigation>
    </StyledTableDataPagination>
  );
};

export default TableDataPagination;
