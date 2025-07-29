import { BsThreeDotsVertical } from "react-icons/bs";
import { Dropdown } from "../../../common/Dropdown/Dropdown";
import Table from "../../../common/Table/Table";
import { useTableDataContext } from "../utils/TableDataContext";
import type { TableDataResourceType } from "../../../../utils/projectTypes";
import { useNavigate } from "react-router-dom";

interface Props<T extends TableDataResourceType> {
    resource: T;
}

const TableDataActionCell = <T extends TableDataResourceType>({ resource }: Props<T>) => {
    const {
        config: { actions },
    } = useTableDataContext();
    const navigate = useNavigate();

    if (!actions || actions.length === 0) return null;

    return (
        <Table.TableRowCell>
            <Dropdown placement="left">
                <Dropdown.Toggle hideDefaultIcon>
                    <BsThreeDotsVertical />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {actions.map((action) => {
                        const { id, name, action: actionCallback, path, visible } = action;

                        if (visible?.(resource) === false) return null;

                        const onClick = async () => {
                            if (path) {
                                const pathNavigate = path(resource);
                                await navigate(pathNavigate);
                                return;
                            }

                            await actionCallback?.(resource);
                        };

                        return (
                            <Dropdown.Item onClick={() => void onClick()} key={id}>
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
