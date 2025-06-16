import { BsThreeDotsVertical } from "react-icons/bs";
import { Dropdown } from "../../../common/Dropdown/Dropdown";
import Table from "../../../common/Table/Table";
import { useTableDataContext } from "../utils/TableDataContext";
import type { TableDataResourceType } from "../../../../utils/projectTypes";

interface Props<T extends TableDataResourceType> {
    resource: T;
}

const TableDataActionCell = <T extends TableDataResourceType>({ resource }: Props<T>) => {
    const {
        config: { actions },
    } = useTableDataContext();

    if (!actions || actions.length === 0) return null;

    return (
        <Table.TableRowCell>
            <Dropdown placement="left">
                <Dropdown.Toggle hideDefaultIcon>
                    <BsThreeDotsVertical />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {actions.map((action) => {
                        const { id, name, action: actionCallback } = action;

                        return (
                            <Dropdown.Item onClick={() => void actionCallback(resource)} key={id}>
                                {name}
                            </Dropdown.Item>
                        );
                    })}
                </Dropdown.Menu>
            </Dropdown>
        </Table.TableRowCell>
    );
};

export default TableDataActionCell;
