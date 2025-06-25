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
}: FormSubmitProps<FormType>) => {
    const { isDirty, isLoading, isSubmitting } = formState;
    const navigate = useNavigate();

    console.log("isDirty", isDirty);
    console.log("isLoading", isLoading);
    console.log("isSubmitting", isSubmitting);

    const cancelButtonClickHandler = async () => {
        if (onCancel) {
            onCancel();
        } else {
            await navigate(-1);
        }
    };

    return (
        <form onSubmit={(event: React.SyntheticEvent) => void onSubmit(event)}>
            {children}
            <FormButtons>
                <Button type="submit">Save</Button>
                {isDirty && (
                    <Button type="button" variant="cancel" onClick={() => void cancelButtonClickHandler()}>
                        Cancel
                    </Button>
                )}
            </FormButtons>
        </form>
    );
};
