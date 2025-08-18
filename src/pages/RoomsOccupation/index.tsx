import { Header } from "../../components/common/Header/Header";
import { ContentLayout } from "../../components/layout/ContentLayout";
import type { HeaderButton } from "../../utils/projectTypes";
import DayController from "./components/DayController";
import RoomsFilters from "./components/Filters/RoomsFilters";
import RoomsTable from "./components/RoomsTable";
import { RoomsContextProvider, useRoomsContext } from "./utils/RoomsContext";
import { useGetRoomsOccupancies } from "../../services/hooks/roomsOccupancy/useGetRoomsOccupancies";
import { EmptyPage } from "../../components/common/EmptyPage";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { useGetRooms } from "../../services/hooks/rooms/useGetRooms";

const HEADER_BUTTONS: HeaderButton[] = [{ title: "Add room", path: "/rooms/new" }];

const Rooms = () => {
    const { filters } = useRoomsContext();
    const { isLoading: roomsOccupanciesLoading, data: roomsOccupancies } = useGetRoomsOccupancies(filters);
    const { isLoading: roomsLoading, data: rooms } = useGetRooms();

    if (roomsOccupanciesLoading || roomsLoading) return <LoadingSpinner />;
    if (!rooms || rooms.length === 0) return <EmptyPage caption="No rooms found" />;

    return (
        <ContentLayout>
            <Header title="Rooms" as="h3" buttons={HEADER_BUTTONS} />
            <div className="flex flex-col">
                <RoomsFilters rooms={rooms} />
                <DayController />
                <RoomsTable roomsOccupancies={roomsOccupancies} rooms={rooms} />
            </div>
        </ContentLayout>
    );
};

const RoomsWithContext = () => {
    return (
        <RoomsContextProvider>
            <Rooms />
        </RoomsContextProvider>
    );
};

export default RoomsWithContext;
