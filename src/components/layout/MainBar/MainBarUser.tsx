import styled from "styled-components";
import { useAuthContext } from "../../../utils/contexts/AuthContext";

const Image = styled.img.attrs({ alt: "User avatar" })`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
`;

const MainBarUser = () => {
    const { user } = useAuthContext();

    return (
        <div className="flex items-center gap-x-3">
            <Image src="/logo.png" />
            <span>Damian Mirek</span>
        </div>
    );
};

export default MainBarUser;
