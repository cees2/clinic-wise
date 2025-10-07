import styled, { css } from "styled-components";
import type { GridLayoutProps } from "../../../utils/projectTypes";

export const GridLayout = styled.div<GridLayoutProps>`
    display: grid;
    align-items: end;
    ${({ $templateColumns, $columnMinWidth, $columnMaxWidth, $columns }) => {
        if ($templateColumns)
            return css`
                grid-template-columns: ${$templateColumns};
            `;

        if ($columnMinWidth && $columnMaxWidth) {
            const gridTemplateColumns = `minmax(${$columnMinWidth},${$columnMaxWidth})`;
            return css`
                grid-template-columns: repeat(auto-fit, ${gridTemplateColumns});
            `;
        }

        if ($columns) {
            const gridTemplateColumns = `repeat(${$columns}, 1fr)`;
            return css`
                grid-template-columns: ${gridTemplateColumns};
            `;
        }
    }}

    ${({ $templateRows, $rows }) => {
        if ($templateRows) {
            return css`
                grid-template-rows: ${$templateRows};
            `;
        }

        if ($rows) {
            const gridTemplateRows = `repeat(${$rows}, 1fr)`;
            return css`
                grid-template-rows: ${gridTemplateRows};
            `;
        }
    }}

    ${({ $columnGap, $rowGap, $gap }) => {
        if ($columnGap && $rowGap) {
            return css`
                gap: ${$rowGap} ${$columnGap};
            `;
        } else if ($columnGap) {
            return css`
                column-gap: ${$columnGap};
            `;
        } else if ($rowGap) {
            return css`
                row-gap: ${$rowGap};
            `;
        } else if ($gap) {
            return css`
                gap: ${$gap};
            `;
        }
    }}
    
    ${({ $smBreakpointTemplateColumns }) => {
        return css`
            @media (min-width: 40em) {
                grid-template-columns: ${$smBreakpointTemplateColumns};
            }
        `;
    }}
`;
