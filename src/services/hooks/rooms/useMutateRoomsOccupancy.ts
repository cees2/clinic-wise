import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { createRoomOccupancy } from "../../api.ts";
import { useNavigate } from "react-router-dom";

export const useMutateRoomsOccupancy = () => {
    const navigation = useNavigate();

    const mutate = useMutation({
        mutationFn: createRoomOccupancy,
        onSuccess: async () => {
            toast.success("The room occupancy created successfully");
            await navigation("/room-occupancies");
        },
        onError: (error) => {
            toast.error(error.message ?? "Could not create the room occupancy");
        },
    });

    return mutate;
};
