import { useForm } from "react-hook-form";
import { GridLayout } from "../../../components/common/Grid/Grid";
import type { Database } from "../../../services/database.types";
import { NumberInput } from "../../../components/common/Input/NumberInput";
import { DatePickerInput } from "../../../components/common/Input/DatePickerInput/DatePickerInput";
import { FormSelectInput } from "../../../components/common/Input/FormSelectInput";
import { useQueryClient } from "@tanstack/react-query";
import { getEmployeeSelect } from "../../../services/api";

export const AppointmentForm = () => {
    const queryClient = useQueryClient();
    const { control, watch } = useForm<Database["public"]["Tables"]["appointments"]["Insert"]>();

    console.log(watch("employee_id"));

    const loadOptions = (inputValue: string) => {
        return queryClient.fetchQuery({
            queryFn: () => getEmployeeSelect(inputValue),
            queryKey: ["employee_select", inputValue],
        });
    };

    return (
        <GridLayout columns={2} rowGap="4.8rem">
            <NumberInput
                control={control}
                registerName="duration"
                label="Duration"
                rules={{ required: "This field is required" }}
            />
            <NumberInput
                control={control}
                registerName="number_of_patients"
                label="Number of patients"
                rules={{ required: "This field is required" }}
            />
            <DatePickerInput registerName="start_date" control={control} withTimePicker asString watch={watch} />
            <FormSelectInput
                loadOptions={loadOptions}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id.toString()}
                registerName="employee_id"
                control={control}
            />
        </GridLayout>
    );
};
