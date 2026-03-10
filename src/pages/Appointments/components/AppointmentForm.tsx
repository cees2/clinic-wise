import { useForm } from "react-hook-form";
import { NumberInput } from "../../../components/common/Input/NumberInput/NumberInput.tsx";
import { DatePickerInput } from "../../../components/common/Input/DatePickerInput/DatePickerInput";
import { FormSelectInput } from "../../../components/common/Input/FormSelectInput/FormSelectInput";
import { useQueryClient } from "@tanstack/react-query";
import { getEmployeesSelect, getPatientsSelect } from "../../../services/api";
import { TextAreaInput } from "../../../components/common/Input/TextAreaInput";
import { GridForm } from "../../../components/common/Form/GridForm";
import { useMutateAppointment } from "../../../services/hooks/appointments/useMutateAppointment";
import { useNavigate } from "react-router-dom";
import { getAppointmentFormDefaultValues } from "../utils/utils";
import { toast } from "react-toastify";
import { CLINIC_WORKING_HOURS, DISPLAY_DATE_FORMAT_MINUTES, EVERY_15_MINUTES } from "../../../utils/constants.ts";
import type { AppointmentApi, AppointmentFormType, SearchSelectApi } from "../../../services/apiTypes.ts";

export const AppointmentForm = ({ appointmentData }: { appointmentData?: AppointmentApi }) => {
    const isEdit = Boolean(appointmentData);
    const queryClient = useQueryClient();
    const { mutationCreate, mutationUpdate } = useMutateAppointment();
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
        if (isEdit && appointmentData?.id) {
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
            onSubmit={onSubmit}
            formState={formState}
            onCancel={() => void navigate("/appointments")}
            $columns={1}
            $smBreakpointTemplateColumns="1fr 1fr"
            $columnGap="6.4rem"
            $rowGap="1.2rem"
            isPending={mutationCreate.isPending || mutationUpdate.isPending}
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
                customHours={CLINIC_WORKING_HOURS}
                customMinutes={EVERY_15_MINUTES}
                dateFormat={DISPLAY_DATE_FORMAT_MINUTES}
            />
            <FormSelectInput<SearchSelectApi, false, AppointmentFormType>
                loadOptions={loadEmployees}
                registerName="employee_id"
                control={control}
                label="Employee"
                rules={{ required: true }}
                defaultValue={{
                    value: appointmentData?.employee.id,
                    label: `${appointmentData?.employee.user.firstname} ${appointmentData?.employee.user.lastname}`,
                }}
            />
            <FormSelectInput<SearchSelectApi, false, AppointmentFormType>
                loadOptions={loadPatients}
                registerName="patient_id"
                control={control}
                label="Patient"
                rules={{ required: true }}
                defaultValue={{
                    value: appointmentData?.patient.id,
                    label: `${appointmentData?.patient.user.firstname} ${appointmentData?.patient.user.lastname}`,
                }}
            />
            <TextAreaInput register={register} registerName="additional_note" label="Additional note" rows={3} />
        </GridForm>
    );
};
