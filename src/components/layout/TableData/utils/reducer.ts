import type {
  TableDataActionsEnum,
  TableDataActionsType,
  TableDataState,
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
    default:
      return prevState;
  }
};

export default tableDataContextReducer;
