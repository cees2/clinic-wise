import styled from "styled-components";

const Image = styled.img.attrs({ alt: "User avatar" })`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
`;

const MainBarUser = () => {
    return (
        <div className="flex items-center gap-x-3">
            <Image src="/logo.png" />
            <span>Damian Mirek</span>
        </div>
    );
};

export default MainBarUser;
