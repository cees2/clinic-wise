import type React from "react";
import styled, { css } from "styled-components";
import type { TableHeaderCellProps } from "../../../utils/projectTypes";
import { createContext, use, useMemo } from "react";

interface Props {
    gridTemplateColumns?: string;
    numberOfColumns?: number;
    children: React.ReactNode;
}

const StyledTable = styled.div.attrs({ role: "table" })`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;

const StyledTableRow = styled.div.attrs({ role: "row" })<Omit<Props, "children">>`
    padding: 0.8rem 1.6rem;
    display: grid;
    align-items: center;
    &:not(:last-child) {
        border-bottom: 1px solid var(--color-gray-300);
    }

    ${({ gridTemplateColumns, numberOfColumns }) => css`
        grid-template-columns: ${gridTemplateColumns ?? `repeat(${numberOfColumns}, 1fr)`};
    `}
`;

export const StyledHeaderCell = styled.div.attrs({
    role: "columnheader",
})<TableHeaderCellProps>`
    font-weight: var(--font-weight-bold);
    font-size: 1.8rem;
    ${({ columnIndex }) => {
        return css`
            grid-column: ${columnIndex + 1} / ${columnIndex + 2};
        `;
    }}
`;

const StyledTableCell = styled.div.attrs({
    role: "cell",
})`
    padding: 1.2rem;
`;

const TableContext = createContext<Omit<Props, "children">>({});

const useTableContext = () => {
    const tableContext = use(TableContext);

    if (!tableContext) throw new Error("Table context used outside its scope");

    return tableContext;
};

const Table = ({ children, gridTemplateColumns, numberOfColumns }: Props) => {
    const contextValue = useMemo(
        () => ({ gridTemplateColumns, numberOfColumns }),
        [gridTemplateColumns, numberOfColumns],
    );

    return (
        <TableContext value={contextValue}>
            <StyledTable>{children}</StyledTable>
        </TableContext>
    );
};

const TableRow = ({ children }: { children: React.ReactNode }) => {
    const { gridTemplateColumns, numberOfColumns } = useTableContext();

    return (
        <StyledTableRow gridTemplateColumns={gridTemplateColumns} numberOfColumns={numberOfColumns}>
            {children}
        </StyledTableRow>
    );
};

const TableHeaderCell = ({ children, columnIndex }: TableHeaderCellProps) => {
    return <StyledHeaderCell columnIndex={columnIndex}>{children}</StyledHeaderCell>;
};

const TableRowCell = ({ children }: { children: React.ReactNode }) => {
    return <StyledTableCell role="cell">{children}</StyledTableCell>;
};

Table.TableRow = TableRow;
Table.TableHeaderCell = TableHeaderCell;
Table.TableRowCell = TableRowCell;

export default Table;
