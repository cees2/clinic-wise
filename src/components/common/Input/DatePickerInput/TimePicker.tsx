import styled, { css } from "styled-components";
import { getTimePickerItemsToMap, timePickerModes } from "../../utils/constants";
import { TimePickerMode, type TimePickerProps } from "../../../../utils/projectTypes";
import {
    getSelectedHourBasedOnValue,
    getSelectedMinuteBasedOnValue,
    getUpdatedTimeValue,
} from "../../utils/timePicker";

interface Props extends TimePickerProps {
    mode: TimePickerMode;
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

const ColumnItem = styled.li<{ $isSelected: boolean }>`
    text-align: center;
    padding: 0.8rem;

    ${({ $isSelected }) =>
        $isSelected &&
        css`
            background-color: var(--color-gray-300);
        `}

    &:hover {
        background-color: var(--color-gray-300);
        cursor: pointer;
    }
`;

const TimePickerColumn = ({ mode, value, onChangeTimePicker, customHours, customMinutes }: Props) => {
    const customTime = mode === TimePickerMode.HOURS ? customHours : customMinutes;
    const itemsToMap = getTimePickerItemsToMap(mode, customTime);
    const selectedValue =
        mode === TimePickerMode.HOURS ? getSelectedHourBasedOnValue(value) : getSelectedMinuteBasedOnValue(value);

    const onColumnValueSelect = (newSelectedValue: number) => {
        const updatedValue = getUpdatedTimeValue(value, newSelectedValue, mode);
        onChangeTimePicker(updatedValue);
    };

    return (
        <StyledTimePickerColumn>
            {itemsToMap.map((item) => (
                <ColumnItem
                    key={item}
                    $isSelected={selectedValue === item}
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

const TimePicker = (props: TimePickerProps) => {
    return (
        <StyledTimePicker>
            {timePickerModes.map((mode) => (
                <TimePickerColumn mode={mode} key={mode} {...props} />
            ))}
        </StyledTimePicker>
    );
};

export default TimePicker;
