import { useForm } from "react-hook-form";
import type { RoomOccupationFormType, RoomsOccupanciesResponseType } from "../../../utils/projectTypes";
import { GridForm } from "../../../components/common/Form/GridForm";
import { DatePickerInput } from "../../../components/common/Input/DatePickerInput/DatePickerInput";
import { FormSelectInput } from "../../../components/common/Input/FormSelectInput/FormSelectInput";
import { useQueryClient } from "@tanstack/react-query";
import { getEmployeesSelect, getRoomsSelect } from "../../../services/api";
import type { EmployeeSelect, RoomSelect } from "../../../services/apiTypes";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getRoomsOccupancyFormDefaultValues } from "../utils/utils.ts";
import { compareDesc, startOfToday } from "date-fns";
import { useMutateRoomsOccupancy } from "../../../services/hooks/rooms/useMutateRoomsOccupancy.ts";
import { CLINIC_WORKING_HOURS, DISPLAY_DATE_FORMAT_MINUTES, EVERY_30_MINUTES } from "../../../utils/constants.ts";

interface Props {
    roomOccupation?: RoomsOccupanciesResponseType;
}

export const RoomsOccupationForm = ({ roomOccupation }: Props) => {
    const { control, handleSubmit, formState } = useForm<RoomOccupationFormType>({
        defaultValues: getRoomsOccupancyFormDefaultValues(roomOccupation),
    });
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const mutateRoomOccupancy = useMutateRoomsOccupancy();

    const loadEmployees = (inputValue: string) => {
        return queryClient.fetchQuery({
            queryFn: () => getEmployeesSelect(inputValue),
            queryKey: ["employee_select", inputValue.toLowerCase()],
        });
    };

    const loadRooms = async (inputValue: string) => {
        return queryClient.fetchQuery({
            queryFn: () => getRoomsSelect(inputValue),
            queryKey: ["room_select", inputValue.toLowerCase()],
        });
    };

    const submitSuccess = (data: RoomOccupationFormType) => {
        mutateRoomOccupancy.mutate(data);
    };

    const submitError = () => {
        toast.error("Invalid data");
    };

    const onSubmit = handleSubmit(submitSuccess, submitError);

    return (
        <GridForm
            formState={formState}
            onSubmit={onSubmit}
            columns={2}
            gap="2.4rem"
            onCancel={() => void navigate("/room-occupancies")}
        >
            <FormSelectInput<EmployeeSelect, false, RoomOccupationFormType>
                loadOptions={loadEmployees}
                getOptionLabel={(option) => `${option.name} ${option.surname}`}
                getOptionValue={(option) => option?.id?.toString()}
                registerName="employee_id"
                control={control}
                label="Employee"
                rules={{ required: true }}
                defaultValue={roomOccupation?.employees}
            />
            <FormSelectInput<RoomSelect, false, RoomOccupationFormType>
                loadOptions={loadRooms}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option?.id?.toString()}
                registerName="room_id"
                control={control}
                label="Room"
                rules={{ required: true }}
                defaultValue={roomOccupation?.rooms}
            />
            <DatePickerInput
                control={control}
                registerName="start"
                label="Start date"
                withTimePicker
                rules={{
                    required: true,
                    validate: (value: string | number | undefined, formValues: RoomOccupationFormType) => {
                        const startDate = new Date(value ?? Date.now());
                        const endDate = new Date(formValues.end ?? Date.now());
                        const comparationResult = compareDesc(startDate, endDate);

                        if (comparationResult === -1) return "Start date must be before the end date";

                        return true;
                    },
                }}
                minDate={startOfToday()}
                customHours={CLINIC_WORKING_HOURS}
                customMinutes={EVERY_30_MINUTES}
                dateFormat={DISPLAY_DATE_FORMAT_MINUTES}
            />
            <DatePickerInput
                control={control}
                registerName="end"
                label="End date"
                withTimePicker
                rules={{ required: true }}
                minDate={startOfToday()}
                customHours={CLINIC_WORKING_HOURS}
                customMinutes={EVERY_30_MINUTES}
                dateFormat={DISPLAY_DATE_FORMAT_MINUTES}
            />
        </GridForm>
    );
};
