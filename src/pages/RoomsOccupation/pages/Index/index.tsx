import { Header } from "../../../../components/common/Header/Header.tsx";
import { ContentLayout } from "../../../../components/layout/ContentLayout.tsx";
import type { HeaderButton } from "../../../../utils/projectTypes.ts";
import DayController from "../../components/MainLayout/DayController.tsx";
import RoomsFilters from "../../components/MainLayout/Filters/RoomsFilters.tsx";
import RoomsTable from "../../components/MainLayout/RoomsTable.tsx";
import { RoomsContextProvider, useRoomsContext } from "../../utils/RoomsContext.tsx";
import { EmptyPage } from "../../../../components/common/EmptyPage.tsx";
import { LoadingSpinner } from "../../../../components/common/LoadingSpinner.tsx";
import { useGetRooms } from "../../../../services/hooks/rooms/useGetRooms.ts";
import { useGetRoomsOccupancies } from "../../../../services/hooks/roomsOccupancy/useGetRoomOccupancies.ts";
import { useState } from "react";
import { AddRoomModal } from "../../components/MainLayout/AddRoomModal.tsx";

const Rooms = () => {
    const [showModal, setShowModal] = useState(false);
    const { filters } = useRoomsContext();
    const { isLoading: roomOccupanciesLoading, data: roomOccupancies } = useGetRoomsOccupancies(filters);
    const { isLoading: roomsLoading, data: rooms } = useGetRooms();
    const HEADER_BUTTONS: HeaderButton[] = [
        { title: "Add room", onClick: () => setShowModal(true) },
        { title: "Add room occupancy", path: "/room-occupancies/new" },
    ];

    if (!rooms || rooms.length === 0) return <EmptyPage caption="No rooms found" />;

    return (
        <ContentLayout>
            <Header title="Rooms" as="h3" buttons={HEADER_BUTTONS} />
            <div className="flex flex-col">
                <RoomsFilters rooms={rooms} />
                <DayController />
                <RoomsTable
                    roomOccupancies={roomOccupancies}
                    rooms={rooms}
                    roomOccupanciesLoading={roomOccupanciesLoading}
                    roomsLoading={roomsLoading}
                />
            </div>
            <AddRoomModal showModal={showModal} onHide={() => setShowModal(false)} />
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
