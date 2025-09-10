import styled, { css } from "styled-components";
import {
    TableVariant,
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

const StyledTableRow = styled.div.attrs({ role: "row" })<Omit<TableProps, "children">>`
    padding: 0.8rem 1.6rem;
    display: grid;
    align-items: center;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-gray-300);
    }

    ${({ gridTemplateColumns, numberOfColumns }) => css`
        grid-template-columns: ${gridTemplateColumns ?? `repeat(${numberOfColumns}, 1fr)`};
    `}

    ${({ variant }) => {
        return (
            variant === TableVariant.BARE &&
            css`
                padding: 0;
            `
        );
    }}
`;

export const StyledHeaderCell = styled.div<{ variant?: TableVariant }>`
    font-weight: var(--font-weight-semibold);
    font-size: 1.8rem;
    padding: 1.2rem;

    ${({ variant }) => {
        return (
            variant === TableVariant.BARE &&
            css`
                padding: 0;
            `
        );
    }}
`;

const StyledTableCell = styled.div.attrs({
    role: "cell",
})<{ variant?: TableVariant }>`
    padding: 0.6rem 1.2rem;
    word-break: break-all;

    ${({ variant }) => {
        return (
            variant === TableVariant.BARE &&
            css`
                padding: 0;
            `
        );
    }}
`;

const TableContext = createContext<Omit<TableProps, "children">>({});

const useTableContext = () => {
    const tableContext = use(TableContext);

    if (!tableContext) throw new Error("Table context used outside its scope");

    return tableContext;
};

const Table = (props: TableProps) => {
    const { children, gridTemplateColumns, numberOfColumns, className, variant } = props;
    const contextValue = useMemo(
        () => ({ gridTemplateColumns, numberOfColumns, variant }),
        [gridTemplateColumns, numberOfColumns, variant],
    );

    return (
        <TableContext value={contextValue}>
            <StyledTable role="table" className={className} {...props}>
                {children}
            </StyledTable>
        </TableContext>
    );
};

const TableRow = (props: TableRowProps) => {
    const { children, className } = props;
    const { gridTemplateColumns, numberOfColumns, variant } = useTableContext();

    return (
        <StyledTableRow
            gridTemplateColumns={gridTemplateColumns}
            numberOfColumns={numberOfColumns}
            className={className}
            variant={variant}
            {...props}
        >
            {children}
        </StyledTableRow>
    );
};

const TableHeaderCell = (props: TableHeaderCellProps) => {
    const { children, className } = props;
    const { variant } = useTableContext();

    if (!children) return <StyledHeaderCell />;

    return (
        <StyledHeaderCell className={className} variant={variant} {...props}>
            {children}
        </StyledHeaderCell>
    );
};

const TableRowCell = (props: TableRowCellProps) => {
    const { children, className } = props;
    const { variant } = useTableContext();

    if (!children) return <StyledTableCell />;

    return (
        <StyledTableCell className={className} variant={variant} {...props}>
            {children}
        </StyledTableCell>
    );
};

Table.TableRow = TableRow;
Table.TableHeaderCell = TableHeaderCell;
Table.TableRowCell = TableRowCell;

export default Table;
