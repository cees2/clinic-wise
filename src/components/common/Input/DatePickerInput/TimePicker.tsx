import styled, { css } from "styled-components";
import { getPossibleHours, getPossibleMinutes, timePickerModes } from "../../utils/constants";
import { TimePickerMode } from "../../../../utils/projectTypes";
import {
    getSelectedHourBasedOnValue,
    getSelectedMinuteBasedOnValue,
    getUpdatedTimeValue,
} from "../../utils/timePicker";

interface Props {
    mode: TimePickerMode;
    value: Date | string;
    onChange: (updatedValue: string | Date) => void;
}

const StyledTimePicker = styled.div`
    height: 100%;
    display: flex;
    column-gap: 0.8rem;
`;

const StyledTimePickerColumn = styled.ul`
    height: 100%;
    overflow-y: scroll;
`;

const ColumnItem = styled.li<{ isSelected: boolean }>`
    text-align: center;
    padding: 1.2rem;

    ${({ isSelected }) =>
        isSelected &&
        css`
            background-color: var(--color-gray-300);
        `}

    &:hover {
        background-color: var(--color-gray-300);
        cursor: pointer;
    }
`;

const TimePickerColumn = ({ mode, value, onChange }: Props) => {
    const itemsToMap = mode === TimePickerMode.HOURS ? getPossibleHours() : getPossibleMinutes();
    const selectedValue =
        mode === TimePickerMode.HOURS ? getSelectedHourBasedOnValue(value) : getSelectedMinuteBasedOnValue(value);

    const onColumnValueSelect = (newSelectedValue: number) => {
        const updatedValue = getUpdatedTimeValue(value, newSelectedValue, mode);
        onChange(updatedValue);
    };

    return (
        <StyledTimePickerColumn>
            {itemsToMap.map((item) => (
                <ColumnItem
                    key={item}
                    isSelected={selectedValue === item}
                    onClick={() => {
                        onColumnValueSelect(item);
                    }}
                >
                    {item}
                </ColumnItem>
            ))}
        </StyledTimePickerColumn>
    );
};

const TimePicker = ({ value, onChange }: { value: Date | string; onChange: (updatedValue: string | Date) => void }) => {
    return (
        <StyledTimePicker>
            {timePickerModes.map((mode) => (
                <TimePickerColumn mode={mode} key={mode} value={value} onChange={onChange} />
            ))}
        </StyledTimePicker>
    );
};

export default TimePicker;
