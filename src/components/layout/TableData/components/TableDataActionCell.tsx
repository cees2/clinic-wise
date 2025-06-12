import { BsThreeDotsVertical } from "react-icons/bs";
import { Dropdown } from "../../../common/Dropdown/Dropdown";
import Table from "../../../common/Table/Table";
import { Button } from "../../Button";
import { useTableDataContext } from "../utils/TableDataContext";

const TableDataActionCell = () => {
    const {
        config: { actions },
    } = useTableDataContext();

    if (!actions || actions.length === 0) return null;

    const drawActionContent = () => {
        const shouldRenderButton = actions.length === 1;

        if (shouldRenderButton) {
            const { name, action } = actions.at(0) ?? {};
            return <Button onClick={action}>{name}</Button>;
        }

        return (
            <Dropdown>
                <Dropdown.Toggle>
                    <BsThreeDotsVertical />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {actions.map((action) => {
                        const { id, name, action: actionCallback } = action;
                        return (
                            <Dropdown.Item onClick={actionCallback} key={id}>
                                {name}
                            </Dropdown.Item>
                        );
                    })}
                </Dropdown.Menu>
            </Dropdown>
        );
    };

    return <Table.TableRowCell>{drawActionContent()}</Table.TableRowCell>;
};

export default TableDataActionCell;
