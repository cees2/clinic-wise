import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadFakePatients } from "../../api";
import type { PatientFormType } from "../../../utils/projectTypes";
import { toast } from "react-toastify";

export const useFakePatients = () => {
    const queryClient = useQueryClient();

    const mutationConfig = useMutation({
        mutationFn: (patientsToBeUploaded: PatientFormType[]) => uploadFakePatients(patientsToBeUploaded),
        onError: () => toast.error("Could not upload patients"),
        onSuccess: async () => {
            toast.success("Patients have been successfully uploaded");
            await queryClient.invalidateQueries({ queryKey: ["patients"] });
        },
    });

    return mutationConfig;
};
