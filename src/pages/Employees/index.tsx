import { format } from "date-fns";
import { Header } from "../../components/common/Header/Header";
import TableDataRenderer from "../../components/layout/TableData/TableData";
import { ContentLayout } from "../../components/layout/ContentLayout";
import type { Tables } from "../../services/database.types";
import { FilterType, UserRole, type HeaderButton, type TableDataConfig } from "../../utils/projectTypes";
import { capitalizeFirstLetter } from "../../utils/utils";
import { NationalityWithFlag } from "../../components/common/NationalityWithFlag";
import { SUPPORTED_NATIONALITIES_ENTRIES } from "../../utils/constants";
import { useAuthContext } from "../../utils/contexts/AuthContext";

const Employees = () => {
    const { user } = useAuthContext();
    const HasPermissionsToPerformActions =
        user?.user_metadata.role === UserRole.ADMIN || user?.user_metadata.role === UserRole.REGISTRATION;

    const config: TableDataConfig<Tables<"employees">> = {
        columns: [
            {
                id: "name",
                name: "Name",
                customInclude: "name,surname",
                render: (employee) => `${employee.name} ${employee.surname}`,
            },
            {
                id: "gender",
                name: "Gender",
                render: (employee) => capitalizeFirstLetter(employee.gender),
            },
            {
                id: "email",
                name: "Email",
                disableSorting: true,
            },
            {
                id: "start_date",
                name: "Start date",
                render: (employee) => format(new Date(employee.start_date), "dd.MM.yyyy"),
            },
            {
                id: "date_of_birth",
                name: "Date of birth",
                render: (employee) => format(new Date(employee.date_of_birth), "dd.MM.yyyy"),
            },
            {
                id: "phone_number",
                name: "Phone number",
                disableSorting: true,
            },
            {
                id: "nationality",
                name: "Nationality",
                render: (employee) => <NationalityWithFlag nationality={employee.nationality} />,
            },
            {
                id: "document_id",
                name: "Document ID",
            },
            {
                id: "role",
                name: "Role",
                render: (employee) => capitalizeFirstLetter(employee.role ?? ""),
            },
        ],
        filters: [
            { id: "name", name: "Name", type: FilterType.TEXT },
            { id: "surname", name: "Surname", type: FilterType.TEXT },
            {
                id: "gender",
                name: "Gender",
                type: FilterType.ENUM,
                options: [
                    { name: "Female", value: "female" },
                    { name: "Male", value: "male" },
                ],
            },
            { id: "start_date", name: "Start date", type: FilterType.DATE },
            { id: "date_of_birth", name: "Date of birth", type: FilterType.DATE },
            {
                id: "nationality",
                name: "Nationality",
                type: FilterType.ENUM,
                options: SUPPORTED_NATIONALITIES_ENTRIES.map(([value, name]) => ({ name, value })),
            },
        ],
        actions: [
            {
                id: "edit",
                name: "Edit",
                path: (item) => `/employees/${item.id}/edit`,
                visible: () => HasPermissionsToPerformActions,
            },
        ],
        resourceName: "employees",
    };

    const buttons: HeaderButton[] = [
        {
            title: "Add new",
            path: "/employees/new",
            visible: HasPermissionsToPerformActions,
        },
    ];

    return (
        <ContentLayout>
            <Header as="h3" title="Employees" buttons={buttons} />
            <TableDataRenderer config={config} />
        </ContentLayout>
    );
};

export default Employees;
