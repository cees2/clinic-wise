import { Header } from "../../components/common/Header/Header";
import UpdateAccount from "./UpdateAccount/UpdateAccount";
import UpdatePassword from "./UpdatePassword/UpdatePassword";

const Settings = () => {
    return (
        <section className="p-12 max-w-[140rem]">
            <Header as="h3" title="Settings" />
            <UpdateAccount />
            <UpdatePassword />
        </section>
    );
};

export default Settings;
