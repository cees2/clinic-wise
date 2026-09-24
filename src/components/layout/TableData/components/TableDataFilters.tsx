import styled from "styled-components";
import { Dropdown } from "../../../common/Dropdown/Dropdown.tsx";
import { useTableDataContext } from "../utils/TableDataContext.tsx";
import { FilterType, type TableDataFilterConfig, type TableDataFilterState } from "../../../../utils/projectTypes.ts";
import TableDataDateFilter from "./TableDataFilters/TableDataDateFilter.tsx";
import { TableDataEnumFilter } from "./TableDataFilters/TableDataEnumFilter.tsx";
import { TableDataNumberFilter } from "./TableDataFilters/TableDataNumberFilter.tsx";
import { TableDataTextFilter } from "./TableDataFilters/TableDataTextFilter.tsx";
import TableDataSearch from "./TableDataFilters/TableDataSearch.tsx";
import { LuFilter } from "react-icons/lu";

const StyledTableDataFilters = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem 1.2rem;
    flex-wrap: wrap;
`;

const FilterCounter = styled.span`
    background-color: color-mix(in srgb, var(--color-primary) 10%, transparent);
    padding: 0.2rem 0.6rem;
    border-radius: var(--radius-md);
    color: var(--color-teal-500)
`;

interface Props {
    filter: TableDataFilterConfig;
}

const TableDataFilterBody = ({ filter }: Props) => {
    const { type, id, options } = filter;

    switch (type) {
        case FilterType.NUMBER:
            return <TableDataNumberFilter filterId={id} />;
        case FilterType.ENUM:
            return <TableDataEnumFilter filterId={id} options={options} />;
        case FilterType.TEXT:
            return <TableDataTextFilter filterId={id} />;
        case FilterType.DATE:
            return <TableDataDateFilter filterId={id} />;
        default:
            return null;
    }
};

const TableDataFilters = () => {
    const { config: { filters }, tableDataState: { selectedFilters }} = useTableDataContext();

    if (!filters || filters.length === 0) return null;

    const getFilterCount = (filterState?: TableDataFilterState) => {
        if(!filterState) return null

        return Array.isArray(filterState.filterValue) ? filterState.filterValue.length : 1;
    }

    return (
        <StyledTableDataFilters>
            <TableDataSearch/>
            {filters.map((filter) => {
                const filterState = selectedFilters.find(selectedFilter => selectedFilter.id === filter.id);
                const filterCount = getFilterCount(filterState);

                return (
                    <Dropdown key={filter.id} autoClose={false}>
                        <Dropdown.Toggle hideDefaultIcon className="[--dropdown-toggle-column-gap:1.2rem]">
                            <LuFilter />
                            {filter.name}
                            <FilterCounter>{filterCount}</FilterCounter>
                        </Dropdown.Toggle>
                        <TableDataFilterBody filter={filter} />
                    </Dropdown>
                );
            })}
        </StyledTableDataFilters>
    );
};

export default TableDataFilters;
