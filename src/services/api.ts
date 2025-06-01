import type { TableDataState } from "../utils/projectTypes";
import type { Tables } from "./database.types";
import { supabase } from "./services";

export const getAppointments = async (tableDataState: TableDataState) => {
    const { selectedPage, selectedPaginationSize } = tableDataState;
    const rangeStart = (selectedPage - 1) * selectedPaginationSize;
    const rangeEnd = selectedPage * selectedPaginationSize - 1;
    const query = supabase.from("appointments").select("*").range(rangeStart, rangeEnd);

    const { data, error } = await query;

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const uploadFakeAppointments = async (appointmentsToBeUploaded: Tables<"appointments">[]) => {
    await supabase.from("appointments").delete().gt("id", 0);

    const { data, error } = await supabase.from("appointments").insert(appointmentsToBeUploaded);

    if (error) {
        throw new Error(error.message);
    }

    return data;
};
