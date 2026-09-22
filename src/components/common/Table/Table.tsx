import styled from "styled-components";
import {
    type TableHeaderCellProps,
    type TableProps,
    type TableRowCellProps,
    type TableRowProps,
} from "../../../utils/projectTypes";

const StyledTableWrapper = styled.div`
    overflow: hidden;
    overflow-x: auto;
    border-radius: var(--radius-3xl);
    border: 1px solid var(--border-color);
    background-color: var(--color-background-primary);
`;

const StyledTableRow = styled.tr`
    padding: 0.8rem 1.6rem;
    background-color: var(--color-background-secondary);
    border-bottom: 1px solid var(--color-background-primary);

    &:hover {
        background-color: var(--color-background-primary);
    }
`;

export const StyledHeaderCell = styled.th`
    font-weight: var(--font-weight-semibold);
    font-size: 1.4rem;
    padding: 1.2rem;
`;

const StyledTableCell = styled.td`
    padding: 0.6rem 1.2rem;
    font-size: 1.4rem;
`;

const Table = (props: TableProps) => {
    const { children, className } = props;

    return (
        <StyledTableWrapper>
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
