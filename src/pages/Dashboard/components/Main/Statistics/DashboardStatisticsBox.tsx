import { DashboardStatisticsType, type StatisticsBoxColorConfig } from "../../../utils/types.ts";
import { useDashboardQuery } from "../../../hooks/useDashboardQuery.ts";
import { getStatisticsBoxData } from "../../../utils";
import styled, { css } from "styled-components";
import { useDarkMode } from "../../../../../utils/hooks/useDarkMode.ts";
import { AppColorMode } from "../../../../../utils/projectTypes.ts";

interface Props {
    name: DashboardStatisticsType;
    boxOrder: number;
}

const StyledDashboardStatisticsBox = styled.li<{
    $boxOrder: number;
    $backgroundColor: StatisticsBoxColorConfig;
    $appMode: AppColorMode;
}>`
    ${({ $boxOrder }) => {
        return css`
            grid-column: ${$boxOrder + 1} / span 1;
        `;
    }}

    display: grid;
    grid-template-columns: 6.4rem 1fr;
    grid-template-rows: 1fr 1fr;
    column-gap: 1.2rem;
    background-color: var(--background-tertiary);
    padding: 1.2rem;
    border-radius: var(--radius-2xl);

    & > .icon-background {
        grid-column: 1 / 2;
        grid-row: 1 / -1;
        align-self: center;
        justify-self: center;
        padding: 1.2rem;
        border-radius: 50%;
        ${({ $backgroundColor: { light, dark }, $appMode }) => {
            return $appMode === AppColorMode.DARK
                ? css`
                      background-color: color-mix(in srgb, var(${dark}) 80%, transparent);
                  `
                : css`
                      background-color: color-mix(in srgb, var(${light}) 40%, transparent);
                  `;
        }}

        & > svg {
            width: 3.2rem;
            height: 3.2rem;
            ${({ $appMode }) => {
                return (
                    $appMode === AppColorMode.DARK &&
                    css`
                        stroke: var(--color-gray-200);
                        fill: var(--color-gray-200);
                    `
                );
            }}
        }
    }

    & > .statistics-name,
    & > .statistics-value {
        grid-column: 2 / -1;
        font-weight: 600;
    }

    & > .statistics-name {
        grid-row: 1 / 2;
    }

    & > .statistics-value {
        grid-row: 2 / -1;
        font-size: 2rem;
    }
`;

export const DashboardStatisticsBox = ({ name, boxOrder }: Props) => {
    const { data } = useDashboardQuery();
    const statisticsBoxData = getStatisticsBoxData(name, data);
    const { appMode } = useDarkMode();

    if (!statisticsBoxData) return null;

    const [Icon, value, backgroundColor] = statisticsBoxData;

    return (
        <StyledDashboardStatisticsBox $boxOrder={boxOrder} $backgroundColor={backgroundColor} $appMode={appMode}>
            <div className="icon-background">{Icon}</div>
            <h6 className="statistics-name">{name}</h6>
            <span className="statistics-value">{value || "-"}</span>
        </StyledDashboardStatisticsBox>
    );
};
