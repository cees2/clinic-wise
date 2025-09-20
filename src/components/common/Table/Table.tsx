import styled, { css } from "styled-components";
import {
    type TableHeaderCellProps,
    type TableProps,
    type TableRowCellProps,
    type TableRowProps,
} from "../../../utils/projectTypes";
import { createContext, use, useMemo } from "react";

const StyledTable = styled.div.attrs({ role: "table" })`
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

const StyledTableRow = styled.div.attrs({ role: "row" })<{ $gridTemplateColumns?: string; $numberOfColumns?: number }>`
    padding: 0.8rem 1.6rem;
    display: grid;
    align-items: center;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-gray-300);
    }

    ${({ $gridTemplateColumns, $numberOfColumns }) => css`
        grid-template-columns: ${$gridTemplateColumns ?? `repeat(${$numberOfColumns}, 1fr)`};
    `}
`;

export const StyledHeaderCell = styled.div`
    font-weight: var(--font-weight-semibold);
    font-size: 1.8rem;
    padding: 1.2rem;
`;

const StyledTableCell = styled.div.attrs({
    role: "cell",
})`
    padding: 0.6rem 1.2rem;
    word-break: break-all;
`;

const TableContext = createContext<Omit<TableProps, "children">>({});

const useTableContext = () => {
    const tableContext = use(TableContext);

    if (!tableContext) throw new Error("Table context used outside its scope");

    return tableContext;
};

const Table = (props: TableProps) => {
    const { children, gridTemplateColumns, numberOfColumns, className } = props;
    const contextValue = useMemo(
        () => ({ gridTemplateColumns, numberOfColumns }),
        [gridTemplateColumns, numberOfColumns],
    );

    return (
        <TableContext value={contextValue}>
            <StyledTable role="table" className={className}>
                {children}
            </StyledTable>
        </TableContext>
    );
};

const TableRow = (props: TableRowProps) => {
    const { children, className } = props;
    const { gridTemplateColumns, numberOfColumns } = useTableContext();

    return (
        <StyledTableRow
            $gridTemplateColumns={gridTemplateColumns}
            $numberOfColumns={numberOfColumns}
            className={className}
            {...props}
        >
            {children}
        </StyledTableRow>
    );
};

const TableHeaderCell = (props: TableHeaderCellProps) => {
    const { children, className } = props;

    if (!children) return <StyledHeaderCell />;

    return <StyledHeaderCell className={className}>{children}</StyledHeaderCell>;
};

const TableRowCell = (props: TableRowCellProps) => {
    const { children, className } = props;

    if (!children) return <StyledTableCell />;

    return (
        <StyledTableCell className={className} {...props}>
            {children}
        </StyledTableCell>
    );
};

Table.TableRow = TableRow;
Table.TableHeaderCell = TableHeaderCell;
Table.TableRowCell = TableRowCell;

export default Table;
