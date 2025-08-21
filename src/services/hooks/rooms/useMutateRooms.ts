import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createRoom } from "../../api.ts";

export const useMutateRooms = (onHide: () => void) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createRoom,
        onSuccess: async () => {
            toast.success("New room has been successfully added");
            await queryClient.invalidateQueries({ queryKey: ["rooms"] });
            onHide();
        },
        onError: () => {
            toast.error("Could not create new room");
        },
    });

    return mutation;
};
