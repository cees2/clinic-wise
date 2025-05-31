import Table from "../../../common/Table/Table";
import { useTableDataContext } from "../utils/TableDataContext";

const TableDataTable = () => {
    const { config } = useTableDataContext();

    return (
        <Table
            gridTemplateColumns={config.gridTemplateColumns}
            numberOfColumns={config.columns.length}
        >
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
                    <Table.TableHeaderCell
                        key={column.name}
                        columnIndex={columnIndex}
                    >
                        {column.name}
                    </Table.TableHeaderCell>
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

    return (
        <>
            {resources.map((resource) => {
                return (
                    <Table.TableRow key={resource.id}>
                        {columns.map((column) => {
                            const resourceColumnData = resource[column.id];

                            return (
                                <Table.TableRowCell key={column.id}>
                                    {resourceColumnData}
                                </Table.TableRowCell>
                            );
                        })}
                    </Table.TableRow>
                );
            })}
        </>
    );
};

export default TableDataTable;
