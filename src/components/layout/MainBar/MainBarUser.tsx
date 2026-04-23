import styled from "styled-components";
import { useAuthContext } from "../../../utils/contexts/AuthContext";

const Image = styled.img.attrs({ alt: "User avatar" })`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    object-fit: cover;

    & + span {
        color: var(--color-font-primary);
    }
`;

const MainBarUser = () => {
    const { user ,token} = useAuthContext();
    const userName = `${user.firstname} ${user.lastname}`;
    const avatarURL = typeof user?.avatar_id === "number" ? `http://localhost:8080/api/avatars?token=${token}&id=${user.avatar_id}` : "./logo.png";

    return (
        <div className="flex items-center gap-x-3">
            <Image src={avatarURL} alt={userName ? `Avatar of ${userName}` : "User avatar"} />
            <span>{userName}</span>
        </div>
    );
};

export default MainBarUser;
