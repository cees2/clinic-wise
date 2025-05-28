import type {
  TableDataColumn,
  TableDataConfig,
  TableDataConfigGenericExtend,
} from "../../../utils/projectTypes";
import Table from "./Table";

export const TableData = <T extends TableDataConfigGenericExtend>({
  config,
}: {
  config: TableDataConfig<T>;
}) => {
  const { gridTemplateColumns, getResources, columns } = config;
  const { data: resources, isLoading } = getResources();

  console.log(resources);
  console.log(isLoading);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Table
      gridTemplateColumns={gridTemplateColumns}
      numberOfColumns={config.columns.length}
    >
      <TableDataHeaderRow columns={columns} />
      <TableDataItemsRows resources={resources} columns={columns} />
    </Table>
  );
};

const TableDataHeaderRow = <T extends TableDataConfigGenericExtend>({
  columns,
}: Pick<TableDataConfig<T>, "columns">) => {
  return (
    <Table.TableRow>
      {columns.map((column, columnIndex) => {
        return (
          <Table.TableHeaderCell key={column.name} columnIndex={columnIndex}>
            {column.name}
          </Table.TableHeaderCell>
        );
      })}
    </Table.TableRow>
  );
};

const TableDataItemsRows = <T extends TableDataConfigGenericExtend>({
  resources,
  columns,
}: {
  resources: T[];
  columns: TableDataColumn<T>[];
}) => {
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
