import { useForm } from "react-hook-form";
import { useAuthContext } from "../../../utils/contexts/AuthContext";
import { SettingsFormSection } from "../components/SettingsFormSection";
import type { UpdateUserFormType } from "../../../utils/projectTypes";
import { TextInput } from "../../../components/common/Input/TextInput";
import { FileInput } from "../../../components/common/Input/FileInput";

const UpdateAccount = () => {
    const { user } = useAuthContext();
    const { handleSubmit, register, control, formState } = useForm<UpdateUserFormType>();

    const submitSuccess = () => {};

    const submitError = () => {};

    const onSubmit = handleSubmit(submitSuccess, submitError);

    return (
        <SettingsFormSection
            headerTitle="Update your account"
            onSubmit={onSubmit}
            formState={formState}
            columns={2}
            gap="2.4rem"
        >
            <TextInput
                type="email"
                register={register}
                control={control}
                registerName="email"
                label="Email"
                rules={{ required: true }}
            />
            <TextInput
                register={register}
                control={control}
                registerName="fullName"
                label="Full name"
                rules={{ required: true }}
            />
            <FileInput
                register={register}
                control={control}
                registerName="avatar"
                label="Avatar"
                rules={{ required: true }}
            />
        </SettingsFormSection>
    );
};

export default UpdateAccount;
