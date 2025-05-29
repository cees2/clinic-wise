import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { uploadFakeAppointments } from "../../api";
import type { Tables } from "../../database.types";

export const useFakeAppointments = () => {
  const queryClient = useQueryClient();

  const mutationConfig = useMutation({
    mutationFn: (appointments: Tables<"appointments">[]) =>
      uploadFakeAppointments(appointments),
    onSuccess: async () => {
      toast.success("Appointments have been uploaded successfully");
      await queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: () => {
      toast.error("Appointments could not be uploaded");
    },
  });

  return mutationConfig;
};
