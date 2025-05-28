import { supabase } from "./services";

export const getAppointments = async () => {
  const { data, error } = await supabase.from("appointments").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
