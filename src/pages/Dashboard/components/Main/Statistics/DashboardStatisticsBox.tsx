import { DashboardStatisticsType } from "../../../utils/types.ts";
import { useDashboardQuery } from "../../../hooks/useDashboardQuery.ts";
import { getStatisticsBoxData } from "../../../utils";
import styled, { css } from "styled-components";

interface Props {
    name: DashboardStatisticsType;
    boxOrder: number;
}

const StyledDashboardStatisticsBox = styled.li<{ boxOrder: number; backgroundColor: string }>`
    ${({ boxOrder }) => {
        return css`
            grid-column: ${boxOrder + 1} / span 1;
        `;
    }}

    display: grid;
    grid-template-columns: 6.4rem 1fr;
    grid-template-rows: 1fr 1fr;
    column-gap: 1.2rem;

    & > .icon-background {
        grid-column: 1 / 2;
        grid-row: 1 / -1;
        align-self: center;
        justify-self: center;
        padding: 1.2rem;
        border-radius: 50%;
        ${({ backgroundColor }) => {
            return css`
                background-color: color-mix(in srgb, var(${backgroundColor}) 30%, transparent);
            `;
        }}

        & > svg {
            width: 3.2rem;
            height: 3.2rem;
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
    const [Icon, value, backgroundColor] = getStatisticsBoxData(name, data) ?? [];

    return (
        <StyledDashboardStatisticsBox boxOrder={boxOrder} backgroundColor={backgroundColor}>
            <div className="icon-background">{Icon}</div>
            <h6 className="statistics-name">{name}</h6>
            <span className="statistics-value">{value}</span>
        </StyledDashboardStatisticsBox>
    );
};
