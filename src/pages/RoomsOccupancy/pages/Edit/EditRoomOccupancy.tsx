import { useGetRoomOccupancy } from "../../../../services/hooks/roomsOccupancy/useGetRoomOccupancy.ts";
import { LoadingSpinner } from "../../../../components/common/LoadingSpinner.tsx";
import { RoomsOccupancyForm } from "../../components/RoomsOccupancyForm.tsx";
import { useParams } from "react-router-dom";
import { FormLayout } from "../../../../components/common/Form/FormLayout.tsx";
import { Header } from "../../../../components/common/Header/Header.tsx";

export const EditRoomOccupancy = () => {
    const { roomOccupancyId } = useParams<{ roomOccupancyId: string }>();
    const { isLoading, data } = useGetRoomOccupancy(Number(roomOccupancyId));

    if (isLoading) return <LoadingSpinner />;

    return (
        <FormLayout>
            <Header title="Edit room occupancy" as="h3" />
            <RoomsOccupancyForm roomOccupancy={data} />
        </FormLayout>
    );
};
