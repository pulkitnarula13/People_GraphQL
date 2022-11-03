import { useState } from "react";
import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import UpdatePerson from "../forms/UpdatePerson";
import RemovePerson from "../buttons/RemovePerson";
import Car from "./Car";
import CarList from "../lists/CarList";

const getStyles = (props) => ({
    card: {
        width: "500px",
    },
});

const Person = (props) => {
    const [id] = useState(props.id);
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [cars, setCars] = useState(props.cars);
    const [editModePerson, setEditModePerson] = useState(false);

    const styles = getStyles();

    const handleButtonPersonClick = () => {
        setEditModePerson(!editModePerson);
    };

    const updateStateVariable = (variable, value) => {
        switch (variable) {
            case "firstName":
                setFirstName(value);
                break;
            case "lastName":
                setLastName(value);
                break;
            default:
                break;
        }
    };

    return (
        <div>
            {editModePerson ? (
                <UpdatePerson
                    id={props.id}
                    firstName={props.firstName}
                    lastName={props.lastName}
                    onButtonClick={handleButtonPersonClick}
                    updateStateVariable={updateStateVariable}
                />
            ) : (
                <Card
                    actions={[
                        <EditOutlined
                            key="edit"
                            onClick={handleButtonPersonClick}
                        />,
                        <RemovePerson
                            id={id}
                            firstName={firstName}
                            lastName={lastName}
                        />,
                    ]}
                    style={styles.card}
                    title={firstName + " " + lastName}
                >
                    <CarList cars={cars} />
                </Card>
            )}
        </div>
    );
};

export default Person;
