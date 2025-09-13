import type { FormSubmitProps, GridLayoutProps } from "../../../utils/projectTypes";
import { GridLayout } from "../Grid/GridLayout";
import { FormSubmit } from "./FormSubmit";

export const GridForm = <FormType extends Record<string, any>>({
    onSubmit,
    formState,
    onCancel,
    children,
    customButtons,
    ...gridProps
}: GridLayoutProps & FormSubmitProps<FormType>) => {
    return (
        <FormSubmit onSubmit={onSubmit} formState={formState} onCancel={onCancel} customButtons={customButtons}>
            <GridLayout {...(gridProps as GridLayoutProps)}>{children}</GridLayout>
        </FormSubmit>
    );
};
