import { useForm } from "react-hook-form";
import type { UpdatePasswordType } from "../../../utils/projectTypes";
import { SettingsFormSection } from "../components/SettingsFormSection";
import { TextInput } from "../../../components/common/Input/TextInput";
import { Button } from "../../../components/layout/Button";
import { useMutateUser } from "../../../services/hooks/user/useMutateUser";
import { toast } from "react-toastify";
import { useAuthContext } from "../../../utils/contexts/AuthContext";
import { Alert } from "../../../components/common/Alert";

const UpdatePassword = () => {
    const { user } = useAuthContext();
    const { handleSubmit, register, control, formState, getValues } = useForm<UpdatePasswordType>();
    const { mutatePassword } = useMutateUser();
    const isAdmin = user?.user_metadata.isAdmin as boolean | undefined;

    const submitSuccess = (data: UpdatePasswordType) => {
        mutatePassword.mutate(data.newPassword);
    };

    const submitError = () => {
        toast.error("Provided passwords do not match!");
    };

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
            {isAdmin && (
                <Alert
                    className="col-span-full"
                    title="Admin account password change"
                    message="You are not allowed to update admin's password. Create a new account."
                    variant="warning"
                />
            )}
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
                disabled={isAdmin}
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
                disabled={isAdmin}
            />
        </SettingsFormSection>
    );
};

export default UpdatePassword;
