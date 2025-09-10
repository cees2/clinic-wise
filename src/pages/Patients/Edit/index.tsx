import { useNavigate, useParams } from "react-router-dom";
import { FormLayout } from "../../../components/common/Form/FormLayout";
import { Header } from "../../../components/common/Header/Header";
import { PatientForm } from "../components/PatientsForm";
import { useGetPatient } from "../../../services/hooks/patients/useGetPatient";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../../../components/common/LoadingSpinner";

const EditPatient = () => {
    const { patientId } = useParams<{ patientId: string }>();
    const { isLoading, data, error } = useGetPatient(patientId ?? "");
    const fetchingWentWrong = !patientId || error || (!isLoading && !data);
    const navigate = useNavigate();

    useEffect(() => {
        if (fetchingWentWrong) {
            toast.error("Could not fetch the patient with given ID. Please choose a valid patient");
            void navigate("/patients");
        }
    }, [navigate, fetchingWentWrong]);

    if (fetchingWentWrong) {
        return null;
    }

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <FormLayout>
            <Header title={`Edit patient "${data?.name} ${data?.surname}"`} as="h3" />
            <PatientForm patientData={data} />
        </FormLayout>
    );
};

export default EditPatient;
