import { format } from "date-fns";
import { Header } from "../../components/common/Header/Header";
import TableDataRenderer from "../../components/layout/TableData/TableData";
import { ContentLayout } from "../../components/layout/ContentLayout";
import { FilterType, type HeaderButton, type TableDataConfig } from "../../utils/projectTypes";
import { capitalizeFirstLetter } from "../../utils/utils";
import { NationalityWithFlag } from "../../components/common/NationalityWithFlag";
import { SUPPORTED_NATIONALITIES_ENTRIES } from "../../utils/constants";
import { useMutateEmployee } from "../../services/hooks/employees/useMutateEmployee.ts";
import { useConfirmation } from "../../utils/hooks/useConfirmation.tsx";
import { type EmployeeApi, EmployeeRole, UserAuthority } from "../../services/apiTypes.ts";
import { useAuthentication } from "../../services/hooks/authentication/useAuthentication.ts";

const Employees = () => {
    const { hasAuthority } = useAuthentication();
    const HasPermissionsToPerformActions = hasAuthority([ UserAuthority.REGISTRATION]);
    const { mutationRemove } = useMutateEmployee();
    const { confirmation } = useConfirmation();

    const config: TableDataConfig<EmployeeApi> = {
        columns: [
            {
                id: "name",
                name: "Name",
                render: (employee) => `${employee.user.firstname} ${employee.user.lastname}`,
            },
            {
                id: "gender",
                name: "Gender",
                render: (employee) => capitalizeFirstLetter(employee.user.gender),
            },
            {
                id: "username",
                name: "Email",
                disableSorting: true,
                render: (employee) => employee.user.username,
            },
            {
                id: "start_date",
                name: "Start date",
                render: (employee) => format(new Date(employee.start_date), "dd.MM.yyyy"),
            },
            {
                id: "date_of_birth",
                name: "Date of birth",
                render: (employee) => format(new Date(employee.user.date_of_birth), "dd.MM.yyyy"),
            },
            {
                id: "phone_number",
                name: "Phone number",
                disableSorting: true,
                render: (employee) => capitalizeFirstLetter(employee.user.phone_number),
            },
            {
                id: "nationality",
                name: "Nationality",
                render: (employee) => <NationalityWithFlag nationality={employee.user.nationality} />,
            },
            {
                id: "document_id",
                name: "Document ID",
                render: (employee) => employee.user.document_id,
            },
            {
                id: "role",
                name: "Role",
                render: (employee) => capitalizeFirstLetter(employee.role),
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
            {
                id: "remove",
                name: "Remove",
                action: (item) => {
                    confirmation({
                        title: "Remove employee",
                        caption: "Are you sure you want to remove this employee? This action cannot be undone.",
                        onConfirm: () => {
                            mutationRemove.mutate({ employeeId: item.id, userId: item.user_id ?? "" });
                        },
                    });
                },
                visible: (item) => item.role !== EmployeeRole.ADMIN,
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
