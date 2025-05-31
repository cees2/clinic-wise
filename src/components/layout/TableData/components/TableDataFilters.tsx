import { Dropdown } from "../../../common/Dropdown/Dropdown";

const TableDataFilters = () => {
    return (
        <>
            <Dropdown>
                <Dropdown.Toggle>AddFilter</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>123</Dropdown.Item>
                    <Dropdown.Item>123</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
};

export default TableDataFilters;
