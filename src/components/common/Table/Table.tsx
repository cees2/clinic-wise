import styled from "styled-components";
import {
    type TableHeaderCellProps,
    type TableProps,
    type TableRowCellProps,
    type TableRowProps,
} from "../../../utils/projectTypes";

const StyledTableRow = styled.tr`
    padding: 0.8rem 1.6rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-gray-300);
    }

    &:hover {
        background-color: var(--color-background-primary);
    }
`;

export const StyledHeaderCell = styled.th`
    font-weight: var(--font-weight-semibold);
    font-size: 1.8rem;
    padding: 1.2rem;
`;

const StyledTableCell = styled.td`
    padding: 0.6rem 1.2rem;
`;

const Table = (props: TableProps) => {
    const { children, className } = props;

    return (
        <div className="overflow-x-scroll">
            <table className={className ?? ""}>{children}</table>
        </div>
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
    border-bottom: 1px solid var(--color-gray-300);

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
