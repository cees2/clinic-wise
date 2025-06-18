import styled from "styled-components";
import { getPossibleHours, getPossibleMinutes, timePickerModes } from "../../utils/constants";
import { TimePickerMode } from "../../../../utils/projectTypes";
import { getSelectedHourBasedOnValue, getSelectedMinuteBasedOnValue } from "../../utils/timePicker";

const StyledTimePicker = styled.div`
    height: 100%;
    display: flex;
    column-gap: 0.8rem;
`;

const StyledTimePickerColumn = styled.ul`
    height: 100%;
    overflow-y: scroll;
`;

const ColumnItem = styled.li`
    text-align: center;
    padding: 1.2rem;

    &:hover {
        background-color: var(--color-gray-300);
        cursor: pointer;
    }
`;

const TimePickerColumn = ({ mode, value }: { mode: TimePickerMode; value: Date | string }) => {
    const itemsToMap = mode === TimePickerMode.HOURS ? getPossibleHours() : getPossibleMinutes();
    const selectedValue =
        mode === TimePickerMode.HOURS ? getSelectedHourBasedOnValue(value) : getSelectedMinuteBasedOnValue(value);

    console.log(selectedValue);

    return (
        <StyledTimePickerColumn>
            {itemsToMap.map((item) => (
                <ColumnItem key={item}>{item}</ColumnItem>
            ))}
        </StyledTimePickerColumn>
    );
};

const TimePicker = ({ value }: { value: Date | string }) => {
    return (
        <StyledTimePicker>
            {timePickerModes.map((mode) => (
                <TimePickerColumn mode={mode} key={mode} value={value} />
            ))}
        </StyledTimePicker>
    );
};

export default TimePicker;
