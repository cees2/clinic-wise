import { useForm } from "react-hook-form";
import { TextInput } from "../../../components/common/Input/TextInput";
import { Button } from "../../../components/layout/Button";
import { toast } from "react-toastify";
import { useAuthentication } from "../../../services/hooks/authentication/useAuthentication";
import type { LoginApi } from "../../../utils/projectTypes";
import styled from "styled-components";
import { FormSubmit } from "../../../components/common/Form/FormSubmit";

const StyledLogin = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 12rem;

    & button {
        width: 100%;
        margin-top: 1.6rem;
    }
`;

const Login = () => {
    const { register, control, handleSubmit, formState } = useForm<LoginApi>({
        defaultValues: {
            email: "admin@admin.com",
            password: "pass1234",
        },
    });
    const { login } = useAuthentication();

    const submitSuccess = async (loginData: LoginApi) => {
        login.mutate(loginData);
    };

    const submitError = () => {
        toast.error("Please provide correct login credentials");
    };

    const onSubmit = handleSubmit(submitSuccess, submitError);

    return (
        <StyledLogin>
            <FormSubmit
                formState={formState}
                className="flex flex-col items-center w-lg gap-y-8 ml-auto mr-auto"
                onSubmit={onSubmit}
                customButtons={<Button>Login</Button>}
            >
                <img src="../../public/logo.png" alt="ClinicWise logo" className="h-[12rem] w-[12rem]" />
                <TextInput
                    register={register}
                    control={control}
                    registerName="email"
                    label="Email"
                    className="w-full"
                    rules={{ required: true, pattern: { value: /^\S+@\S+\.\S+$/, message: "Wrong email pattern" } }}
                />
                <TextInput
                    register={register}
                    control={control}
                    registerName="password"
                    label="Password"
                    type="password"
                    className="w-full"
                    rules={{
                        required: true,
                        minLength: { value: 6, message: "Password has to be at lest 6 characters long" },
                    }}
                />
            </FormSubmit>
        </StyledLogin>
    );
};

export default Login;
