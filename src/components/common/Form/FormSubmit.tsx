import styled from "styled-components";
import type { FormSubmitProps } from "../../../utils/projectTypes";
import { Button } from "../../layout/Button";
import { useNavigate } from "react-router-dom";

const FormButtons = styled.div.attrs({ role: "group" })`
    margin-top: 3.2rem;
    display: flex;
    column-gap: 1.2rem;
`;

export const FormSubmit = <FormType extends Record<string, any>>({
    onSubmit,
    formState,
    onCancel,
    children,
    customButtons,
    ...restProps
}: FormSubmitProps<FormType>) => {
    const { isDirty, isLoading, isSubmitting } = formState;
    const navigate = useNavigate();

    const cancelButtonClickHandler = async () => {
        if (onCancel) {
            onCancel();
        } else {
            await navigate(-1);
        }
    };

    const buttons = customButtons ?? (
        <FormButtons>
            {isDirty && (
                <Button type="button" variant="cancel" onClick={() => void cancelButtonClickHandler()}>
                    Cancel
                </Button>
            )}
            <Button type="submit">Save</Button>
        </FormButtons>
    );

    return (
        <form onSubmit={(event: React.SyntheticEvent) => void onSubmit(event)} {...restProps}>
            {children}
            {buttons}
        </form>
    );
};
