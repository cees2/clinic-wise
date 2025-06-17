import styled, { css } from "styled-components";

interface Props {
    templateColumns?: string;
    templateRows?: string;
    columns?: number;
    rows?: number;
    columnMinWidth?: string;
    columnMaxWidth?: string;
    columnGap?: string;
    rowGap?: string;
    gap?: string;
}

export const GridLayout = styled.div<Props>`
    display: grid;
    ${({ templateColumns, columnMinWidth, columnMaxWidth, columns }) => {
        if (templateColumns)
            return css`
                grid-template-columns: ${templateColumns};
            `;

        if (columnMinWidth && columnMaxWidth) {
            const gridTemplateColumns = `minmax(${columnMinWidth},${columnMaxWidth})`;
            return css`
                grid-template-columns: repeat(${gridTemplateColumns});
            `;
        }

        if (columns) {
            const gridTemplateColumns = `repeat(${columns}, 1fr)`;
            return css`
                grid-template-columns: ${gridTemplateColumns};
            `;
        }
    }}

    ${({ templateRows, rows }) => {
        if (templateRows) {
            return css`
                grid-template-rows: ${templateRows};
            `;
        }

        if (rows) {
            const gridTemplateRows = `repeat(${rows}, 1fr)`;
            return css`
                grid-template-rows: ${gridTemplateRows};
            `;
        }
    }}

    ${({ columnGap, rowGap, gap }) => {
        if (columnGap && rowGap) {
            return css`
                gap: ${columnGap} ${rowGap};
            `;
        } else if (columnGap) {
            return css`
                column-gap: ${columnGap};
            `;
        } else if (rowGap) {
            return css`
                row-gap: ${rowGap};
            `;
        } else if (gap) {
            return css`
                gap: ${gap};
            `;
        }
    }}
`;
