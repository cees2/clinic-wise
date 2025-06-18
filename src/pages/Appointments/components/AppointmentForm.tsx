import { useForm } from "react-hook-form";
import { GridLayout } from "../../../components/common/Grid/Grid";
import type { Database } from "../../../services/database.types";
import { NumberInput } from "../../../components/common/Input/NumberInput";
import { DatePickerInput } from "../../../components/common/Input/DatePickerInput/DatePickerInput";

export const AppointmentForm = () => {
    const { control, watch } = useForm<Database["public"]["Tables"]["appointments"]["Insert"]>();

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
            <DatePickerInput registerName="start_date" control={control} withTimePicker asString />
        </GridLayout>
    );
};
