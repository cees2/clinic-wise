import { useForm } from "react-hook-form";
import { SettingsFormSection } from "../components/SettingsFormSection";
import type { UpdateUserCompleteInfo, UpdateUserFormType, UserRole } from "../../../utils/projectTypes";
import { TextInput } from "../../../components/common/Input/TextInput";
import { FileInput } from "../../../components/common/Input/FileInput";
import { Button } from "../../../components/layout/Button";
import { useMutateUser } from "../../../services/hooks/user/useMutateUser";
import { useAuthContext } from "../../../utils/contexts/AuthContext";

const UpdateAccount = () => {
    const { user } = useAuthContext();
    const { handleSubmit, register, control, formState, setValue } = useForm<UpdateUserFormType>({
        defaultValues: {
            email: user?.email ?? "",
            fullName: (user?.user_metadata.fullName as string | undefined) ?? "",
            avatar: user?.user_metadata.avatarURL as string | undefined | null,
        },
    });
    const { mutateUpdate } = useMutateUser();

    const submitSuccess = (data: UpdateUserFormType) => {
        // TODO: DO sth on no user presence
        if (!user) return;

        const {
            id,
            user_metadata: { role, avatarURL },
        } = user;
        const userCompleteInfo: UpdateUserCompleteInfo = {
            ...data,
            userId: id,
            role: role as UserRole,
        };

        if (avatarURL) {
            const previousAvatarNameStartIndex = (avatarURL as string).indexOf(`user-${id}`);
            const previousAvatarName = (avatarURL as string).substring(previousAvatarNameStartIndex);
            userCompleteInfo.previousAvatarName = previousAvatarName;
        }

        mutateUpdate.mutate(userCompleteInfo);
    };

    const submitError = () => {};

    const onSubmit = handleSubmit(submitSuccess, submitError);

    const customButtons = <Button className="mt-12">Update</Button>;

    return (
        <SettingsFormSection
            headerTitle="Update your account"
            onSubmit={onSubmit}
            formState={formState}
            columns={2}
            gap="2.4rem"
            customButtons={customButtons}
        >
            <TextInput
                type="email"
                register={register}
                control={control}
                registerName="email"
                label="Email"
                rules={{ required: true }}
                disabled
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
                withClearButton
                setValue={setValue}
            />
        </SettingsFormSection>
    );
};

export default UpdateAccount;
