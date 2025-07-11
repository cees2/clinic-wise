import { useForm, type FieldErrors } from "react-hook-form";
import type { PatientFormType, PatientUpdateType } from "../../../utils/projectTypes";
import { getPatientFormDefaultValues } from "../utils/utils";
import type { Tables } from "../../../services/database.types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GridForm } from "../../../components/common/Form/GridForm";
import { DatePickerInput } from "../../../components/common/Input/DatePickerInput/DatePickerInput";
import { TextInput } from "../../../components/common/Input/TextInput";
import { FormSelectInput } from "../../../components/common/Input/FormSelectInput/FormSelectInput";
import { genderFormOptions, nationalityOptions } from "../../../utils/constants";
import { add, sub } from "date-fns";
import { useMutatePatient } from "../../../services/hooks/patients/useMutatePatient";

export const PatientForm = ({ patientData }: { patientData?: Tables<"patients"> }) => {
    const isEdit = Boolean(patientData);
    const { register, control, handleSubmit, formState } = useForm<PatientFormType>({
        defaultValues: getPatientFormDefaultValues(patientData),
    });
    const navigate = useNavigate();
    const { mutationCreate, mutationUpdate } = useMutatePatient();

    const submitSuccess = (data: PatientFormType) => {
        if (isEdit && patientData?.id) {
            const updateData: PatientUpdateType = { ...data, id: patientData.id };
            mutationUpdate.mutate(updateData);
        } else {
            mutationCreate.mutate(data);
        }
    };

    const submitError = (errors: FieldErrors<PatientFormType>) => {
        toast.error("Invalid data");
    };

    const onSubmit = handleSubmit(submitSuccess, submitError);

    return (
        <GridForm
            formState={formState}
            onSubmit={onSubmit}
            columns={2}
            gap="2.4rem"
            onCancel={() => void navigate("/patients")}
        >
            <TextInput
                register={register}
                control={control}
                registerName="name"
                label="Name"
                rules={{ required: true }}
            />
            <TextInput
                register={register}
                control={control}
                registerName="surname"
                label="Surname"
                rules={{ required: true }}
            />
            <FormSelectInput
                control={control}
                registerName="gender"
                label="Gender"
                options={genderFormOptions}
                rules={{ required: true }}
            />
            <DatePickerInput
                control={control}
                registerName="date_of_birth"
                label="Date of birth"
                rules={{ required: true }}
                maxDate="current"
            />
            <TextInput
                register={register}
                control={control}
                registerName="address"
                label="Adress"
                rules={{ required: true }}
            />
            <TextInput
                register={register}
                control={control}
                registerName="phone_number"
                label="Phone number"
                rules={{ pattern: /^\d{3}-\d{3}-\d{3}$/, required: true }}
                helpText="Format: 123-123-123"
            />
            <FormSelectInput
                control={control}
                registerName="nationality"
                label="Nationality"
                options={nationalityOptions}
                rules={{ required: true }}
            />
            <DatePickerInput
                control={control}
                registerName="start_date"
                label="Start date"
                rules={{ required: true }}
                minDate={sub(new Date(), { days: 14 })}
                maxDate={add(new Date(), { days: 14 })}
            />
            <TextInput
                register={register}
                control={control}
                registerName="document_id"
                label="Document ID"
                rules={{ pattern: /^\S{3} \d{2}$/, required: true }}
                helpText="Format: ABC 01"
            />
        </GridForm>
    );
};
