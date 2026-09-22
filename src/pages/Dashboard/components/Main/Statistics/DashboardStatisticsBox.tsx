import { DashboardStatisticsType, type StatisticsBoxColorConfig } from "../../../utils/types.ts";
import { useDashboardQuery } from "../../../hooks/useDashboardQuery.ts";
import { getStatisticsBoxData } from "../../../utils";
import styled, { css } from "styled-components";
import { useDarkMode } from "../../../../../utils/hooks/useDarkMode.ts";
import { AppColorMode } from "../../../../../utils/projectTypes.ts";

interface Props {
    name: DashboardStatisticsType;
}

const StyledDashboardStatisticsBox = styled.li<{
    $backgroundColor: StatisticsBoxColorConfig;
    $appMode: AppColorMode;
}>`
    display: grid;
    grid-template-columns: 1fr 6.4rem;
    grid-template-rows: 1fr 1fr;
    column-gap: 1.2rem;
    background-color: var(--background-secondary);
    padding: 2.4rem;
    border-radius: var(--radius-2xl);
    border: 1px solid var(--color-gray-600);

    & > .icon-background {
        grid-column: 2 / span 1;
        grid-row: 1 / -1;
        align-self: center;
        justify-self: center;
        padding: 1.2rem;
        border-radius: 50%;
        ${({ $backgroundColor: { light, dark , iconDark, iconLight}, $appMode }) => {
            return $appMode === AppColorMode.DARK
                ? css`background-color: color-mix(in srgb, var(${dark}) 20%, transparent);`
                : css`background-color: color-mix(in srgb, var(${light}) 40%, transparent);`;
        }}

        & > svg {
            width: 3.2rem;
            height: 3.2rem;
            ${({ $appMode, $backgroundColor: { iconDark, iconLight } }) => {
                return $appMode === AppColorMode.DARK
                    ? css`
                          stroke: var(${iconDark});
                          fill: var(${iconDark});
                      `
                    : css`
                          stroke: var(${iconLight});
                          fill: var(${iconLight});
                      `;
            }}
        }
    }

    & > .statistics-name,
    & > .statistics-value {
        grid-column: 1 / span 1;
        font-weight: 600;
    }

    & > .statistics-name {
        grid-row: 1 / span 1;
        color: var(--font-tertiary);
    }

    & > .statistics-value {
        grid-row: 2 / span 1;
        font-size: 3.2rem;
    }
`;

export const DashboardStatisticsBox = ({ name }: Props) => {
    const {data }= useDashboardQuery();
    const statisticsBoxData = getStatisticsBoxData(name, data);
    const { appMode } = useDarkMode();

    if (!statisticsBoxData) return null;

    const [Icon, value, backgroundColor] = statisticsBoxData;

    return (
        <StyledDashboardStatisticsBox $backgroundColor={backgroundColor} $appMode={appMode}>
            <div className="icon-background">{Icon}</div>
            <h6 className="statistics-name">{name}</h6>
            <span className="statistics-value">{value || "-"}</span>
        </StyledDashboardStatisticsBox>
    );
};
