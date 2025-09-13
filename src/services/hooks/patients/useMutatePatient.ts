import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPatient, removePatient, updatePatient } from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type { PatientFormType } from "../../../utils/projectTypes.ts";

export const useMutatePatient = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutationCreate = useMutation({
        mutationFn: (patient: PatientFormType) => createPatient(patient),
        onSuccess: async (data) => {
            toast.success("The patient created successfully");
            await queryClient.invalidateQueries({ queryKey: ["patients"] });
            await navigate(`/patients/${data.id}/edit`);
        },
        onError: () => {
            toast.error("Could not create the patient");
        },
    });

    const mutationUpdate = useMutation({
        mutationFn: (patient: PatientFormType) => updatePatient(patient),
        onSuccess: async (data) => {
            toast.success("The patient updated successfully");
            await queryClient.invalidateQueries({ queryKey: ["patients"] });
            await navigate(`/patients/${data.id}/edit`);
        },
        onError: () => {
            toast.error("Could not create the patient");
        },
    });

    const mutationRemove = useMutation({
        mutationFn: (patientId: number) => removePatient(patientId),
        onSuccess: async () => {
            toast.success("The patient removed successfully");
            await queryClient.invalidateQueries({ queryKey: ["patients"] });
        },
        onError: () => {
            toast.error("Could not remove the patient");
        },
    });

    return { mutationCreate, mutationRemove, mutationUpdate };
};
