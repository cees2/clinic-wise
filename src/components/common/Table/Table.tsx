import type React from "react";
import styled, { css } from "styled-components";
import type { TableHeaderCellProps } from "../../../utils/projectTypes";
import { createContext, use } from "react";

interface Props {
  gridTemplateColumns?: string;
  numberOfColumns?: number;
  children: React.ReactNode;
}

const StyledTable = styled.div.attrs({ role: "table" })`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;

const StyledTableRow = styled.div.attrs({ role: "row" })<
  Omit<Props, "children">
>`
  display: grid;

  ${({ gridTemplateColumns, numberOfColumns }) =>
    css`
      grid-template-columns: ${gridTemplateColumns ??
      `repeat(${numberOfColumns}, 1fr)`};
    `}
`;

const StyledHeaderCell = styled.div.attrs({
  role: "columnheader",
})<TableHeaderCellProps>`
  ${({ columnIndex }) => {
    return css`
      grid-column: ${columnIndex + 1} / ${columnIndex + 2};
    `;
  }}
`;

const TableContext = createContext<Omit<Props, "children">>({});

const useTableContext = () => {
  const tableContext = use(TableContext);

  if (!tableContext) throw new Error("Table context used outside its scope");

  return tableContext;
};

const Table = ({ children, gridTemplateColumns, numberOfColumns }: Props) => {
  return (
    <TableContext value={{ gridTemplateColumns, numberOfColumns }}>
      <StyledTable>{children}</StyledTable>
    </TableContext>
  );
};

const TableRow = ({ children }: { children: React.ReactNode }) => {
  const { gridTemplateColumns, numberOfColumns } = useTableContext();

  return (
    <StyledTableRow
      gridTemplateColumns={gridTemplateColumns}
      numberOfColumns={numberOfColumns}
    >
      {children}
    </StyledTableRow>
  );
};

const TableHeaderCell = ({ children, columnIndex }: TableHeaderCellProps) => {
  return (
    <StyledHeaderCell columnIndex={columnIndex}>{children}</StyledHeaderCell>
  );
};

const TableRowCell = ({ children }: { children: React.ReactNode }) => {
  return <div role="cell">{children}</div>;
};

Table.TableRow = TableRow;
Table.TableHeaderCell = TableHeaderCell;
Table.TableRowCell = TableRowCell;

export default Table;
