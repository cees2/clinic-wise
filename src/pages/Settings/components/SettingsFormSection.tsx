import { Header } from "../../../components/common/Header/Header";
import { GridForm } from "../../../components/common/Form/GridForm";
import type { SettingsFormSectionProps } from "../../../utils/projectTypes";

export const SettingsFormSection = <FormType extends Record<string, any>>({
    children,
    headerTitle,
    ...restProps
}: SettingsFormSectionProps<FormType>) => {
    return (
        <div className="mt-12 not-last:mb-6 rounded-3xl bg-gray-50 w-full p-8">
            <Header as="h4" title={headerTitle} />
            <GridForm className="mt-10 ml-12" {...restProps}>
                {children}
            </GridForm>
        </div>
    );
};
