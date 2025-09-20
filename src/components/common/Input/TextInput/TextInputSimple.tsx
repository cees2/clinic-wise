import { InputLabel, StyledInput } from "../common/InputCommon.tsx";
import { InputHelp } from "../common/InputHelp.tsx";

interface Props extends React.ComponentProps<"input"> {
    label: string;
    helpText?: string;
    id: string;
}

export const TextInputSimple = ({ label, helpText, className, disabled, id, ...restProps }: Props) => {
    return (
        <StyledInput className={className} $disabled={disabled}>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            {helpText && <InputHelp>{helpText}</InputHelp>}
            <input type="text" id={id} disabled={disabled} {...restProps} />
        </StyledInput>
    );
};
