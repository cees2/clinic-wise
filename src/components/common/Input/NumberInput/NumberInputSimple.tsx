import { NumericFormat, type NumericFormatProps } from "react-number-format";
import { InputLabel, StyledInput } from "../common/InputCommon.tsx";

interface Props extends NumericFormatProps {
    label: string;
    id: string;
}

export const NumberInputSimple = ({ label, id, ...restProps }: Props) => {
    return (
        <StyledInput>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <NumericFormat id={id} {...restProps} />
        </StyledInput>
    );
};
