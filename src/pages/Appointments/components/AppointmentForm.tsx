import { useForm, type FieldErrors } from "react-hook-form";
import { NumberInput } from "../../../components/common/Input/NumberInput";
import { DatePickerInput } from "../../../components/common/Input/DatePickerInput/DatePickerInput";
import { FormSelectInput } from "../../../components/common/Input/FormSelectInput/FormSelectInput";
import { useQueryClient } from "@tanstack/react-query";
import { getEmployeesSelect, getPatientsSelect } from "../../../services/api";
import { appointmentStatusFormValues } from "../utils/constants";
import { TextAreaInput } from "../../../components/common/Input/TextAreaInput";
import { GridForm } from "../../../components/common/Form/GridForm";
import type { AppointmentFormType } from "../../../utils/projectTypes";
import { useMutateAppointment } from "../../../services/hooks/appointments/useMutateAppointment";
import { useNavigate } from "react-router-dom";
import type { Tables } from "../../../services/database.types";
import { getAppointmentFormDefaultValues } from "../utils/utils";
import type { EmployeeSelect, PatientSelect } from "../../../services/apiTypes";
import { toast } from "react-toastify";

export const AppointmentForm = ({ appointmentData }: { appointmentData?: Tables<"appointments"> }) => {
    const queryClient = useQueryClient();
    const { mutationCreate } = useMutateAppointment();
    const { control, register, handleSubmit, formState } = useForm<AppointmentFormType>({
        defaultValues: getAppointmentFormDefaultValues(appointmentData),
    });
    const navigate = useNavigate();

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

    const submitError = (errors: FieldErrors<AppointmentFormType>) => {
        toast.error("Invalid data");
    };

    const onSubmit = handleSubmit(submitSuccess, submitError);

    return (
        <GridForm
            onSubmit={onSubmit}
            formState={formState}
            onCancel={() => void navigate("/appointments")}
            columns={2}
            gap="2.4rem"
        >
            <NumberInput
                control={control}
                registerName="duration"
                label="Duration"
                rules={{
                    required: true,
                    min: { value: 0, message: "Duration(in minutes) must be greater than or equal to 0" },
                    max: { value: 60, message: "Duration(in minutes) must be less than or equal to 60" },
                }}
                max={60}
                step={5}
                decimalScale={0}
                allowNegative={false}
            />
            <DatePickerInput
                registerName="start_date"
                control={control}
                withTimePicker
                label="Start date"
                rules={{ required: true }}
                minDate="current"
            />
            <FormSelectInput<EmployeeSelect, false, AppointmentFormType>
                loadOptions={loadEmployees}
                getOptionLabel={(option) => `${option.name} ${option.surname}`}
                getOptionValue={(option) => option?.id.toString()}
                registerName="employee_id"
                control={control}
                label="Employee"
                rules={{ required: true }}
                defaultValue={appointmentData?.employee}
            />
            <FormSelectInput<PatientSelect, false, AppointmentFormType>
                loadOptions={loadPatients}
                getOptionLabel={(option) => `${option?.name} ${option?.surname}`}
                getOptionValue={(option) => option?.id.toString()}
                registerName="patient_id"
                control={control}
                label="Patient"
                rules={{ required: true }}
                defaultValue={appointmentData?.patient}
            />
            <FormSelectInput
                options={appointmentStatusFormValues}
                registerName="status"
                control={control}
                label={"Status"}
                rules={{ required: true }}
            />
            <TextAreaInput register={register} registerName="additional_note" label="Additional note" rows={3} />
        </GridForm>
    );
};
