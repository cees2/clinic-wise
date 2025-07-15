import { Header } from "../../components/common/Header/Header";
import UpdateAccount from "./UpdateAccount/UpdateAccount";

const Settings = () => {
    return (
        <section className="p-12">
            <Header as="h3" title="Settings" />
            <UpdateAccount />
        </section>
    );
};

export default Settings;
