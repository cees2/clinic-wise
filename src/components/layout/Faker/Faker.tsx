import { LoadingSpinner } from "../../common/LoadingSpinner";
import { useFakeAppointments } from "../../../services/hooks/faker/useFakeAppointments";
import { useFakePatients } from "../../../services/hooks/faker/useFakePatients";
import { useFakeRoomsOccupancy } from "../../../services/hooks/faker/useFakeRoomsOccupancy";
import { useFakeEmployees } from "../../../services/hooks/faker/useFakeEmployees.ts";
import React from "react";
import FakerItem from "./FakerItem.tsx";
import type { MainNavigationState } from "../../../utils/projectTypes.ts";

interface Props{
    navigationState: MainNavigationState;
}

const FakerComponent = (props: Props) => {
    const { isPending: pendingPatients, mutate: mutatePatients } = useFakePatients();
    const { isPending: pendingEmployees, mutate: mutateEmployees } = useFakeEmployees();
    const { isPending: pendingAppointments, mutate: mutateAppointments } = useFakeAppointments();
    const { isPending: pendingRoomsOccupancy, mutate: mutateRoomsOccupancy } = useFakeRoomsOccupancy();
    const isPending = pendingAppointments || pendingPatients || pendingRoomsOccupancy || pendingEmployees;

    const fakerItemsConfig = [
        { title: "Upload patients", onClick: () => mutatePatients() },
        { title: "Upload employees", onClick: () => mutateEmployees() },
        { title: "Upload appointments", onClick: () => mutateAppointments() },
        { title: "Upload rooms occupancy", onClick: () => mutateRoomsOccupancy() },
    ];

    if (isPending) return <LoadingSpinner />;

    return (
        <React.Fragment>
            {fakerItemsConfig.map((item) => (
                <FakerItem key={item.title} {...item} {...props} />
            ))}
        </React.Fragment>
    );
};

export default FakerComponent;
