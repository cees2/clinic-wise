import { Header } from "../../components/common/Header/Header";
import { ContentLayout } from "../../components/layout/ContentLayout";
import DayController from "./components/DayController";
import RoomsFilters from "./components/Filters/RoomsFilters";
import RoomsTable from "./components/RoomsTable";
import { RoomsContextProvider } from "./utils/RoomsContext";

const Rooms = () => {
    return (
        <RoomsContextProvider>
            <ContentLayout>
                <Header title="Rooms" as="h3" />
                <div className="flex flex-col">
                    <RoomsFilters />
                    <DayController />
                    <RoomsTable />
                </div>
            </ContentLayout>
        </RoomsContextProvider>
    );
};

export default Rooms;
