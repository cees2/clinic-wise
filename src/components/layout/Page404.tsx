import { EmptyPage } from "../common/EmptyPage.tsx";
import type { EmptyPageAction } from "../../utils/projectTypes.ts";

const Page404 = () => {
    const emptyPageActions: EmptyPageAction[] = [
        {
            title: "Return to home page",
            path: "/dashboard",
        },
    ];

    return <EmptyPage caption={"Could not find requested page"} className="mt-4" actions={emptyPageActions} />;
};

export default Page404;
