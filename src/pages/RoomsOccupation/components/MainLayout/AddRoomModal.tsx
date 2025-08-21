import { Modal } from "../../../../components/common/Modal/Modal.tsx";
import { FormSubmit } from "../../../../components/common/Form/FormSubmit.tsx";
import { TextInput } from "../../../../components/common/Input/TextInput.tsx";
import { useForm } from "react-hook-form";
import { useMutateRooms } from "../../../../services/hooks/rooms/useMutateRooms.ts";

interface Props {
    showModal: boolean;
    onHide: () => void;
}

interface FormType {
    name: string;
}

export const AddRoomModal = (props: Props) => {
    const { register, control, handleSubmit, formState } = useForm<FormType>();
    const mutation = useMutateRooms(props.onHide);

    const submitSuccess = (data: FormType) => {
        mutation.mutate(data);
    };

    const onSubmit = handleSubmit(submitSuccess);

    return (
        <Modal {...props} closeable>
            <FormSubmit onSubmit={onSubmit} formState={formState}>
                <Modal.Header>
                    <Modal.Title>Add new Room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TextInput
                        register={register}
                        registerName="name"
                        label="Room name"
                        control={control}
                        rules={{ required: true }}
                    />
                </Modal.Body>
            </FormSubmit>
        </Modal>
    );
};
