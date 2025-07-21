import { useForm } from "react-hook-form";
import type { UpdatePasswordType } from "../../../utils/projectTypes";
import { SettingsFormSection } from "../components/SettingsFormSection";
import { TextInput } from "../../../components/common/Input/TextInput";
import { Button } from "../../../components/layout/Button";

const UpdatePassword = () => {
    const { handleSubmit, register, control, formState, getValues } = useForm<UpdatePasswordType>();

    const submitSuccess = (data: UpdatePasswordType) => {
        
    };

    const submitError = () => {};

    const onSubmit = handleSubmit(submitSuccess, submitError);

    const customButtons = <Button className="mt-12">Update</Button>;

    return (
        <SettingsFormSection
            headerTitle="Update password"
            onSubmit={onSubmit}
            formState={formState}
            columns={2}
            gap="2.4rem"
            customButtons={customButtons}
        >
            <TextInput
                type="password"
                register={register}
                control={control}
                registerName="newPassword"
                label="New password"
                rules={{
                    required: true,
                    minLength: { value: 6, message: "Password has to be at least 6 characters long" },
                }}
            />
            <TextInput
                type="password"
                register={register}
                control={control}
                registerName="confirmNewPassword"
                label="Confirm new password"
                rules={{
                    required: true,
                    minLength: { value: 6, message: "Confirm password has to be at least 6 characters long" },
                    validate: (confirmPasswordValue) => {
                        return getValues("newPassword") === confirmPasswordValue
                            ? true
                            : "Provided passwords do not match";
                    },
                }}
            />
        </SettingsFormSection>
    );
};

export default UpdatePassword;
