import styled from "styled-components";
import { EmptyPage } from "../../../common/EmptyPage";
import Table, { StyledHeaderCell } from "../../../common/Table/Table";
import { TableData } from "../TableData";
import { useTableDataContext } from "../utils/TableDataContext";

const StyledTableDataHeaderCell = styled(StyledHeaderCell)`
    display: flex;
    align-items: center;
    column-gap: 0.6rem;
`;

const TableDataTable = () => {
    const { config, resources } = useTableDataContext();

    if (resources.length === 0) return <EmptyPage caption="Could not find any data matching your criteria." />;

    return (
        <Table gridTemplateColumns={config.gridTemplateColumns} numberOfColumns={config.columns.length}>
            <TableDataHeaderRow />
            <TableDataItemsRows />
        </Table>
    );
};

const TableDataHeaderRow = () => {
    const {
        config: { columns },
    } = useTableDataContext();

    return (
        <Table.TableRow>
            {columns.map((column, columnIndex) => {
                return (
                    <StyledTableDataHeaderCell key={column.name} columnIndex={columnIndex}>
                        {column.name}
                        <TableData.Sorts columnName={column.name} />
                    </StyledTableDataHeaderCell>
                );
            })}
        </Table.TableRow>
    );
};

const TableDataItemsRows = () => {
    const {
        resources,
        config: { columns },
    } = useTableDataContext();

    console.log(resources);
    console.log(columns);

    return (
        <>
            {resources.map((resource) => {
                return (
                    <Table.TableRow key={resource.id}>
                        {columns.map((column) => {
                            const resourceColumnDisplayValue = column.render
                                ? column.render(resource)
                                : resource[column.id];

                            return (
                                <Table.TableRowCell key={column.id}>{resourceColumnDisplayValue}</Table.TableRowCell>
                            );
                        })}
                    </Table.TableRow>
                );
            })}
        </>
    );
};

export default TableDataTable;
