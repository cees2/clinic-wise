import styled from "styled-components";
import { Dropdown } from "../../../../common/Dropdown/Dropdown";
import { useTableDataContext } from "../../utils/TableDataContext";
import { FilterType } from "../../../../../utils/projectTypes";
import NumberFilter from "./NumberFilter";

const StyledTableDataFilters = styled.div`
    display: flex;
    align-items: center;
    column-gap: 1.2rem;
`;

const TableDataFilterBody = ({ filterType }: { filterType: FilterType }) => {
    switch (filterType) {
        case FilterType.NUMBER:
            return <NumberFilter />;
        case FilterType.ENUM:
        case FilterType.TEXT:
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
                        <Dropdown.Menu>{<TableDataFilterBody filterType={filter.type} />}</Dropdown.Menu>
                    </Dropdown>
                );
            })}
        </StyledTableDataFilters>
    );
};

export default TableDataFilters;
