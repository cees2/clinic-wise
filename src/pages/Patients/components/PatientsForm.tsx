import { useForm } from "react-hook-form";
import { getPatientFormDefaultValues } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GridForm } from "../../../components/common/Form/GridForm";
import { DatePickerInput } from "../../../components/common/Input/DatePickerInput/DatePickerInput";
import { TextInput } from "../../../components/common/Input/TextInput/TextInput.tsx";
import { FormSelectInput } from "../../../components/common/Input/FormSelectInput/FormSelectInput";
import {
    emailPattern,
    genderFormOptions,
    nationalityOptions,
    patientSubscriptionPlans,
} from "../../../utils/constants";
import { add, sub } from "date-fns";
import { useMutatePatient } from "../../../services/hooks/patients/useMutatePatient";
import { type PatientApi, type PatientFormType } from "../../../services/apiTypes.ts";

export const PatientForm = ({ patientData }: { patientData?: PatientApi }) => {
    const isEdit = Boolean(patientData);
    const { register, control, handleSubmit, formState } = useForm<PatientFormType>({
        defaultValues: getPatientFormDefaultValues(patientData),
    });
    const navigate = useNavigate();
    const { mutationCreate, mutationUpdate } = useMutatePatient();

    const submitSuccess = (data: PatientFormType) => {
        if (isEdit && patientData?.id) {
            mutationUpdate.mutate(data);
        } else {
            mutationCreate.mutate(data);
        }
    };

    const submitError = () => {
        toast.error("Invalid data");
    };

    const onSubmit = handleSubmit(submitSuccess, submitError);

    return (
        <GridForm
            formState={formState}
            onSubmit={onSubmit}
            $columns={1}
            $smBreakpointTemplateColumns="1fr 1fr"
            $columnGap="6.4rem"
            $rowGap="1.2rem"
            onCancel={() => void navigate("/patients")}
            isPending={mutationCreate.isPending || mutationUpdate.isPending}
        >
            <TextInput
                register={register}
                control={control}
                registerName="username"
                label="Email"
                rules={{ required: true, pattern: { value: emailPattern, message: "Invalid email pattern" } }}
            />
            {!isEdit && (
                <>
                    <TextInput
                        register={register}
                        control={control}
                        label="Password"
                        type="password"
                        rules={{
                            required: true,
                            minLength: { value: 6, message: "Password needs to be at least 6 characters long" },
                        }}
                        registerName="password"
                    />
                    <TextInput
                        register={register}
                        control={control}
                        label="Confirm password"
                        type="password"
                        rules={{
                            required: true,
                            validate: (confirmPassword, { password }) =>
                                password === confirmPassword ? true : "Provided passwords do not match",
                        }}
                        registerName="confirm_password"
                    />
                </>
            )}
            <TextInput
                register={register}
                control={control}
                registerName="firstname"
                label="Name"
                rules={{ required: true }}
            />
            <TextInput
                register={register}
                control={control}
                registerName="lastname"
                label="Surname"
                rules={{ required: true }}
            />
            <FormSelectInput
                control={control}
                registerName="patient_subscription_plan"
                label="Subscription plan"
                options={patientSubscriptionPlans}
                rules={{ required: true }}
            />
            <FormSelectInput
                control={control}
                registerName="gender"
                label="Gender"
                options={genderFormOptions}
                rules={{ required: true }}
            />
            <TextInput
                register={register}
                control={control}
                registerName="address"
                label="Adress"
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
                registerName="document_id"
                label="Document ID"
                rules={{ pattern: /^\S{3} \d{2}$/, required: true }}
                helpText="Format: ABC 01"
            />
            <FormSelectInput
                control={control}
                registerName="nationality"
                label="Nationality"
                options={nationalityOptions}
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
            <DatePickerInput
                control={control}
                registerName="start_date"
                label="Start date"
                rules={{ required: true }}
                minDate={sub(new Date(), { days: 14 })}
                maxDate={add(new Date(), { days: 14 })}
            />
        </GridForm>
    );
};
