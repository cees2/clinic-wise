import { useForm } from "react-hook-form";
import { SettingsFormSection } from "../components/SettingsFormSection";
import type { UpdateUserFormType } from "../../../utils/projectTypes";
import { TextInput } from "../../../components/common/Input/TextInput/TextInput.tsx";
import { FileInput } from "../../../components/common/Input/FileInput";
import { Button } from "../../../components/layout/Button";
import { useMutateUser } from "../../../services/hooks/user/useMutateUser";
import { useAuthContext } from "../../../utils/contexts/AuthContext";

const UpdateAccount = () => {
    const { user } = useAuthContext();
    const { handleSubmit, register, control, formState, setValue } = useForm<UpdateUserFormType>({
        defaultValues: {
            username: user?.username ?? "",
            firstname: user?.firstname?? "",
            lastname: user?.lastname ?? "",
            avatar: user?.avatar,
        },
    });
    const { mutateUpdate } = useMutateUser();

    const submitSuccess = (data: UpdateUserFormType) => {
        const formData = new FormData();
        const userDetails = {
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
        };

        if(data.avatar && data.avatar[0] instanceof File){
            formData.append("avatar", data.avatar[0]);
        }
        formData.append("user", new Blob([JSON.stringify(userDetails)], { type: 'application/json' }));

        mutateUpdate.mutate(formData);
    };

    const submitError = () => {};

    const onSubmit = handleSubmit(submitSuccess, submitError);

    const customButtons = <Button className="mt-12">Update</Button>;

    return (
        <SettingsFormSection
            headerTitle="Update your account"
            onSubmit={onSubmit}
            formState={formState}
            $columnGap="6.4rem"
            $rowGap="1.2rem"
            $columnMinWidth="20rem"
            $columnMaxWidth="1fr"
            customButtons={customButtons}
        >
            <TextInput type="username" register={register} control={control} registerName="username" label="Username" disabled />
            <TextInput
                register={register}
                control={control}
                registerName="firstname"
                label="Firstname"
                rules={{ required: true }}
            />
            <TextInput
                register={register}
                control={control}
                registerName="lastname"
                label="Lastname"
                rules={{ required: true }}
            />
            <FileInput
                register={register}
                control={control}
                registerName="avatar"
                label="Avatar"
                withClearButton
                setValue={setValue}
                className="col-start-2 col-span-1"
            />
        </SettingsFormSection>
    );
};

export default UpdateAccount;
