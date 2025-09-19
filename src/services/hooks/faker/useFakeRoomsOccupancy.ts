import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { RoomOccupancyFormType } from "../../../utils/projectTypes";
import { uploadFakeRoomsOccupancy } from "../../api";

export const useFakeRoomsOccupancy = () => {
    const queryClient = useQueryClient();

    const mutationConfig = useMutation({
        mutationFn: (roomsToBeUpdated: RoomOccupancyFormType[]) => uploadFakeRoomsOccupancy(roomsToBeUpdated),
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
