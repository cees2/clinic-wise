import {
    TableDataActionsEnum,
    type TableDataActionsType,
    type TableDataResourceType,
    type TableDataState,
} from "../../../../utils/projectTypes";

const tableDataContextReducer = <T extends TableDataResourceType>(
    prevState: TableDataState<T>,
    action: TableDataActionsType<T>,
): TableDataState<T> => {
    switch (action.type) {
        case TableDataActionsEnum.ADD_FILTER:
            return { ...prevState, selectedFilters: [...prevState.selectedFilters, action.payload] };
        case TableDataActionsEnum.REMOVE_FILTER: {
            const { selectedFilters } = prevState;
            const indexOfFilterToBeRemoved = selectedFilters.findIndex(
                (selectedFilter) => selectedFilter.id === action.payload,
            );

            if (indexOfFilterToBeRemoved === -1) return prevState;

            const newSelectedFilters = [...selectedFilters];
            newSelectedFilters.splice(indexOfFilterToBeRemoved, 1);

            return { ...prevState, selectedFilters: newSelectedFilters };
        }
        case TableDataActionsEnum.REPLACE_FILTER: {
            const previousFilterIndex = prevState.selectedFilters.findIndex(
                (filter) => filter.id === action.payload.id,
            );

            if (previousFilterIndex === -1)
                return { ...prevState, selectedFilters: [...prevState.selectedFilters, action.payload] };

            const newSelectedFilters = [...prevState.selectedFilters];
            newSelectedFilters.splice(previousFilterIndex, 1, action.payload);

            return { ...prevState, selectedFilters: newSelectedFilters };
        }
        case TableDataActionsEnum.SET_PAGE:
            return { ...prevState, selectedPage: action.payload };
        case TableDataActionsEnum.SET_PAGINATION_SIZE:
            return { ...prevState, selectedPaginationSize: action.payload };
        case TableDataActionsEnum.SET_SORT:
            return { ...prevState, selectedSort: action.payload };
        case TableDataActionsEnum.SET_NEXT_PAGE:
            return { ...prevState, selectedPage: prevState.selectedPage + 1 };
        case TableDataActionsEnum.SET_PREVIOUS_PAGE: {
            if (prevState.selectedPage === 1) return prevState;
            return { ...prevState, selectedPage: prevState.selectedPage - 1 };
        }
        default:
            return prevState;
    }
};

export default tableDataContextReducer;
