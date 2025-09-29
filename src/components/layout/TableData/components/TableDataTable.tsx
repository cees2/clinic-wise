import { EmptyPage } from "../../../common/EmptyPage";
import Table from "../../../common/Table/Table";
import { TableData } from "../TableData";
import { useTableDataContext } from "../utils/TableDataContext";
import TableDataActionCell from "./TableDataActionCell";

const TableDataTable = () => {
    const { resources } = useTableDataContext();

    if (resources?.length === 0) return <EmptyPage caption="Could not find any data matching your criteria." />;

    return (
        <Table>
            <TableDataHeaderRow />
            <TableDataItemsRows />
        </Table>
    );
};

const TableDataHeaderRow = () => {
    const {
        config: { columns, actions },
    } = useTableDataContext();
    const hasActions = actions && actions.length > 0;

    return (
        <Table.TableHead>
            <Table.TableRow>
                {columns.map((column) => {
                    return (
                        <Table.TableHeaderCell key={column.name}>
                            <div className="flex gap-x-3 items-center whitespace-nowrap">
                                <span>{column.name}</span>
                                <TableData.Sorts column={column} />
                            </div>
                        </Table.TableHeaderCell>
                    );
                })}
                {hasActions && <Table.TableHeaderCell />}
            </Table.TableRow>
        </Table.TableHead>
    );
};

const TableDataItemsRows = () => {
    const {
        resources,
        config: { columns },
    } = useTableDataContext();

    return (
        <Table.TableBody>
            {resources?.map((resource) => {
                return (
                    <Table.TableRow key={resource.id}>
                        {columns.map((column) => {
                            const resourceColumnDisplayValue = column.render?.(resource) ?? resource[column.id];

                            return (
                                <Table.TableRowCell key={column.id}>{resourceColumnDisplayValue}</Table.TableRowCell>
                            );
                        })}
                        <TableDataActionCell resource={resource} />
                    </Table.TableRow>
                );
            })}
        </Table.TableBody>
    );
};

export default TableDataTable;
