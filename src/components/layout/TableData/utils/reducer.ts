import {
  TableDataActionsEnum,
  type TableDataActionsType,
  type TableDataState,
} from "../../../../utils/projectTypes";

const tableDataContextReducer = (
  prevState: TableDataState,
  action: TableDataActionsType
): TableDataState => {
  switch (action.type) {
    case TableDataActionsEnum.SET_FILTER:
      return { ...prevState, selectedFilters: action.payload };
    case TableDataActionsEnum.SET_PAGE:
      return { ...prevState, selectedPage: action.payload };
    case TableDataActionsEnum.SET_PAGINATION_SIZE:
      return { ...prevState, selectedPaginationSize: action.payload };
    case TableDataActionsEnum.SET_SORT:
      return { ...prevState, selectedSort: action.payload };
    case TableDataActionsEnum.SET_NEXT_PAGE:
      return { ...prevState, selectedPage: prevState.selectedPage + 1 };
    case TableDataActionsEnum.SET_PREVIOUS_PAGE: {
      if (prevState.selectedPage === 0) return prevState;
      return { ...prevState, selectedPage: prevState.selectedPage - 1 };
    }
    default:
      return prevState;
  }
};

export default tableDataContextReducer;
