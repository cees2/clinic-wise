import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { uploadFakeRoomsOccupancy } from "../../api";

export const useFakeRoomsOccupancy = () => {
    const queryClient = useQueryClient();

   return useMutation({
        mutationFn: uploadFakeRoomsOccupancy,
        onSuccess: async () => {
            toast.success("Rooms have been successfully uploaded");
            await queryClient.invalidateQueries({ queryKey: ["roomOccupancies"] });
        },
        onError: () => {
            toast.error("Could not upload rooms");
        },
    });
};
