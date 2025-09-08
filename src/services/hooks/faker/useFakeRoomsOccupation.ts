import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { RoomOccupationFormType } from "../../../utils/projectTypes";
import { uploadFakeRoomsOccupation } from "../../api";

export const useFakeRoomsOccupation = () => {
    const queryClient = useQueryClient();

    const mutationConfig = useMutation({
        mutationFn: (roomsToBeUpdated: RoomOccupationFormType[]) => uploadFakeRoomsOccupation(roomsToBeUpdated),
        onSuccess: async () => {
            toast.success("Rooms have been successfully uploaded");
            await queryClient.invalidateQueries({ queryKey: ["roomOccupancies"] });
        },
        onError: () => {
            toast.error("Could not upload rooms");
        },
    });

    return mutationConfig;
};
