import { useParams } from "react-router-dom";

const AppointmentForm = () => {
    const { appointmentId } = useParams<{ appointmentId: string }>();
    
    return <div>Form</div>;
};

export default AppointmentForm;
