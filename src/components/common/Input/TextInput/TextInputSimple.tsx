import { IconWrapper, InputLabel, StyledInput } from "../common/InputCommon.tsx";
import { InputHelp } from "../common/InputHelp.tsx";
import type { ComponentProps, ReactNode } from "react";

interface Props extends ComponentProps<"input"> {
    label?: string;
    helpText?: string;
    id: string;
    placeholder?: string;
    icon?: ReactNode
}

export const TextInputSimple = ({ label, helpText, className, disabled, id, placeholder, icon, ...restProps }: Props) => {
    return (
        <StyledInput className={className} $disabled={disabled}>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            {helpText && <InputHelp>{helpText}</InputHelp>}
            {icon ? (
                <IconWrapper>
                    <input type="text" id={id} placeholder={placeholder} disabled={disabled} {...restProps} />
                    {icon}
                </IconWrapper>
            ) : (
                <input type="text" id={id} placeholder={placeholder} disabled={disabled} {...restProps} />
            )}
        </StyledInput>
    );
};
