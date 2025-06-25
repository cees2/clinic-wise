import { Header } from "../../../components/common/Header/Header";
import { AppointmentForm } from "../components/AppointmentForm";
import { FormLayout } from "../../../components/common/Form/FormLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAppointment } from "../../../services/hooks/appointments/useGetAppointment";
import { LoadingSpinner } from "../../../components/common/LoadingSpinner";
import { toast } from "react-toastify";
import { useEffect } from "react";

const EditAppointment = () => {
    const { appointmentId } = useParams<{ appointmentId: string }>();
    const { isLoading, data, error } = useGetAppointment(appointmentId ?? "");
    const navigate = useNavigate();

    useEffect(() => {
        if (!appointmentId || error || (!isLoading && !data)) {
            toast.error("Could not edit the appointment with given ID. Please choose a valid appointment");
            void navigate("/appointments");
        }
    }, [appointmentId, data, error, navigate, isLoading]);

    if (!appointmentId || error || (!isLoading && !data)) {
        return null;
    }

    if (isLoading) return <LoadingSpinner />;

    return (
        <FormLayout>
            <Header as="h3" title="Edit appointment" />
            <AppointmentForm appointmentData={data} />
        </FormLayout>
    );
};

export default EditAppointment;
