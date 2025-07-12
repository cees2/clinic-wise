import { useForm, type FieldErrors } from "react-hook-form";
import type { EmployeeFormType, EmployeeUpdateType } from "../../../utils/projectTypes";
import { GridForm } from "../../../components/common/Form/GridForm";
import { useNavigate } from "react-router-dom";
import { DatePickerInput } from "../../../components/common/Input/DatePickerInput/DatePickerInput";
import { TextInput } from "../../../components/common/Input/TextInput";
import { FormSelectInput } from "../../../components/common/Input/FormSelectInput/FormSelectInput";
import { genderFormOptions, nationalityOptions } from "../../../utils/constants";
import type { Tables } from "../../../services/database.types";
import { useMutateEmployee } from "../../../services/hooks/employees/useMutateEmployee";
import { add, sub } from "date-fns";
import { getEmployeeFormDefaultValues } from "../utils/utils";
import { toast } from "react-toastify";

export const EmployeeForm = ({ employeeData }: { employeeData?: Tables<"employees"> }) => {
    const isEdit = Boolean(employeeData);
    const { register, control, handleSubmit, formState } = useForm<EmployeeFormType>({
        defaultValues: getEmployeeFormDefaultValues(employeeData),
    });
    const navigate = useNavigate();
    const { mutationCreate, mutationUpdate } = useMutateEmployee();

    const submitSuccess = (data: EmployeeFormType) => {
        if (isEdit && employeeData?.id) {
            const updateData: EmployeeUpdateType = { ...data, id: employeeData.id };
            mutationUpdate.mutate(updateData);
        } else {
            mutationCreate.mutate(data);
        }
    };

    const submitError = (errors: FieldErrors<EmployeeFormType>) => {
        toast.error("Invalid data");
    };

    const onSubmit = handleSubmit(submitSuccess, submitError);

    return (
        <GridForm
            formState={formState}
            onSubmit={onSubmit}
            columns={2}
            gap="2.4rem"
            onCancel={() => void navigate("/employees")}
        >
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
                registerName="document_id"
                label="Document ID"
                rules={{ pattern: /^\S{3} \d{2}$/, required: true }}
                helpText="Format: ABC 01"
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
        </GridForm>
    );
};
