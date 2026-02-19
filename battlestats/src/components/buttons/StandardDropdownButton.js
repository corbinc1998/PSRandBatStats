import { Dropdown } from "react-bootstrap";

const StandardDropdownButton = ({ label, options }) => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="outline-light">{label}</Dropdown.Toggle>
            <Dropdown.Menu>
                {options.map((option, index) => (
                    <Dropdown.Item key={index} onClick={option.action}>
                        {option.label}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default StandardDropdownButton;