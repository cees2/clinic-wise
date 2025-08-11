import type { ReactNode } from "react";
import { Header } from "../../components/common/Header/Header";
import { ContentLayout } from "../../components/layout/ContentLayout";
import type { HeaderButton } from "../../utils/projectTypes";
import DayController from "./components/DayController";
import RoomsFilters from "./components/Filters/RoomsFilters";
import RoomsTable from "./components/RoomsTable";
import { RoomsContextProvider, useRoomsContext } from "./utils/RoomsContext";

const HEADER_BUTTONS: HeaderButton[] = [{ title: "Add room", path: "/rooms/new" }];

const Rooms = () => {
    const roomsContext = useRoomsContext();

    console.log(roomsContext);

    // if (data?.length === 0) return <EmptyPage caption="No rooms found for given filters" />;

    return (
        <ContentLayout>
            <Header title="Rooms" as="h3" buttons={HEADER_BUTTONS} />
            <div className="flex flex-col">
                <RoomsFilters />
                <DayController />
                <RoomsTable />
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
