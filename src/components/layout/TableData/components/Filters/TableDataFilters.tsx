import styled from "styled-components";
import { Dropdown } from "../../../../common/Dropdown/Dropdown";
import { useTableDataContext } from "../../utils/TableDataContext";
import { FilterType, type TableDataResourceType, type TableDataFilterConfig } from "../../../../../utils/projectTypes";
import NumberFilter from "./NumberFilter";
import EnumFilter from "./EnumFilter";
import TextFilter from "./TextFilter";

const StyledTableDataFilters = styled.div`
    display: flex;
    align-items: center;
    column-gap: 1.2rem;
`;

const TableDataFilterBody = <T extends TableDataResourceType>({ filter }: { filter: TableDataFilterConfig<T> }) => {
    const { type, id, options } = filter;
    switch (type) {
        case FilterType.NUMBER:
            return <NumberFilter filterId={id} />;
        case FilterType.ENUM: {
            if (!options) return null;

            return <EnumFilter filterId={id} options={options} />;
        }
        case FilterType.TEXT:
            return <TextFilter filterId={id} />;
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
