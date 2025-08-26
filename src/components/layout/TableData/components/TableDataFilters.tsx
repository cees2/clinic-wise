import styled from "styled-components";
import { Dropdown } from "../../../common/Dropdown/Dropdown.tsx";
import { useTableDataContext } from "../utils/TableDataContext.tsx";
import { FilterType, type TableDataResourceType, type TableDataFilterConfig } from "../../../../utils/projectTypes.ts";
import TableDataDateFilter from "./TableDataFilters/TableDataDateFilter.tsx";
import { TableDataEnumFilter } from "./TableDataFilters/TableDataEnumFilter.tsx";
import { TableDataNumberFilter } from "./TableDataFilters/TableDataNumberFilter.tsx";
import { TableDataTextFilter } from "./TableDataFilters/TableDataTextFilter.tsx";

const StyledTableDataFilters = styled.div`
    display: flex;
    align-items: center;
    column-gap: 1.2rem;
`;

const TableDataFilterBody = <T extends TableDataResourceType>({ filter }: { filter: TableDataFilterConfig<T> }) => {
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
    const {
        config: { filters },
    } = useTableDataContext();

    if (!filters || filters.length === 0) return null;

    return (
        <StyledTableDataFilters>
            {filters.map((filter) => {
                return (
                    <Dropdown key={filter.id} autoClose={false}>
                        <Dropdown.Toggle>{filter.name}</Dropdown.Toggle>
                        <TableDataFilterBody filter={filter} />
                    </Dropdown>
                );
            })}
        </StyledTableDataFilters>
    );
};

export default TableDataFilters;
