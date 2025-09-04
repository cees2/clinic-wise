import styled from "styled-components";
import { useAuthContext } from "../../../utils/contexts/AuthContext";

const Image = styled.img.attrs({ alt: "User avatar" })`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;

    & + span {
        color: var(--color-font-primary);
    }
`;

const MainBarUser = () => {
    const { user } = useAuthContext();
    const userName = user?.user_metadata.fullName as string;
    const avatarURL = (user?.user_metadata.avatarURL as string | undefined) ?? "./logo.png";

    return (
        <div className="flex items-center gap-x-3">
            <Image src={avatarURL} alt={userName ? `Avatar of ${userName}` : "User avatar"} />
            <span>{userName}</span>
        </div>
    );
};

export default MainBarUser;
