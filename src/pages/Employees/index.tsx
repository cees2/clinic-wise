import { format } from "date-fns";
import { Header } from "../../components/common/Header/Header";
import TableDataRenderer from "../../components/layout/TableData/TableData";
import { TableLayout } from "../../components/layout/TableData/TableLayout";
import type { Tables } from "../../services/database.types";
import { FilterType, type HeaderButton, type TableDataConfig } from "../../utils/projectTypes";
import { capitalizeFirstLetter } from "../../utils/utils";
import { NationalityWithFlag } from "../../components/common/NationalityWithFlag";

const Employees = () => {
    const config: TableDataConfig<Tables<"patients">> = {
        columns: [
            {
                id: "name",
                name: "Name",
                render: (employee) => `${employee.name} ${employee.surname}`,
            },
            {
                id: "gender",
                name: "Gender",
                render: (employee) => capitalizeFirstLetter(employee.gender),
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
            },
            {
                id: "nationality",
                name: "Nationality",
                render: (employee) => <NationalityWithFlag nationality={employee.nationality} />,
            },
        ],
        filters: [
            { id: "name", name: "Name", type: FilterType.TEXT },
            { id: "gender", name: "Gender", type: FilterType.ENUM, options: { female: "Female", male: "Male" } },
            // { id: "start_date", name: "Start date" type: FilterType.Date },
            {
                id: "nationality",
                name: "Nationality",
                type: FilterType.ENUM,
                options: {
                    "United States": "United States",
                    Canada: "Canada",
                    Mexico: "Mexico",
                    Germany: "Germany",
                    Poland: "Poland",
                    France: "France",
                    Norway: "Norway",
                    Italy: "Italy",
                },
            },
        ],
        actions: [
            {
                id: "remove",
                name: "Remove",
                action: () => {},
            },
            {
                id: "edit",
                name: "Edit",
                path: (item) => `/employees/${item.id}/edit`,
            },
        ],
        resourceName: "patients",
    };

    const buttons: HeaderButton[] = [
        {
            title: "Add new",
            path: "/employees/new",
        },
    ];

    return (
        <TableLayout>
            <Header as="h3" title="Employees" buttons={buttons} />
            <TableDataRenderer config={config} />
        </TableLayout>
    );
};

export default Employees;
