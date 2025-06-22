import { useForm } from "react-hook-form";
import { NumberInput } from "../../../components/common/Input/NumberInput";
import { DatePickerInput } from "../../../components/common/Input/DatePickerInput/DatePickerInput";
import { FormSelectInput } from "../../../components/common/Input/FormSelectInput";
import { useQueryClient } from "@tanstack/react-query";
import { getEmployeesSelect, getPatientsSelect } from "../../../services/api";
import { appointmentStatusFormValues } from "../utils/constants";
import { TextAreaInput } from "../../../components/common/Input/TextAreaInput";
import { GridForm } from "../../../components/common/Form/GridForm";
import type { AppointmentFormType } from "../../../utils/projectTypes";
import { useMutateAppointment } from "../../../services/hooks/appointments/useMutateAppointment";

export const AppointmentForm = () => {
    const queryClient = useQueryClient();
    const { mutationCreate } = useMutateAppointment();
    const { control, watch, register, handleSubmit } = useForm<AppointmentFormType>();

    const loadEmployees = (inputValue: string) => {
        return queryClient.fetchQuery({
            queryFn: () => getEmployeesSelect(inputValue),
            queryKey: ["employee_select", inputValue.toLowerCase()],
        });
    };

    const loadPatients = (inputValue: string) => {
        return queryClient.fetchQuery({
            queryFn: () => getPatientsSelect(inputValue),
            queryKey: ["patients_select", inputValue.toLowerCase()],
        });
    };

    const submitSuccess = (data: AppointmentFormType) => {
        mutationCreate.mutate(data);
    };

    const submitError = () => {};

    const onSubmit = handleSubmit(submitSuccess, submitError);

    return (
        <GridForm onSubmit={onSubmit} columns={2} gap="2.4rem">
            <NumberInput
                control={control}
                registerName="duration"
                label="Duration"
                rules={{ required: "This field is required" }}
                max={60}
                step={5}
                decimalScale={0}
                allowNegative={false}
            />
            <NumberInput
                control={control}
                registerName="number_of_patients"
                label="Number of patients"
                rules={{ required: "This field is required" }}
                max={5}
                decimalScale={0}
                allowNegative={false}
            />
            <DatePickerInput
                registerName="start_date"
                control={control}
                withTimePicker
                asString
                watch={watch}
                label="Start date"
            />
            <FormSelectInput
                loadOptions={loadEmployees}
                getOptionLabel={(option) => `${option.name} ${option.surname}`}
                getOptionValue={(option) => option.id.toString()}
                registerName="employee_id"
                control={control}
                label="Employee"
            />
            <FormSelectInput
                loadOptions={loadPatients}
                getOptionLabel={(option) => `${option.name} ${option.surname}`}
                getOptionValue={(option) => option.id.toString()}
                registerName="patient_id"
                control={control}
                label="Patient"
            />
            <FormSelectInput
                options={appointmentStatusFormValues}
                registerName="status"
                control={control}
                label={"Status"}
            />
            <TextAreaInput register={register} registerName="additional_note" label="Additional note" rows={3} />
        </GridForm>
    );
};
