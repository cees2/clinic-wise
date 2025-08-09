import { EmptyPage } from "../../../components/common/EmptyPage";
import { LoadingSpinner } from "../../../components/common/LoadingSpinner";
import { useGetRooms } from "../../../services/hooks/rooms/useGetRooms";

const RoomsTable = () => {
    const { isLoading, data } = useGetRooms();

    if (isLoading) return <LoadingSpinner />;

    if (data?.length === 0) return <EmptyPage caption="No rooms found for given filters" />;

    return <div>ddd</div>;
};

export default RoomsTable;
