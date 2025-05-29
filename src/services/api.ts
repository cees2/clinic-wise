import type { Tables } from "./database.types";
import { supabase } from "./services";

export const getAppointments = async () => {
  const { data, error } = await supabase.from("appointments").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const uploadFakeAppointments = async (
  appointmentsToBeUploaded: Tables<"appointments">[]
) => {
  await supabase.from("appointments").delete().gt("id", 0);

  const { data, error } = await supabase
    .from("appointments")
    .insert(appointmentsToBeUploaded);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
