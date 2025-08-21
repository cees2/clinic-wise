import { RoomsOccupationForm } from "../../components/RoomsOccupationForm.tsx";
import { FormLayout } from "../../../../components/common/Form/FormLayout.tsx";
import { Header } from "../../../../components/common/Header/Header.tsx";

export const NewRoomOccupancy = () => {
    return (
        <FormLayout>
            <Header title="New room occupancy" as="h3" />
            <RoomsOccupationForm />
        </FormLayout>
    );
};
