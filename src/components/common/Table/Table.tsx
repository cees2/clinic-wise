import styled, { css } from "styled-components";
import {
    type TableHeaderCellProps,
    type TableProps,
    type TableRowCellProps,
    type TableRowProps,
} from "../../../utils/projectTypes";

const StyledTableWrapper = styled.div<TableProps>`
    overflow: auto;
    border-radius: var(--radius-3xl);
    border: 1px solid var(--border-color);
    background-color: var(--color-background-primary);
    
    --table-row-padding: 0.8rem 1.6rem;
    --table-hedaer-cell-padding: 1.2rem;
    --table-cell-padding: 0.8rem 1.2rem;
    --table-cell-margin: 0;
    --table-cell-border: none;
    --table-cell-border-radius: 0;
    
    ${({variant}) => {
        if(variant === "grid"){
            return css`
                --table-cell-margin: 0.2rem 0.4rem;
                --table-cell-border: 1px dashed var(--color-cyan-800);
                --table-cell-border-radius: var(--radius-2xl);

                & > table {
                    border-collapse: separate;
                    border-spacing: 0.4rem 0.8rem;
                }
            `;
        }
    }}
    
    ${({stickyHeader}) => {
        return stickyHeader && css`
            & th {
                position: sticky;
                top: 0;
                background-color: var(--color-background-primary);
            }
        `
    }}
`;

const StyledTableRow = styled.tr`
    padding: var(--table-row-padding);
    background-color: var(--color-background-secondary);
    border-bottom: 1px solid var(--color-background-primary);

    &:hover {
        background-color: var(--color-background-primary);
    }
`;

export const StyledHeaderCell = styled.th`
    font-weight: var(--font-weight-semibold);
    font-size: 1.4rem;
    padding: var(--table-hedaer-cell-padding);
`;

const StyledTableCell = styled.td`
    padding: var(--table-cell-padding);
    font-size: 1.4rem;
    border: var(--table-cell-border);
    border-radius: var(--table-cell-border-radius);
    margin: var(--table-cell-margin);
`;

const Table = (props: TableProps) => {
    const { children, className } = props;

    return (
        <StyledTableWrapper {...props}>
            <table className={className ?? ""}>{children}</table>
        </StyledTableWrapper>
    );
};

const TableRow = (props: TableRowProps) => {
    const { children, className } = props;

    return (
        <StyledTableRow className={className} {...props}>
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

const TableHead = styled.thead`
    border-bottom: 1px solid var(--color-background-primary);
    
    & > tr:hover {
        background-color: var(--color-background-secondary);
    }
`;

Table.TableHead = TableHead;
Table.TableBody = styled.tbody``;
Table.TableRow = TableRow;
Table.TableHeaderCell = TableHeaderCell;
Table.TableRowCell = TableRowCell;

export default Table;
